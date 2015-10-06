import React from "react";
import ThermometerChart from "./ThermometerChart.jsx";
import NoData           from "./NoData.jsx";


let MaleFemalePanel = React.createClass({

    displayName: "MaleFemalePanel",

    propTypes: {
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        range: React.PropTypes.shape({min: React.PropTypes.number, max: React.PropTypes.number}),
        data: React.PropTypes.shape({
            male: React.PropTypes.array.isRequired,
            female: React.PropTypes.array.isRequired
        }),
        info: React.PropTypes.string,
        hasSignificantData: React.PropTypes.bool,
        units: React.PropTypes.oneOf(["%"])
    },

    getInitialState: function(){
        return {
            hover: false
        };
    },

    renderThermometerCharts: function(){

        return (
            <div className="male-female-charts">

                {React.createElement(ThermometerChart, {
                    title              : "male",
                    data               : this.props.data.male,
                    range              : this.props.range,
                    dataLabel          : "left",
                    axisLabel          : "male" ,
                    units              : this.props.units,
                    hover              : this.state.hover
                })}

                {React.createElement(ThermometerChart, {
                    title              : "female",
                    data               : this.props.data.female,
                    range              : this.props.range,
                    dataLabel          : "right",
                    axisLabel          : "female" ,
                    units              : this.props.units,
                    hover              : this.state.hover
                })}

            </div>    
        );

    },

    toggleHover: function(event){

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


    render: function(){

        return (
            <div className="gender-focus-panel">
                <div className="gender-focus-panel__title">{this.props.title}</div>

                <div className="gender-focus-panel__content">
                
                    <div className="gender-focus-panel__sub-title">{this.props.subTitle}</div>
                    
                    {/* include modifier class if there is no data for the selectedArea */}
                    <div className={"gender-focus-panel__chart" + ((!this.props.hasSignificantData) ? " gender-focus-panel__chart--no-data" : "")}
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}
                        onTouchStart={this.toggleHover}
                    >
                        <NoData />
                        {this.renderThermometerCharts()}
                    </div>
                    
                </div>
                
            </div>
        );  
    }
});

export default MaleFemalePanel;
