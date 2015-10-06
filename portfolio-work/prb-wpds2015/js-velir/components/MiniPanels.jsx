import React from "react";

let MiniPanels = React.createClass({

    displayName: "MiniPanels",

    propTypes: {
        
        population: React.PropTypes.shape({
            2015: React.PropTypes.number,
            2050: React.PropTypes.number
        }).isRequired,
        ranking: React.PropTypes.shape({
            2015: React.PropTypes.shape({
                world: React.PropTypes.number,
                region: React.PropTypes.number,
                country: React.PropTypes.number
            }),
            2050: React.PropTypes.shape({
                world: React.PropTypes.number,
                region: React.PropTypes.number,
                country: React.PropTypes.number
            })
        }).isRequired,
        genderFocusData: React.PropTypes.object.isRequired
    },

    formatPopulation: function(population){

        if (population / 1000000000 >= 1){
            return {
                number: (population / 1000000000).toFixed(1),
                magnitude: "Billion"
            };
        }
        else if (population / 1000000 >= 1) {
            return {
                number: (population / 1000000).toFixed(1),
                magnitude: "Million"
            };
        }
        else if (population / 1000 >= 1) {
            return {
                number: (population / 1000).toFixed(1),
                magnitude: "Thousand"
            };
        }
        
        throw error("oh noes!");

    },

    renderPopulationPanel: function(){

        let pop2015 = this.formatPopulation(this.props.population["2015"]);
        let pop2050 = this.formatPopulation(this.props.population["2050"]);

        let worldRank2015 = (this.props.ranking["2015"]) ? this.props.ranking["2015"].world : "-";    
        let worldRank2050 = (this.props.ranking["2050"]) ? this.props.ranking["2050"].world : "-";

        return (
            <div className="mini-panel mini-panel--population">
                <div className="mini-panel__title">Population</div> 

                <div className="mini-panel__two">
                    <div className="mini-panel__two-item">
                        <div className="mini-panel__year">2015</div>
                        <div className="mini-panel__value">
                            {pop2015.number} 
                            <span className="mini-panel__magnitude">
                                {pop2015.magnitude}
                            </span>
                        </div>
                    </div>
                    <div className="mini-panel__two-item">
                        <div className="mini-panel__year">2050</div>
                        <div className="mini-panel__value">
                            {pop2050.number}
                            <span className="mini-panel__magnitude">
                                {pop2050.magnitude}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mini-panel__title">World Ranking</div>  

                <div className="mini-panel__two">
                    <div className="mini-panel__two-item">
                        <div className="mini-panel__year">2015</div>
                        <div className="mini-panel__value">{worldRank2015}</div>
                    </div>
                    <div className="mini-panel__two-item">
                        <div className="mini-panel__year">2050</div>
                        <div className="mini-panel__value">{worldRank2050}</div>
                    </div> 
                </div>
            </div>
        );
    },

    renderGenderFocusPanels: function(){

        // only show the data for country, or region, or world (in that order)
        const significantAreaType = (function(areas){
            if (Object.keys(areas.country).length) { return "country"; }
            if (Object.keys(areas.region).length)  { return "region"; }
            if (Object.keys(areas.world).length)   { return "world"; }
        }(this.props.genderFocusData.areas));
        
        // for each panel, render each panel type ["single", "double", "male-female"]
        return this.props.genderFocusData.panels.map((panel) => {

            let panelContent = null;

            switch(panel.panelType){
                case "single":

                    // grab the data for the significant area type
                    const panelData = panel.data.find((p) => p.type === significantAreaType);

                    panelContent = (
                        <div className="mini-panel__content mini-panel--single">
                            <div className="mini-panel__label">{panel.subTitle}</div>
                            <div className="mini-panel__value">
                                {(panelData) ? panelData.value : "-"}
                                {(panelData && panel.units) ? panel.units : ""}
                            </div>
                        </div>
                    );
                    break;

                case "double":

                    panelContent = (
                        <div className="mini-panel__content mini-panel--double">

                            {panel.panels.map(function(subPanel){
                            
                                const subPanelData = subPanel.data.find((p) => p.type === significantAreaType);

                                return (
                                    <div className="mini-panel__double-panel-item" key={subPanel.key}>
                                        <div className="mini-panel__label">{subPanel.subTitle}</div>
                                        <div className="mini-panel__value">
                                            {(subPanelData) ? subPanelData.value : "-"}
                                            {(subPanelData && subPanel.units) ? subPanel.units : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                    break;

                case "male-female":

                    const maleData   =   panel.data.male.find((p) => p.type === significantAreaType);
                    const femaleData = panel.data.female.find((p) => p.type === significantAreaType);

                    panelContent = (
                        <div className="mini-panel__content mini-panel--male-female">
                            <div className="mini-panel__label">{panel.subTitle}</div>
                            <div className="mini-panel__two">
                                <div className="mini-panel__two-item">
                                    <div className="mini-panel__value">
                                        {(femaleData) ? femaleData.value : "-"}
                                        {(femaleData && panel.units) ? panel.units : ""}
                                        <div className="mini-panel__gender">female</div>
                                    </div>
                                </div>
                                <div className="mini-panel__two-item">
                                    <div className="mini-panel__value">
                                        {(maleData) ? maleData.value : "-"}
                                        {(maleData && panel.units) ? panel.units : ""}
                                        <div className="mini-panel__gender">male</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    break;
            }
            
            return (
                <div className={"mini-panel mini-panel--" + panel.key} key={panel.key}>
                    <div className="mini-panel__title">{panel.title}</div> 

                    {panelContent}

                </div>
            );

        });

    },


    render: function(){

        return (
            <div className="mini-panels">
                
                {this.renderPopulationPanel()}
                
                {this.renderGenderFocusPanels()}

            </div>
        );
    }
});

export default MiniPanels; 
