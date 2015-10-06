import React from "react";
import ThermometerChart from "./ThermometerChart.jsx";
import NoData           from "./NoData.jsx";


let DoublePanel = React.createClass({

    displayName: "DoublePanel",

    propTypes: {
        title: React.PropTypes.string,
        key: React.PropTypes.string,
        panels: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                subTitle: React.PropTypes.string,
                range: React.PropTypes.shape({min: React.PropTypes.number, max: React.PropTypes.number}),
                data: React.PropTypes.array,
                info: React.PropTypes.string,
                hasSignificantData: React.PropTypes.bool
            })
        )
    },

    renderThermometerChart: function(panel){

        return React.createElement(ThermometerChart, {
            data : panel.data,
            range: panel.range,
            units: panel.units,
            hasSignificantData: panel.hasSignificantData
        });
    },

    render: function(){

        return (
            <div className="gender-focus-panel gender-focus-panel--double">
                <div className="gender-focus-panel__title">{this.props.title}</div>

                <div className="gender-focus-panel__content">
                    <div className="gender-focus-panel__sub-panels">
                        <div className="gender-focus-panel__sub-panel">
                            <div className="gender-focus-panel__sub-title">{this.props.panels[0].subTitle}</div>
                            
                            {/* include modifier class if there is no data for the selectedArea */}
                            <div className={"gender-focus-panel__chart" + ((!this.props.panels[0].hasSignificantData) ? " gender-focus-panel__chart--no-data" : "")}>
                                <NoData />
                                {this.renderThermometerChart(this.props.panels[0])}
                            </div>

                        </div>

                        <div className="gender-focus-panel__sub-panel">
                            <div className="gender-focus-panel__sub-title">{this.props.panels[1].subTitle}</div>
                            
                            <div className={"gender-focus-panel__chart" + ((!this.props.panels[1].hasSignificantData) ? " gender-focus-panel__chart--no-data" : "")}>
                                <NoData />
                                {this.renderThermometerChart(this.props.panels[1])}
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
});

export default DoublePanel;
