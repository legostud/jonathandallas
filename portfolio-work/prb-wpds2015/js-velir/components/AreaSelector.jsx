import React      from "react";
import Select2    from "./Select2.jsx";
import dispatcher from "../dashboard-dispatcher.js";

let AreaSelector = React.createClass({

    displayName: "AreaSelector",

    propTypes: {
        areas: React.PropTypes.object.isRequired,
        selectedArea: React.PropTypes.string
    },

    getInitialState: function(){
        return {
            chosenSupported: true
        };
    },

    handleChosenNotSupported: function(){
        this.setState({
            chosenSupported: false
        });
    },

    handleAreaChange: function(selectedArea){
        dispatcher.setState({
            selectedArea: selectedArea
        });
    },

    getOptions: function(){

        // create a flat array full of the regions and countries.  
        // Initally sorted: region, [all region countries], region2, [all region2 countries], ...
        let areas = this.props.areas.children
            
            // get a flat array of all regions and their children
            .reduce((allAreas, region) => {
                return allAreas.concat({
                    name: region.name, 
                    type: "region"
                })
                .concat(region.children.map((country) => {
                    return {
                        name: country.name,
                        type: "country"
                    };
                }));
            }, []);

        // if chosen isn't supported, sort them by name with regions sorted in
        if (!this.state.chosenSupported){
            areas.sort((a, b) => a.name.localeCompare(b.name));
        }
            
        // create <option> elements
        return areas.map((area) => {
            return <option value={area.name} className={area.type} key={area.name}>{area.name}</option>;
        });
    },


    render: function(){

        const classes = "area-selector " + ((!this.state.chosenSupported) ? " area-selector--raw" : "");

        return (
            <div className={classes}>
                <Select2 
                    onSelectChange={this.handleAreaChange} 
                    value={this.props.selectedArea} 
                    onNotSupported={this.handleChosenNotSupported}
                    width="300px"
                >
                    <option value={this.props.areas.name} className="world" key="world">{this.props.areas.name}</option>
                    
                    {this.getOptions()}    
                </Select2>
            </div>
        );

    }
});

export default AreaSelector;
