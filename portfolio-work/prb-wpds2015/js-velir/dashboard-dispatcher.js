import "./es6-polyfill.js";
import React      from "react";
import dataLoader from "./dataloader.js";
import Dashboard  from "./components/Dashboard.jsx";


let dispatcher = {

    // initial app state
    state: {

        // user supplied
        year: 2015,
        selectedArea: "", // World, a region, or a country
        
        // doesn't change, from json
        rawData: null,

        // calucalted (see addCalculatedStateValues)
        selectedAreaData: {},
        countries: [],
        region: "", // World or a region.  determines what to show in the arc
        genderFocusData: {}
    },

    // initialize the data and load the initial region
    start: function() {

        // load the json data
        dataLoader.loadData()
            .done((jsonData, textStatus, jqXHR) => {

                // add the raw data to the state so it's accessible
                this.state.rawData = jsonData;

                // default to "World"
                this.setState({
                    selectedArea: this.state.rawData.name
                });

            });
    },

    // set the state and rerender
    setState: function(newState) {

        newState = this.willReceiveNewState(newState);
        
        // merge the new state with the current state
        const mergedState = Object.assign({}, this.state, newState);

        // don't update if the new merged state is the same as the old state
        if (JSON.stringify(this.state) === JSON.stringify(mergedState)) { return; }

        // otherwise, update this.state
        this.state = mergedState;


        // update the dataLayer for google tag manager
        if (this.state.selectedArea){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                "event"       : "selectionchange",
                "selectedArea": this.state.selectedArea
            });
        }

        this.render();
    },

    // do any processing on the new state in relation to the old state
    willReceiveNewState: function(newState){
    
        // if the user clicked a region, and a country in that region is the selectedArea,
        // keep that country selected.
        if (
            this.state.region === this.state.rawData.name // "World"
            && dataLoader.isRegion(newState.selectedArea) 
            && dataLoader.isCountryInRegion(newState.selectedArea, this.state.selectedArea)
        ){
            newState.selectedArea = this.state.selectedArea;
            newState.region = newState.selectedArea;
        }


        // if the selectedArea was a country, and the user clicked the world, keep that country selected
        // and show the world region in the arc
        if (
            newState.selectedArea === this.state.rawData.name // "World"
            && dataLoader.isCountry(this.state.selectedArea)
            && this.state.region !== this.state.rawData.name // "World"
        ){
            newState.selectedArea = this.state.selectedArea;
            newState.region = this.state.rawData.name; // "World"
        }

        return newState;
    },

    // after we determine this state, calculate any addition items
    addCalculatedStateValues: function(){

        // calculate which region is selected
        this.state.region           = dataLoader.getRegion(this.state.selectedArea, this.state.region);

        // get the selected area data 
        this.state.selectedAreaData = dataLoader.getAreaData(this.state.selectedArea);

        // reload data with this region/year, and add it to the state
        this.state.countries        = dataLoader.getRegionCountries(this.state.region, this.state.year);
        
        // data for the gender focus charts
        this.state.genderFocusData  = dataLoader.getGenderFocusData(this.state.selectedArea);

        // if the shown region is "World"
        this.state.isWorld          = this.state.region === this.state.rawData.name; // "World"

    },

    render: function(){

        this.addCalculatedStateValues();

        // console.log("dispatcher state: ", this.state);
        
        // re-render the Dashboard with this state
        React.render(<Dashboard appState={this.state} />, document.querySelector(".dashboard"));
    }

};

export default dispatcher;
