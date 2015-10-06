import React from "react";
import ThermometerChart from "./ThermometerChart.jsx";
import NoData           from "./NoData.jsx";


let SinglePanel = React.createClass({

    displayName: "SinglePanel",

    propTypes: {
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        range: React.PropTypes.shape({min: React.PropTypes.number, max: React.PropTypes.number}),
        data: React.PropTypes.array,
        info: React.PropTypes.string,
        hasSignificantData: React.PropTypes.bool,
        units: React.PropTypes.oneOf(["%"])
    },

    renderThermometerChart: function(){

        return React.createElement(ThermometerChart, {
            data: this.props.data,
            range: this.props.range,
            units: this.props.units
        });
    },

    render: function(){

        return (
            <div className="gender-focus-panel">
                <div className="gender-focus-panel__title">{this.props.title}</div>

                <div className="gender-focus-panel__content">
                    <div className="gender-focus-panel__sub-title">{this.props.subTitle}</div>

                    {/* include modifier class if there is no data for the selectedArea */}
                    <div className={"gender-focus-panel__chart" + ((!this.props.hasSignificantData) ? " gender-focus-panel__chart--no-data" : "")}>
                        <NoData />
                        {this.renderThermometerChart()}
                    </div>
                </div>
                
            </div>
        );
    }
});

export default SinglePanel;
