(function(){

    nspace("prb.wpds2014").usWhatIf = function(element){

        var self = {};

        self.element = element;

        // **************************
        // Private Variables
        // **************************
        var margin = {top: 20, right: 20, bottom: 80, left: 70},
        width = 760 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var activeDataSets = [];

        var mainTrendColor = '#DF8E07';

        var futureTrendColor = {
            'constant-low': '#00d2d7',
            'constant-middle': '#00DAA1',
            'constant-high': '#94e3e7',
            'noInequality-low': '#c3a103',
            'noInequality-middle': '#B3C60E',
            'noInequality-high': '#f9ffb1'
        };

        var xAxis = d3.svg.axis()
            .tickSize(0, 0)
            .tickPadding(10)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .tickSize(0, 0)
            .tickPadding(10)
            .orient("left");

        var svg = element.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .on('mousemove', hoverArea)
            .on('mouseleave', hoverClear)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', '#323233')
            .style('stroke-width', 0)
            .style('opacity', 0.8); 

        var lineChart = prb.wpds2014.usWhatIfLine(svg, margin, width, height, {
                main: mainTrendColor,
                future: futureTrendColor
            }, 
            getActiveDataSets,
            updateTicks);

        toggleAxis();

        // Build out some blank axes
        fadeInNewAxes();

        // **************************
        // Private Methods
        // **************************
        function getActiveDataSets(){
            return activeDataSets;
        }

        function updateTicks(count){
            xAxis.ticks(count);
        }

        function hoverArea(d, i){
            if(lineChart && lineChart.hover){
                lineChart.hover.call(this, d, i);
            }
        }

        function hoverClear(d, i){
            if(lineChart && lineChart.clearHover){
                lineChart.clearHover();
            }
        }

        function toggleAxis(){
            xAxis.scale(lineChart.x);
            yAxis.scale(lineChart.y);

            if(self.data && self.indicator){
                xAxis.tickFormat(lineChart.xAxisTickFormat(self.data[self.indicator].type));
            }
        }

        function fadeOutAxes(){
            var textTicks = svg.selectAll('g.axis g.tick text');

            if(textTicks[0].length > 0){
                textTicks.transition()
                .duration(300)
                .style('opacity', 0)
                .each('end', function(){
                    d3.select(this.parentNode.parentNode).remove();
                });     
            }
            else{
                svg.selectAll('g.axis')
                .transition()
                .duration(300)
                .style('opacity', 0)
                .each('end', function(){
                    d3.select(this).remove();
                }); 
            }

        }

        function fadeInNewAxes(){
            // Build the axis, then transition in the text
            var xAxisGroup = svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            var isOrdinal = self.data && self.indicator && self.data[self.indicator].type === 'ordinal';

            xAxisGroup.append("text")
              .attr("x", width/2)
              .attr("y", 0)
              .attr('dy', isOrdinal? 70: 45)
              .attr("text-anchor", "middle")
              .text("Year");

            xAxisGroup.selectAll('g.tick text')
                .style('opacity', 0)
                .attr("transform", isOrdinal? "rotate(-45)": "")
                .style("text-anchor", isOrdinal? "end" : "middle")
                .transition()
                .duration(300)
                .style('opacity', 1);

            var yAxisGroup = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
            
            yAxisGroup.append("text")
              .attr("x", -height/2)
              .attr('dy', -30)
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")
              .text("Population (Millions)");
            
            yAxisGroup.selectAll('text')
                .style('opacity', 0)
                .transition()
                .duration(300)
                .style('opacity', 1);
        }

        // **************************
        // Public Methods
        // **************************
        self.updateSelections = function(indicator, rateScenarios, immigrationScenarios){

            // Return if the data isn't set
            if(!self.data){
                return;
            }

            // clear out the active sets  
            activeDataSets = [];

            // If the indicator is changed, redraw from scratch
            if(self.indicator !== indicator){
    
                self.indicator = indicator;
                var mainDataSet = self.data[indicator];

                var allData = mainDataSet.data;
                _.forEach(mainDataSet.projections, function(set1){
                    _.forEach(set1, function(set2){
                        allData = allData.concat(set2);
                    });
                });

                // reset the x/y domains
                lineChart.setAxisDomains(mainDataSet.type, allData);

                toggleAxis();

                fadeOutAxes();

                lineChart.drawMainTrend(mainDataSet.data);

                fadeInNewAxes();
            }

            activeDataSets.push(self.data[indicator].data);

            // If there is a change in the projections
            if(!_.isEqual(self.rateScenarios, rateScenarios) || !_.isEqual(self.immigrationScenarios, immigrationScenarios)){
                // Fade out current selections as the new ones are fading in
                lineChart.fadeOutProjections();

                // Do nothing else, if there are no projections to draw
                if(!rateScenarios){
                    return;
                }

                var projDataSets = [];

                // Gather the data sets for the desired projections
                _.forEach(rateScenarios, function(rate){
                    _.forEach(_.filter(immigrationScenarios, function(scn){
                            return scn.indexOf(rate) === 0;
                        }), function(immigrationScenario){
                        
                        var immigrationDataSet = self.data[indicator].projections[rate][immigrationScenario.replace(rate + '-', '')];

                        projDataSets.push({
                            data: immigrationDataSet,
                            color: futureTrendColor[immigrationScenario]
                        });

                        // Track this data set as active
                        activeDataSets.push(immigrationDataSet);
                    });
                });


                _.forEach(projDataSets, function(ds){
                    lineChart.fadeInProjection(ds);
                });
            }

            // Save the current settings
            self.rateScenarios = rateScenarios;
            self.immigrationScenarios = immigrationScenarios;
        };

        return self;
    };
}());