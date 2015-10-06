import React      from "react";
import dispatcher from "../dashboard-dispatcher.js";

let RegionSelector = React.createClass({

    displayName: "RegionSelector",

    propTypes: {
        region: React.PropTypes.string.isRequired, // id of the selected tab
        regions: React.PropTypes.shape({
            name: React.PropTypes.string,
            children: React.PropTypes.arrayOf(
                React.PropTypes.shape({ 
                    name: React.PropTypes.string
                })
            )
        }).isRequired // rawData from dispatcher state
    },

    handleClick: function(region){
        
        dispatcher.setState({
            selectedArea: region
        });

    },

    render: function(){

        let regions = [];

        regions.push(this.props.regions.name); // World

        this.props.regions.children.forEach((region) => {
            regions.push(region.name);
        });

        return (
            <div className="region-selector">
                <div className="region-selector__content">
                    <div className="region-selector__label">Select View</div>
                    {regions.map((region) => {
                        const selected = (this.props.region === region) ? " region-selector__tab--selected" : "";
                        const lac = (region.match(/caribbean/i) !== null) ? " region-selector__tab--lac" : ""; // special treatment for LAC
                        return (
                            <div 
                                className={"region-selector__tab" + selected + lac}
                                key={region}
                                onClick={this.handleClick.bind(this, region)}
                            >
                            {region}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

});

export default RegionSelector;
