import React          from "react";
import $              from "jquery";
import Arc            from "./Arc.jsx";
import RegionSelector from "./RegionSelector.jsx";
import YearSelector   from "./YearSelector.jsx";
import YearPopulation from "./YearPopulation.jsx";
import AreaSelector   from "./AreaSelector.jsx";
import GenderFocus    from "./GenderFocus/GenderFocus.jsx";
import MiniPanels     from "./MiniPanels.jsx";

let Dashboard = React.createClass({

    displayName: "Dashboard",

    getInitialState: function(){
        return {
            shouldTransition: false,
            size: "full" // or "mini"
        };
    },

    propTypes: {
        appState: React.PropTypes.shape({
            countries: React.PropTypes.array.isRequired,
            region: React.PropTypes.string.isRequired,
            year: React.PropTypes.number.isRequired,
            selectedArea: React.PropTypes.string.isRequired,
            selectedAreaData: React.PropTypes.object.isRequired,
            genderFocusData: React.PropTypes.object.isRequired,
            rawData: React.PropTypes.object.isRequired,
            isWorld: React.PropTypes.bool.isRequired
        }).isRequired // the current state
    },

    componentWillReceiveProps: function(newProps){

        // only transition the viz if the year has changed.
        this.setState({
            shouldTransition: (this.props.appState.year !== newProps.appState.year)
        });

    },

    onResize: function(){

        if ($(window).width() <= 690){

            if (this.state.size !== "mini"){
                this.setState({ size: "mini" });
            }
            
        }
        else {
            if (this.state.size !== "full"){
                this.setState({ size: "full" });
            }
        }
    },

    componentDidMount: function(){
        window.addEventListener("resize", this.onResize);
        this.onResize(); // do this check initially
    },

    componentWillUnmount: function(){
        window.removeEventListener("resize", this.onResize);
    },
    
    getFullDashboard: function(){

        const { countries, region, isWorld, year, selectedArea, 
            rawData, selectedAreaData, genderFocusData } = this.props.appState;

        return (
            <div className="dashboard--full">

                <div className="dashboard-header">
                    <div className="dashboard-header__content">
                        <h1 className="dashboard-header__title styled-title"><span>dashboard</span></h1>
                        <div className="dashboard-header__instructions instructions">
                            CLICK on the arc or use the search box to explore the data
                        </div>
                    </div>

                    <div className="dashboard-header__area-selector">
                        <AreaSelector selectedArea={selectedArea} areas={rawData} />
                    </div>
                </div>


                <RegionSelector region={region} regions={rawData} />

                <div className="population-viz">
                    <YearPopulation 
                        year={2015} 
                        population={selectedAreaData.population["2015"]}
                        ranking={selectedAreaData.ranking["2015"]}  
                        selected={year == 2015} />

                    <Arc 
                        isWorld={isWorld}
                        countries={countries} 
                        shouldTransition={this.state.shouldTransition} 
                        selectedArea={selectedArea} />
                    
                    <YearSelector year={year} />
                    
                    <YearPopulation 
                        year={2050} 
                        population={selectedAreaData.population["2050"]}
                        ranking={selectedAreaData.ranking["2050"]} 
                        selected={year == 2050} />
                
                </div>
                
                <GenderFocus data={genderFocusData} />

            </div>
        );
    },

    getMiniDashboard: function(){
        return (
            <div className="dashboard--mini"> 
                
                <div className="dashboard-header">
                    <h2 className="dashboard-header__title styled-title"><span>dashboard</span></h2>
                    <div className="dashboard-header__instructions">Select country, region, or world</div>
                </div>

                <AreaSelector selectedArea={this.props.appState.selectedArea} areas={this.props.appState.rawData}/>

                <MiniPanels 
                    population={this.props.appState.selectedAreaData.population}
                    ranking={this.props.appState.selectedAreaData.ranking}
                    genderFocusData={this.props.appState.genderFocusData} />

            </div>
        );
    },

    render: function(){

        if (this.state.size == "full"){
            return this.getFullDashboard();
        }
        else if (this.state.size == "mini"){
            return this.getMiniDashboard();
        }

    }

});

export default Dashboard;
