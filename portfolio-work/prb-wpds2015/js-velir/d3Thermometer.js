import d3 from "d3";

let   margin    = {top: 4, right: 10, bottom: 10, left: 10};
const width     = 60 - margin.left - margin.right,
      height    = 200 - margin.top - margin.bottom,
      tickWidth = 16; 
    
let d3Thermometer = {

    // axisLabel = ["normal", "none", "female", "male"]  
    // male is the same as none, female moves it over so it's "centered" when 
    // the charts are next to each other

    create: function({el, data, range = {min: 0, max: 100}, dataLabel = "left", axisLabel = "normal", units, hover = false}){

        // create and append the svg
        let svg = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "thermometer-svg")
            .style({
                "overflow": "visible" // so the labels show 
            })
          .append("g")
            .attr("class", "thermometer-svg-g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // draw axis
        this._drawAxis(el, range, axisLabel);

        // now update with the data
        this.update(arguments[0]);

    },

    // el: element to attach the chart to
    // counties: an array of country data
    update: function({el, data, range = {min: 0, max: 100}, dataLabel = "left", axisLabel = "normal", units, hover = false}){

        
        // range.max = d3.max(data, (d) => d.value);
        
        let svg = d3.select(el).select(".thermometer-svg-g"); 

        const transitionTime = 500;

        let scale = d3.scale.linear()
            .domain([range.min, range.max])
            .range([height, 0]);


        let points = {
            "world": {
                "stroke-width": 6,
                "stroke-length": 15
            },
            "region": {
                "stroke-width": 2,
                "stroke-length": 25
            },
            "country": {
                "radius": 7
            }
        };

        let colors = d3.scale.ordinal()
            .domain(["world",   "region",  "country"])
            .range( ["#82C09A", "#7F6EA5", "#F2AC00"]);

        


        // filter out undefined/null
        data = data.filter((d) => (d.value !== null) && (d.value !== undefined)); // filter out undefined/null

        // only show the data label for country, or region, or world (in that order)
        const significantType = data.reduce(function(prev, cur){
            if (cur.type === "country" || prev === "country") { return "country"; }
            if (cur.type === "region"  || prev === "region" ) { return "region"; }
            if (cur.type === "world"   || prev === "world"  ) { return "world"; }
        }, "");

        // create a "float" group to hold the float and the text
        // the second parameter defines a key for this element.  Because we're sorting the data, this is important
        let float = svg.selectAll(".float")
            .data(data, (d) => d.type);


        /**
         * Enter, when data points are added 
         */
        let newFloat = float.enter()
            .append("g")
            .attr("class", (d) => `float ${d.type}`)
            .style({
                "stroke": "white", 
                "stroke-width": "1px"
            });

        // world and region uses a line
        newFloat.filter((d) => d.type !== "country")
            .append("path")
            .attr("d", (d) => this._tick(scale(d.value), 0))
            .style({
                "stroke": (d) => colors(d.type),
                "stroke-width": (d) => points[d.type]["stroke-width"],
                "stroke-linecap": "round"
            });
        
        // country uses a cirlce
        newFloat.filter((d) => d.type === "country")
            .append("circle")
            .attr("cx", width/2)
            .attr("r", 0)
            .attr("opacity", 0.8)
            .attr("fill", (d) => colors(d.type));

        // the value label for the data point
        newFloat.append("text")
            .style("fill-opacity", 0);


       
        /**
         * Exit, when data points are removed 
         */
        let exits = float.exit()
            // remove the class so selectAll(".floats") doesn't select this retreating element
            // this fixes a race condition related to transition timing
            .attr("class", "") 
            .transition("float-exit").duration(transitionTime);

        exits.remove();

        exits.select("circle").attr("r", 0).remove();
        exits.select("path").attr("d", (d) => this._tick(scale(d.value), 0)).remove();
        exits.select("text").style("fill-opacity", 0).remove();


        /**
         * Update, when data points are changed 
         */

        // world and region
        float.filter((d) => d.type !== "country")
            .select("path")
            .transition("float-update").duration(transitionTime)
            .attr("cy", (d) => scale(d.value))
            .attr("d", (d) => this._tick(scale(d.value), points[d.type]["stroke-length"]));

        // country
        float.filter((d) => d.type === "country")
            .select("circle")
            .transition("float-update").duration(transitionTime)
            .attr("r", (d) => points[d.type].radius)
            .attr("cy", (d) => scale(d.value));



        // data label
        let labels = float.select("text");


        // common function to calculate the x position given "left" or "right".  we need to do this normally, 
        // and also when the user hovers over the themermeter chart
        let calcX = function(d, position = "left") {
            // width/2 takes in account the length added by stroke-linecap: round;
            let offset = 0;
            if (points[d.type]["stroke-length"]) { offset = points[d.type]["stroke-length"]/2 + points[d.type]["stroke-width"]/2; }
            if (points[d.type]["radius"])        { offset = points[d.type]["radius"]; }
            offset += 6; // padding

            return {
                "offset"    : (position === "right") ? width/2 + offset : width/2 - offset,
                "textAnchor": (position === "right") ? "start" : "end" // place the data label left or right
            };
        };
        

        // don't transition x.  Initially, put all labels on the dataLabel side
        labels.attr("x",           (d, i) => calcX(d, dataLabel).offset)
             .style("text-anchor", (d, i) => calcX(d, dataLabel).textAnchor);

        // transition y and styles
        const labelTransition = 
            labels.transition("label-update").duration(transitionTime)
                .style({
                    "fill": (d) => colors(d.type),
                    "stroke-width": 0,
                    "dominant-baseline": "middle",
                    "fill-opacity": function(d){
                        // only show the significantType (country, region, world)
                        return (d.type === significantType) ? 1 : 0;
                    } 
                })
                .text((d) => d.value + ((units) ? units : ""));

        
        // on hover, jump the non-significant labels to their position, then fade them in and "relax" them
        if (hover) {
            labels.attr("y", (d) => scale(d.value));
            labelTransition.style("fill-opacity", 1);
            this.relaxLabels(labels);
        }

        // if this isn't on hover, transition the y
        else {
            labelTransition.attr("y", (d) => scale(d.value));
        }

    },

    // transition the labels away from each other so they don't overlapi9o
    relaxLabels: function(labels){
        let alpha = 1;
        let spacing = 18;
        let again = false;

        labels.each(function(da, i){
            let a = this;
            let d3a = d3.select(a);
            let ya = d3a.attr('y');

            labels.each(function(db, j){
                let b = this;

                if(a === b){ return; }

                let d3b = d3.select(b);
                let yb = d3b.attr("y");
                let deltaY = ya - yb;

                if (Math.abs(deltaY) > spacing) { return; }

                again = true;
                let sign = deltaY > 0 ? 1 : -1;
                let adjust = sign * alpha;

                d3a.attr("y", + ya + adjust);
                d3b.attr("y", + yb - adjust);

            });
        });

        if(again) {
            setTimeout(() => { 
                this.relaxLabels(labels); 
            }, 16);
        }
    },

    _drawAxis: function(el, range, axisLabel){

        let svg = d3.select(el).select(".thermometer-svg-g");

        let yAxis = svg.append("g")
            .attr("class", "y axis");
        
        let yAxisStyle = {
                "stroke": "black",
                "stroke-width": "1px"
            };

        yAxis.append("path").style(yAxisStyle)
            .attr("d", `M${width/2},0 L${width/2},${height}`);
        
        // top tick            
        yAxis.append("path").style(yAxisStyle)
            .attr("d", this._tick(0, tickWidth));

        // bottom tick            
        yAxis.append("path")
            .attr("d", this._tick(height, tickWidth))
            .style(yAxisStyle);


        // add axis labels
        if (range !== undefined && axisLabel !== "none" && axisLabel !== "male"){

            let style = {
                "dominant-baseline": "middle",
                "text-anchor": "start"
            };

            // label to the right of the axis
            let x = width/2 + tickWidth/2 + 3;

            let topY = 0;

            // move the label over if this is a "female"
            if (axisLabel === "female"){
                style["text-anchor"] = "middle";
                x = 0 - margin.left - parseInt(d3.select(el).style("padding-left")); // make sure it's centered
                // topY = "0.5em"; // make the top label be lower
            }

            yAxis.append("text")
                .attr("x", x)
                .attr("y", topY)
                .style(style) 
                .text(range.max);

            yAxis.append("text")
                .attr("x", x)
                .attr("y", height)
                .style(style)
                .text(range.min);
        }
    },

    _tick: function(y, tickWidth){
        return `M${width/2 - tickWidth/2},${y} L${width/2 + tickWidth/2},${y}`;
    }
};

export default d3Thermometer;
