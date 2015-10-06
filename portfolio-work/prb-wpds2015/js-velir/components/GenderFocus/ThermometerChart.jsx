import React         from "react";
import d3Thermometer from "../../d3Thermometer.js";


let ThermometerChart = React.createClass({

    displayName: "ThermometerChart",

    propTypes: {
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
            type: React.PropTypes.oneOf(["world", "region", "country"]),
            value: React.PropTypes.number
        })).isRequired,
        title: React.PropTypes.string,
        range: React.PropTypes.shape({min: React.PropTypes.number, max: React.PropTypes.number}),
        dataLabel: React.PropTypes.oneOf(["left", "right"]),
        units: React.PropTypes.oneOf(["%"]),
        axisLabel: React.PropTypes.oneOf(["normal", "none", "male", "female"]),
        hasSignificantData: React.PropTypes.bool,
        hover: React.PropTypes.bool
    },

    getInitialState: function(){
        return {
            hover: this.props.hover
        };
    },

    componentDidMount: function(){

        d3Thermometer.create(this.getD3Params());

    },

    componentWillReceiveProps: function(newProps){
        // update the hover state when new props come in
        this.setState({
            hover: newProps.hover
        });
    },

    componentDidUpdate: function(){

        d3Thermometer.update(this.getD3Params());
        
    },

    toggleHover: function(event){

        // don'tupdate if we've been given this.props.hover.  the props value trumps state
        if (typeof(this.props.hover) !== "undefined") { return; }

        // if this was a touch event, toggle the hover state
        if (event.type === "touchstart"){
            event.preventDefault(); // prevent the mouse events from being fired
            this.setState({ hover: !this.state.hover});
        }
        else {
            // true for mouseenter, false for mouseleave
            this.setState({ hover: (event.type === "mouseenter") });
        }
    },

    getD3Params: function(){
        return {
            el: React.findDOMNode(this.refs.svg),
            data: this.props.data,
            range: this.props.range,
            dataLabel: this.props.dataLabel,
            axisLabel: this.props.axisLabel,
            units: this.props.units,
            hasSignificantData: this.props.hasSignificantData,
            hover: this.state.hover
        };
    },

    render: function(){
        return (
            <div className="thermometer-chart">
                <div className="thermometer-chart__title">{this.props.title}</div>
                <div className="thermometer-chart__svg" 
                     ref="svg"
                     onMouseEnter={this.toggleHover}
                     onMouseLeave={this.toggleHover}
                     onTouchStart={this.toggleHover}> 
                </div>
            </div>

        );
    }
});

export default ThermometerChart;
