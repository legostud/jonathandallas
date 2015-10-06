import React from "react";
import SinglePanel     from "./SinglePanel.jsx";
import DoublePanel     from "./DoublePanel.jsx";
import MaleFemalePanel from "./MaleFemalePanel.jsx";
import InfoOverlay     from "./InfoOverlay.jsx";


let GenderFocus = React.createClass({

    displayName: "GenderFocus",

    propTypes: {
        data: React.PropTypes.shape({
            panels: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    title: React.PropTypes.string,
                    key: React.PropTypes.string,
                    panelType: React.PropTypes.oneOf(["single", "double", "male-female"]).isRequired
                })
            ).isRequired,
            areas: React.PropTypes.shape({
                world: React.PropTypes.object.isRequired,
                region: React.PropTypes.object.isRequired,
                country: React.PropTypes.object.isRequired
            }).isRequired
        }).isRequired
    },

    getInitialState: function(){
        return {
            showInfo: false
        };
    },

    toggleInfo: function(){
        
        this.setState({
            showInfo: !this.state.showInfo
        });

    },

    render: function(){
    
        let { panels, areas } = this.props.data;

        let showInfo = (this.state.showInfo) ? " gender-focus--show-info" : "";

        return (
            <div className={"gender-focus" + showInfo}>
                <div className="gender-focus__title">
                    2015 women’s empowerment indicators
                </div>

                <InfoOverlay showInfo={this.state.showInfo} onInfoClick={this.toggleInfo} />

                <div className="legend">
                    <div className={"legend__item" + (areas.country.name === undefined ? " legend__item--disabled" : "")}>
                        <svg className="legend__icon" width="14" height="14">
                            <circle cx="7" cy="7" r="7" opacity="0.8" fill="#F2AC00" ></circle>
                        </svg>
                        {areas.country.name || "Country"}
                    </div>
                    <div className={"legend__item" + (areas.region.name === undefined ? " legend__item--disabled" : "")}>
                        <svg className="legend__icon" width="35" height="14">
                            <path d="M5,7 L30,7" style={{stroke: "#7F6EA5", strokeWidth: 2, strokeLinecap: "round"}}></path>
                        </svg>
                        {areas.region.name || "Region"}
                    </div>
                    <div className="legend__item">
                        <svg className="legend__icon" width="25" height="14">
                            <path d="M5,7 L20,7" style={{stroke: "#82C09A", strokeWidth:6, strokeLinecap: "round"}}></path>
                        </svg>
                        {areas.world.name || "World"}
                    </div>
                </div>

                <div className="gender-focus-panels">
                    {panels.map((p) => {

                        switch(p.panelType){
                            case "single":
                                return React.createElement(SinglePanel , {
                                        title: p.title,
                                        subTitle: p.subTitle,
                                        key: p.key,
                                        data: p.data,
                                        range: p.range,
                                        info: p.info,
                                        units: p.units,
                                        hasSignificantData: p.hasSignificantData
                                    });

                            case "double":
                                return React.createElement(DoublePanel, {
                                        title: p.title,
                                        key: p.key,
                                        panels: p.panels
                                    });

                            case "male-female":
                                return React.createElement(MaleFemalePanel, {
                                        title: p.title,
                                        subTitle: p.subTitle,
                                        key: p.key,
                                        data: p.data,
                                        range: p.range,
                                        info: p.info,
                                        units: p.units,
                                        hasSignificantData: p.hasSignificantData
                                    });

                            default: 
                                return <div className="gender-focus-panel" key={p.title}></div>;

                        }
                    })}

                    
                </div>

            </div>
        );
    }
});

export default GenderFocus;
