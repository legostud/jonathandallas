import d3 from "d3";
import $  from "jquery";
import dispatcher from "./dashboard-dispatcher.js";


// private 
let createSvg = function({el, countries}) {
        // create and append the svg
        d3.select(el).append("svg")
            .attr("style", "overflow: visible")
            .attr("class", "arc-svg")
          .append("g")
            .attr("class", "arc-svg-g"); // center the pie

        // now update with the data
        d3Arc.update(arguments[0]);
};


let d3Arc = {

    removeSvg: function(el){
        const svg = d3.select(el).select(".arc-svg");
        svg.remove();
    },

    // el: element to attach the chart to
    // countries: an array of country data
    // selectedArea: the name of the selectedArea ("World", a region, or a country)
    // shouldTransition:  true/false (we don't want to transition when changing regions)
    // isWorld: if the arc is showing the whole world, as opposed to a region
    update: function({el, countries, selectedArea, shouldTransition = false, isWorld}){

        if (!countries.length){ console.log("POOF"); return; }

        const svg = d3.select(el).select(".arc-svg");

        // if the svg isn't there yet, create it first
        if(!svg.node()) { 
            return createSvg(arguments[0]); 
        }

        // update the size
        const width              = $(el).width();
        const height             = width/2;
        const radius             = height;
        const thickness          = height/3;
        const outsideLabelRadius = radius + 20;
        const insideLabelRadius  = (radius - thickness) - 20;

        svg.attr("width", width)
           .attr("height", height);

        const svgG = d3.select(el).select(".arc-svg-g"); 

        svgG.attr("transform", `translate(${width/2}, ${radius + ((height-radius)/2)})`)   ;


        const pie = d3.layout.pie()
            .sort(null) // make sure it preserves the sort
            .value((d, i) => 1) // make all the slices equal width
            // .padAngle(Math.PI/2/720) // space between slices -- we're using stroke on the .slice now
            .startAngle(-Math.PI/2)
            .endAngle(Math.PI/2);

        // map the values to pie objects with keys: endAngle, padAngle, startAngle, value
        const dataPie = pie(countries); // pi objects
        // const dataValues = dataPie.map(d => d.value); // array of numbers

        // const min = Math.min(...dataValues);
        // const max = Math.max(...dataValues);
        const count = countries.length;

        const transitionTime = (shouldTransition ? 500 : 0);

        const colors = d3.scale.linear()
                .range(["#295252", "#97C8C8"]);
        

        // function to generate an arc slice
        const arc = d3.svg.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        // make the arc larger when hovered
        const arcHover = d3.svg.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius + 10);

        // create a "slice" group to hold the arc and the text
        const slice = svgG.selectAll(".slice")
            .data(dataPie, (d) => d.data.name);

    
        /**
         * Enter, when data points are added 
         */
        const newSlice = slice.enter()
            .append("g")
            .attr("class", "slice")
            .style({
                "stroke": "white", 
                "stroke-width": "1px"
            });

        // add all sub elements to the <g class="slice" />
        // HACK! the text needs to be a <g> in order for getBBox to return the box after transforms (rotate, radius) are applied
        // http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__getBBox  "all contained graphics"
        newSlice.append("g").attr("class", "outside-label").append("text"); 
        newSlice.append("text").attr("class", "inside-label");
        newSlice.append("path").attr("class", "arc-path");

       
        /**
         * Exit, when data points are removed 
         */
        slice.exit().remove();


        /**
         * Update, when data points are changed 
         */

        // add is-selected class so we can identify the selected slice
        slice.classed("is-selected", (d) => (d.data.name === selectedArea)); 

        const selectedSlice = slice.filter((d) => (d.data.name === selectedArea));


        // update arc path
        const arcPath = slice.select(".arc-path");

        arcPath
            .transition("arc-path-update")
            .duration(transitionTime)
            .style("fill", (d, i) => {

                // get the ranking of this country in relation to the world, or region
                let ranking = d.data.ranking["2015"];
                ranking = (isWorld) ? ranking["world"] : ranking["region"]; 

                let color = colors(ranking/count);

                // darken the selected country
                if (d.data.name === selectedArea){ color = "#C7D66D"; } 

                return color;
            }) 
            .attr("d", (d) => (d.data.name === selectedArea) ? arcHover(d) : arc(d));           


        let textStyles = {
            "text-anchor": "middle",
            "stroke-width" : 0,
            "display": (d) => (d.data.name === selectedArea) ? "block" : "none",
            "fill-opacity": "1" // make sure it's always reset after being the selected slice
        };

        // update outside label (country name)
        slice.select(".outside-label text")
            .transition("outside-label-update")
            .duration(transitionTime)
            .attr("transform", function (d) {
                // find the angle of the center of the arc path
                const rotate = (d.startAngle - (d.startAngle - d.endAngle)/2) * (180/Math.PI); // radians to degrees

                // the origin is the center of the pie
                let [x, y] = arc.centroid(d); // center of arc path
                let h = Math.sqrt(x*x + y*y); // pythagorean theorem for hypotenuse
                    x = (x/h * outsideLabelRadius);
                    y = (y/h * outsideLabelRadius);

                return `translate(${x}, ${y}) rotate(${rotate})`; 
            })
            .style(textStyles)
            .text((d) => d.data.name);
        


        // add inside label (country population ranking)
        slice.select(".inside-label")
            .transition("inside-label-update")
            .duration(transitionTime)
            .attr("transform", function (d) {
                const rotate = (d.startAngle - (d.startAngle - d.endAngle)/2) * (180/Math.PI); // radians to degrees

                let [x, y] = arc.centroid(d);
                let h = Math.sqrt(x*x + y*y); // pythagorean theorem for hypotenuse
                    x = (x/h * insideLabelRadius);
                    y = (y/h * insideLabelRadius);
                      
                return `translate(${x}, ${y}) rotate(${rotate})`; 
            })
            .style(textStyles)
            .text((d, i) => i + 1);




        

        /**
         * Slice events
         */

        // common function for touch and click
        const onSliceClick = function(d){
            dispatcher.setState({
                selectedArea: d.data.name
            });
        };

        // we need to handle touch because touch only devices will fire the mouseenter on the first touch (skipping click)
        // until the same touch happens again.
        // http://www.html5rocks.com/en/mobile/touchandmouse/
        slice.on("touchstart", function(d){

            // prevent mouse events from occuring, see event order in article
            d3.event.preventDefault();

            onSliceClick(d);
        });

        // handle mouse events
        slice
            .on("mouseenter", function() {
                let slice = d3.select(this);
                
                // grow the path 
                slice.select(".arc-path")
                    .transition("arc-path-hover").duration(100)
                    .attr("d", arcHover);

                // show the labels
                slice.select(".outside-label text").style({ "display": "block" });
                slice.select(".inside-label").style({ "display": "block" });
 
                // if there is a selected slice, dim the label if it intersects with this one
                if (!selectedSlice.empty()){

                    // if the user is hovering over the selected slice, un-dim it immediately
                    if (selectedSlice.node() === slice.node()){ 
                        selectedSlice.selectAll(".outside-label text, .inside-label")
                            .transition("text-opacity").duration(0)
                            .style({"fill-opacity": "1" });
                    }

                    // otherwise, check if they are overlapping
                    else {

                        // important to select the ".outside-label" and not ".outside-label text" (see HACK! above)
                        let selectedBBox = selectedSlice.select(".outside-label").node().getBBox();
                        let sliceBBox    =         slice.select(".outside-label").node().getBBox(); 

                        selectedSlice.selectAll(".outside-label text, .inside-label")
                            .transition("text-opacity").duration(150)
                            .style({"fill-opacity": doBoxesIntersect(selectedBBox, sliceBBox) ? "0.1" : "1" });
                        
                    }

                }

            })
            .on("mouseleave", function(d) {

                // don't revert if this is the selected country
                if (d.data.name === selectedArea){ return; } 

                let slice = d3.select(this);

                // revert the path
                slice.select(".arc-path")
                    .transition("arc-path-hover").duration(100)
                    .attr("d", (d) => {
                        return (d.data.name === selectedArea) ? arcHover(d) : arc(d);
                    });

                // hide the labels
                slice.select(".outside-label text").style({ "display": (d) => (d.data.name === selectedArea) ? "block" : "none" });
                slice.select(".inside-label").style({ "display": (d) => (d.data.name === selectedArea) ? "block" : "none" }); 

                // always reset the opacity of the selected slice text
                selectedSlice.selectAll(".outside-label text, .inside-label")
                    .transition("text-opacity").duration(150)
                    .style({ "fill-opacity": "1" });  
                
            })
            .on("click", function(d){
                onSliceClick(d);
            });

    }
    
};

function doBoxesIntersect(a, b) {
    if (a.x + a.width <= b.x) return false; // a is left of b
    if (b.x + b.width <= a.x) return false; // a is right of b
    if (a.y + a.height <= b.y) return false; // a is above b
    if (b.y + b.height <= a.y) return false; // a is below b
    return true; // boxes overlap
}



export default d3Arc;
