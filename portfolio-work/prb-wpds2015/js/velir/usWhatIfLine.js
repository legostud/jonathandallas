(function($){

    nspace("prb.wpds2014").usWhatIfLine = function(svgElement, marginSet, widthSet, heightSet, colorsSet, getActiveDataSetsCallback, updateAxisTicksCallback){

        var self = {};

        // **************************
        // Private Variables
        // **************************
        var svg = svgElement;
        var margin = marginSet;
        var width = widthSet;
        var height = heightSet;
        var colors = colorsSet;
        var getActiveDataSets = getActiveDataSetsCallback;
        var updateAxisTicks = updateAxisTicksCallback;

        var hoverTolerance = 100; // The mouse must be within 100 pixels on the x axis for the hover to activate

        var currentHoverYear;

        var xLinear = d3.scale.linear()
            .range([0, width]);

        var xOrdinal = d3.scale.ordinal()
            .rangePoints([0, width]);

        // **************************
        // Public Variables
        // **************************
        self.chartType = 'line';

        self.x = xLinear;

        self.y = d3.scale.linear()
            .range([height, 0]);

        var line = d3.svg.line()
            .x(function(d) { return self.x(d.year); })
            .y(function(d) { return self.y(formatDataPoint(d.value)); });

        self.x.domain([0,0]);
        self.y.domain([0,0]);

        // **************************
        // Private Methods
        // **************************
        function formatDataPoint(data){
            return data/1000000;
        }

        // Relaxing algorithm - http://blog.safaribooksonline.com/2014/03/11/solving-d3-label-placement-constraint-relaxing/
        function relaxLabels(labels){
            var alpha = 1;
            var spacing = 18;
            var again = false;

            labels.each(function(d, i){
                var a = this;
                var da = d3.select(a);
                var y1 = da.attr('y');

                labels.each(function(d, j){
                    var b = this;

                    if(a === b){
                        return;
                    }

                    var db = d3.select(b);
                    if (da.attr("text-anchor") != db.attr("text-anchor")) return;

                    var y2 = db.attr("y");
                    var deltaY = y1 - y2;
 
                    if (Math.abs(deltaY) > spacing) return;

                    again = true;
                    var sign = deltaY > 0 ? 1 : -1;
                    var adjust = sign * alpha;
                    da.attr("y", +y1 + adjust);
                    db.attr("y", +y2 - adjust);

                });
            });

             if(again) {
                relaxLabels(labels);
            }
        }

        function drawHover(data, year){

            if(currentHoverYear && year === currentHoverYear){
                return;
            }

            currentHoverYear = year;

            // Draw data point dots
            var hoverDots = svg.selectAll('circle.hover-dot').data(data);

            hoverDots
                .enter()
                .append('circle')
                .attr('class', 'hover-dot')
                .attr('r', 3);

            hoverDots.exit()
                .remove();

            hoverDots
                .attr('cx', function(d) { return self.x(d.year); })
                .attr('cy', function(d) { return self.y(formatDataPoint(d.value)); });


            var hoverText = svg.selectAll('text.hover-text').data(data);

            hoverText
                .enter()
                .append('text')
                .attr('dy', 6)
                .attr('class', 'hover-text');

            hoverText.exit()
                .remove();

            hoverText
                .text(function(d){ return formatDataPoint(d.value).toFixed(2) + " Million"; })
                .each(function(d){

                    var textElement = d3.select(this);

                    var xPos = self.x(d.year);
                    var yPos = self.y(formatDataPoint(d.value));
                    var textAnchor = 'end';
                    var xPad = -10;

                    if((xPos + xPad - $(this).outerWidth()) < 0){
                        textAnchor = 'start';
                        xPad = 10;
                    }

                    textElement.attr({
                        'x': xPos,
                        'y': yPos,
                        'text-anchor': textAnchor,
                        'dx': xPad
                    });

                });

            relaxLabels(hoverText);

            // Draw hover line
            var hoverLine = svg.selectAll('line.hover-line').data(data.slice(0,1));

            hoverLine
                .enter()
                .append('line')
                .attr('class', 'hover-line')
                .attr('y1', 0)
                .attr('y2', height)
                .attr('stroke-dasharray', '3,5'); 

            hoverLine.exit()
                .remove();

            hoverLine
                .attr('x1', function(d) { return self.x(d.year); })
                .attr('x2', function(d) { return self.x(d.year); });

        }

        function fadeOutMainTrend(){
            svg.selectAll('path')                   
                .transition()
                .duration(200)
                .style('opacity', 0)
                .each('end', function(){
                    d3.select(this).remove();
                });
        }

        function findClosestDataPointsToMouse(mousePosition, activeDataSets){

            // find the closest data points
            var flattenedSortedDataPoints = _.sortBy(_.flatten(activeDataSets), function(d){
                return d.year;
            });

            var closestYear;
            var closestDifference;

            _.forEach(flattenedSortedDataPoints, function(dp){
                // Skip blank values
                if(!dp.value){
                    return;
                }

                var pixelDifference = Math.abs(mousePosition[0] - margin.left - self.x(dp.year));

                if(!closestYear || pixelDifference < closestDifference){
                    closestYear = dp.year;
                    closestDifference = pixelDifference;
                }
            });

            // The closest point needs to be within a certain tolerance
            if(closestDifference > hoverTolerance){
                return {
                    closestDataPoints: [],
                    closestYear: null
                };
            }

            var closestDataPoints = _.uniq(_.filter(flattenedSortedDataPoints, function(d) {
                return d.year === closestYear;
            }), function(d){
                return d.year + " " + d.value;
            });

            return {
                closestDataPoints: closestDataPoints,
                closestYear: closestYear
            };
        }

        // **************************
        // Public Methods
        // **************************
        self.xAxisTickFormat = function(type){
            return type === 'linear'? d3.format("d"): null;
        };

        self.setAxisDomains = function(type, data){
            if(type === 'linear'){
                var dateExtents = d3.extent(data, function(d) { return d.year; });
                xLinear.domain(dateExtents);

                // Tick every 5 years
                updateAxisTicks((dateExtents[1]-dateExtents[0])/5);
                self.x = xLinear;
            }
            else if(type === 'ordinal'){
                xOrdinal.domain(_.uniq(data.map(function(d) { return d.year; })));
                self.x = xOrdinal;
            }

            self.y.domain([6, d3.max(data, function(d) { return formatDataPoint(d.value); }) * 1.1]);
        };

        self.drawMainTrend = function(data){
            fadeOutMainTrend();

            var path = svg.append("path")
                .datum(_.filter(data, function(d){
                    return d.value;
                })) 
                .attr("class", "line historical")
                .attr("d", line);

            var totalLength = path.node().getTotalLength();
            
            // Trick to draw in the trend line from the left
            path
              .attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .style('stroke', colors.main)
              .transition()
                .duration(500)
                .ease("linear")
                .attr("stroke-dashoffset", 0);
        };

        self.fadeOutProjections = function(){
            svg.selectAll('path.projected')
                .transition()
                    .duration(200)
                    .style('opacity', 0)
                    .each('end', function(){
                        d3.select(this).remove();
                    });
        };

        self.fadeInProjection = function(settings){
            var path = svg.append("path")
            .datum(settings.data)   
            .attr("class", "line projected")
            .attr("d", line)
            .attr('stroke-dasharray', '5,5')
            .style('stroke', settings.color)
            .style('opacity', 0)
            .transition()
                .duration(500)
                .style('opacity', 1);       
        };

        self.hover = function(d, i){

            var mousePosition = d3.mouse(this);
            var activeDataSets = getActiveDataSets();

            if(!activeDataSets || activeDataSets.length === 0 || mousePosition[0] < margin.left){
                drawHover([]);
                return;
            }

            var c = findClosestDataPointsToMouse(mousePosition, activeDataSets);

            drawHover(c.closestDataPoints, c.closestYear);

        };

        self.clearHover = function(){
            drawHover([]);
        };

        self.clear = function(){
            fadeOutMainTrend();
            self.fadeOutProjections();
        };

        return self;
    };
}(jQuery));