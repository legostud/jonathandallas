import React      from "react";
import d3Arc      from "../d3Arc.js";


let Arc = React.createClass({

    displayName: "Arc",

    propTypes: {
        isWorld: React.PropTypes.bool, 
        countries: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                population: React.PropTypes.object.isRequired
            })
        ).isRequired,

        selectedArea: React.PropTypes.string,
        shouldTransition: React.PropTypes.bool
    },

    getDefaultProps: function(){
        return {
            shouldTransition: false
        };
    },



    // when the window resizes, resize the svg
    onResize: function(){
        // remove the svg and reupdate to fill the space
        d3Arc.removeSvg(this.getDOMNode());
        this.componentDidUpdate();
    },

    componentDidMount: function(){


        window.addEventListener("resize", this.onResize);

        // call this after the page has loaded so the container is the correct size. 
        // d3Arc.js measures it's container when it updates
        this.boundComponentDidUpdate = this.componentDidUpdate.bind(this);
        window.addEventListener("load", this.boundComponentDidUpdate);
    },


    componentWillUnmount: function(){
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("load", this.boundComponentDidUpdate);
    },


    componentDidUpdate: function(){

        d3Arc.update({ 
            el: this.getDOMNode(), 
            countries: this.props.countries,
            selectedArea: this.props.selectedArea,
            shouldTransition: this.props.shouldTransition,
            isWorld: this.props.isWorld
        });
        
    },

    render: function(){

        return (
            <div className="arc"></div>
        );
    }

});

export default Arc;
