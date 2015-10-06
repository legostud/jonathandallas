import React from "react";
import dispatcher from "../dashboard-dispatcher.js";


let YearPopulation = React.createClass({

    displayName: "YearPopulation",

    propTypes: {
        year: React.PropTypes.number.isRequired,
        selected: React.PropTypes.bool,
        population: React.PropTypes.number,
        ranking: React.PropTypes.shape({
            world: React.PropTypes.number,
            region: React.PropTypes.number
        })
    },

    getDefaultProps: function(){
        return {
            ranking: {}
        };
    },

    formatPopulation: function(population){

        if (population / 1000000000 >= 1){
            return (population / 1000000000).toFixed(1) +  " Billion";
        }
        else if (population / 1000000 >= 1) {
            return (population / 1000000).toFixed(1) + " Million";
        }
        
        // add commas if needed
        return population.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");

    },

    handleClick: function(year){
        
        dispatcher.setState({
            year: year
        });

    },

    render: function(){

        const selected = (this.props.selected) ? "year-population--selected" : "";

        return (
            <div className={`year-population ${selected}`} onClick={this.handleClick.bind(this, this.props.year)} >
                <div className="year-population__year">{this.props.year}</div>

                <div className="year-population__h1">Population</div>
                <div className="year-population__value">
                    {this.formatPopulation(this.props.population) || <span>&mdash;</span>}
                </div>


                <div className="year-population__h2">World Rank</div>
                <div className="year-population__value">
                    {this.props.ranking.world || <span>&mdash;</span>}
                </div>
                <div className="year-population__h2">Region Rank</div>
                <div className="year-population__value">
                    {this.props.ranking.region || <span>&mdash;</span>}
                </div>

            </div>
        );
    }
});

export default YearPopulation;
