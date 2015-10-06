(function($){

    nspace("prb.wpds2014").partitionDonutChart = function(element, $hoverElement, options){

        var self = {};

        self.element = element;

        self.options = options;

        // **************************
        // Private Variables
        // **************************
        var margin = {top: 200, right: 190, bottom: 150, left: 190};
        var innerRadius;
        var ringRadius;

        var colors = {
            "Africa": "#DF8E07", 
            "Asia": "#078968", 
            "Europe": "#DDD105", 
            "North America": "#9A236A", 
            "Oceania": "#B3C60E",
            "Latin America And The Caribbean": "#137F84"
        };

        var luminance = d3.scale.pow().exponent(self.options.shadingExponent)
            .range([self.options.shadingLumRange.low, self.options.shadingLumRange.high]);

        var svg = element.append("svg")
            .attr("width", margin.left + margin.right)
            .attr("height", margin.top + margin.bottom)
            .attr("viewBox", "0 0 " + (margin.left + margin.right) + " " + (margin.top + margin.bottom))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var partition = d3.layout.partition()
            .sort(function(a, b) { 
                if(a.depth > 1 && self.options.sort === 'pop'){
                    return d3.ascending(getData(a), getData(b)); 
                }

                return d3.ascending(a.name, b.name); 
            })
            .size([2 * Math.PI, innerRadius]);

        var arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return innerRadius + (ringRadius * (d.depth - 1)); })
            .outerRadius(function(d) { return innerRadius + (ringRadius * d.depth); });

        var center, path, activeSegment;
        var nodeCache = {};

        var isFiltered = false;

        // initialize
        var getData = function(){ return 0;};

        // **************************
        // Private Methods
        // **************************
        function key(d) {
            var k = [], p = d;
            while (p.depth){
                k.push(p.name);
                p = p.parent;
            } 
            return k.reverse().join(".");
        }

        function fill(d) {
            var p = d;
            while (p.depth > 1) p = p.parent;

            var c = d3.lab(colors[p.name]);

            if(p.name != d.name){   
                luminance.domain(p.valueRange);     
                c.l = luminance(d.value);
            }

            var color = {
                rgb: c.toString()
            };

            return color;
        }

        function arcTween(b) {
            var i = d3.interpolate(this._current, b);
            this._current = i(0);
            return function(t) {
                return arc(i(t));
            };
        }

        function updateArc(d) {
            return {depth: d.depth, x: d.x, dx: d.dx};
        }

        function addHoverHandlers(element){
            element
                .on("mouseenter", function(d){

                    $(self).trigger('mouse:enter', [d.name]);

                    self.startHover(d3.select(this));

                })
                .on("mouseleave", function(d){

                    $(self).trigger('mouse:leave', [d.name]);

                    self.endHover(d3.select(this));

                });
        }

        function resolveNode(obj){
            if(typeof obj === 'string'){
                return nodeCache[obj];
            }

            return obj;
        }

        function resolveElement(obj){
            if(typeof obj === 'string'){
                return  svg.selectAll("path").filter(function(d){
                    return d.name === obj;
                });         
            }

            return obj;
        }

        function setHoverValues(d){

            var suffix = "MILLION";
            var val = getData(d).toFixed(1);

            if(val / 1000 >= 1){
                val = (val/1000).toFixed(1);
                suffix = "BILLION";
            }

            $('.data-value', $hoverElement).html(val);
            $('.data-suffix', $hoverElement).html(suffix);

        }

        function setLocationLabel(d){
            
            if(d.parent.name === "World"){
                return;
            }

            // calculate position
            var centerAngle = d.x + (d.dx/2) - (Math.PI / 2);
            var textRotationAngle = ((centerAngle + (Math.PI/2)) * (180/Math.PI));
            
            var textRadius = innerRadius + (2 * ringRadius);
            var centerRadius = innerRadius + (1.8 * ringRadius);
            var lineTerminusRadius = innerRadius + (2 * ringRadius) + 5;

            if(textRotationAngle > 90 && textRotationAngle < 270){
                textRotationAngle -= 180;
                textRadius += 22;
            }
            else{
                textRadius += 10;
            }

            var positionVector = {
                x: Math.cos(centerAngle),
                y: Math.sin(centerAngle)
            }; 

            var labelGroup = svg.append('g')
                .attr('class', 'region-name');

            labelGroup.append('circle')
                .attr('r', 2)
                .attr('cx', centerRadius * positionVector.x)
                .attr('cy', centerRadius * positionVector.y)
                .style('fill', '#E0E2E6')
                .style('stroke-width', '0px');

            labelGroup.append('line')
                .attr('x1', centerRadius * positionVector.x)
                .attr('y1', centerRadius * positionVector.y)
                .attr('x2', lineTerminusRadius * positionVector.x)
                .attr('y2', lineTerminusRadius * positionVector.y)
                .style('stroke', '#E0E2E6')
                .style('stroke-width', '1px');

            labelGroup.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', positionVector.x * textRadius)
                .attr('y', positionVector.y * textRadius)
                .attr('transform', 'rotate(' + textRotationAngle + ' ' + (positionVector.x * textRadius) + ',' + (positionVector.y * textRadius) + ')')
                .text(d.name.toUpperCase());
        }

        function clearLocationLabel(){
            self.element.selectAll('.region-name').remove();
        }

        function setHoverState(element){
            element.style("fill", "#A7A9AC");
            setHoverValues(element.datum());
            setLocationLabel(element.datum());
            if(element.datum().parent && element.datum().parent.name != 'World'){
                fadeOutRegionLabels();
            }
        }

        function clearHoverState(element){

            element
                .style("fill", function(d) { return d.fill.rgb; });

            setHoverValues(self.currentRoot);
            clearLocationLabel();
            if(element.datum().parent && element.datum().parent.name != 'World'){
                fadeInRegionLabels();
            }
        }

        function setRoot(root){
            self.currentRoot = root;
            setHoverValues(self.currentRoot);
            clearLocationLabel();
        }

        function appendRegionLabels(transition){

            var labelGroup = 
                svg.append("g")
                .attr("class", "region-labels")
                .html(self.regionLabels);

            if(transition){

                d3.transition().duration(1000).each(function() {
                    labelGroup
                        .style("opacity", 0)
                        .transition()
                        .style("opacity", 1);
                });
            }

        }

        function removeRegionLabels(transition){
            
            var labels = svg.select("g.region-labels");


            if(transition){

                d3.transition().duration(500).each(function() {
                    labels
                        .transition()
                        .style("opacity", 0)
                        .each("end", function(){
                            svg.select("g.region-labels").remove();
                        });
                });
            }
            else{
                labels.remove();
            }

        }

        function fadeOutRegionLabels(){
            // var labels = d3.transition().duration(300).each(function(){
            //     svg.select("g.region-labels")
            //         .transition()
            //         .style('opacity', 0.1);
            // });
            svg.select("g.region-labels").style('opacity', 0.1);
        }

        function fadeInRegionLabels(){
            // var labels = d3.transition().duration(300).each(function(){
            //     svg.select("g.region-labels").transition().style('opacity', 1);
            // });
            svg.select("g.region-labels").style('opacity', 1);

        }


        // **************************
        // Public Methods
        // **************************
        self.setSort = function(sort){
            
            partition.sort(function(a, b) { 
                if(a.depth > 1 && sort === 'pop'){
                    return d3.ascending(getData(a), getData(b)); 
                }

                return d3.ascending(a.name, b.name); 
            });
  
            self.reDraw(self.currentRoot, self.currentRoot, self.currentRoot.name !== 'World');
        };

        self.setRegionLabels = function(labels){
            self.regionLabels = labels;
        };

        self.clickSegment = function(obj){
            
            var d = resolveNode(obj);
            var segment = resolveElement(d.name);

            if(d.parent.name !== 'World'){
                self.setActiveSegment(segment);
                $(self).trigger('set:active', [d.name]);
            }

            if(!isFiltered){
                self.filterIn(d);
                $(self).trigger("filter:in", [d.name]);
            }

        };

        self.clickBack = function(){
        
            if(activeSegment){
                self.clearActiveSegment();
                $(self).trigger('clear:active');
            }

            if(isFiltered){
                $(self).trigger('filter:out', [self.currentRoot.name]);
                self.filterOut(self.currentRoot);
            }

        };

        self.setActiveSegment = function(obj){
            var element = resolveElement(obj);

            if(activeSegment){
                clearHoverState(element);
            }

            activeSegment = element;

            if(element.datum().parent.name !== "World"){
                setHoverState(element);
            }
            else{
                clearHoverState(element);
            }
        };

        self.clearActiveSegment = function(){
            if(activeSegment){
                clearHoverState(activeSegment);
                activeSegment = null;
            }
        };

        self.startHover = function(obj){
            var element = resolveElement(obj);
            
            if(activeSegment && element.datum().name === activeSegment.datum().name){
                return;
            }

            if(isFiltered && element.datum().parent.name === "World"){
                return;
            }

            // clear the active hover
            if(activeSegment){
                clearHoverState(activeSegment);
            }

            setHoverState(element);
        };

        self.endHover = function(obj){
            var element = resolveElement(obj);

            // Don't unhover if it is currently active
            if(activeSegment && element.datum().name === activeSegment.datum().name){
                return;
            }

            clearHoverState(element);

            if(activeSegment && activeSegment.datum().parent.name !== "World"){
                setHoverState(activeSegment);
            }
        };

        self.filterIn = function(obj) {
            
            if(isFiltered){
                return;
            }

            var p = resolveNode(obj);

            if (p.depth > 1) p = p.parent;
            
            self.reDraw(p, p, true);
            isFiltered = true;
            removeRegionLabels(true);
        };

        self.filterOut = function () {
            if(!isFiltered){
                return;
            }

            self.reDraw(self.currentRoot, self.currentRoot.parent, false);
            isFiltered = false;
            appendRegionLabels(true);
        };

        // Filter to the specified new root.
        self.reDraw = function(p, newRoot, filter) {

            function insideArc(d) {
                return p && p.key > d.key ? 
                {depth: d.depth, x: 0, dx: 0} : 
                    p && p.key < d.key ? 
                        {depth: d.depth, x: 2 * Math.PI, dx: 0} : 
                        {depth: 0, x: 0, dx: 2 * Math.PI};
            }

            var filteredNodes;

            if (newRoot !== self.currentRoot){
                setRoot(newRoot);
            } 
 
            if(filter){
                filteredNodes = _.cloneDeep(nodeCache.World);
                filteredNodes.children = _.filter(filteredNodes.children, function(child){
                return child.name === p.name;
            });
            }
            else{
                filteredNodes = nodeCache.World;
            }

            path = path.data(partition.nodes(filteredNodes).slice(1), function(d) { return d.key; });

            d3.transition().duration(500).each(function() {
            
                path
                    .exit()
                    .transition()
                    .attrTween("d", function(d) { return arcTween.call(this, insideArc(d)); })
                    .remove();

                path
                    .enter()
                    .append("path")
                    .style("stroke-width", "0px")
                    .style("fill", function(d) { return d.fill.rgb; })
                    .on("click", function(d){
                        d3.event.stopPropagation();
                        self.clickSegment(d.name);
                    })
                    .each(function(d) { this._current = insideArc(d); });

                addHoverHandlers(path);

                if(activeSegment){
                    clearLocationLabel();
                }

                path
                    .transition()
                    .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); })
                    .each('end', function(){
                        if(activeSegment){
                            self.setActiveSegment(activeSegment);
                        }
                    });
            });

        };

        self.setData = function(root, getNodeData, ringRadiusOverride, innerCircleRadius){
        
            ringRadius = ringRadiusOverride;
            innerRadius = innerCircleRadius;

            getData = getNodeData;

            partition
                .nodes(root)
                .forEach(function(d) {
                    d._children = d.children;
                    d.value = getData(d);
                    d.key = key(d);
                    d.fill = fill(d);
                    if(d.parent && d.parent.name === "World"){
                        var values = d.children.map(function(d){
                                return getData(d);
                            });

                        d.valueRange = [_.min(values), _.max(values)];
                    }

                    nodeCache[d.name] = d;
                });

            center = svg.append("circle")
                .attr("r", innerRadius)
                .on("click", function(){
                    d3.event.stopPropagation();
                    self.clickBack();
                });

            path = svg.selectAll("path")
                .data(partition.nodes(root).slice(1))
                .enter().append("path")
                .attr("d", arc)
                .style("stroke-width", "0px")
                .style("fill", function(d) { return d.fill.rgb; })
                .each(function(d) { this._current = updateArc(d); })
                .on("click", function(d){
                    d3.event.stopPropagation();
                    self.clickSegment(d.name);
                });

            addHoverHandlers(path);

            setRoot(nodeCache.World);

            appendRegionLabels();

        };

        return self;

    };
}(jQuery));