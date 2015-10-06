import React      from "react";
import dispatcher from "../dashboard-dispatcher.js";

let YearSelector = React.createClass({

    displayName: "YearSelector",

    propTypes: {
        year: React.PropTypes.number.isRequired // selected year
    },

    handleClick: function(year){
        
        dispatcher.setState({
            year: year
        });

    },

    render: function(){

        let years = [2015, 2050];

        return (
            <div className="year-selector">
                <div className="year-selector__label">Population Rank</div>
                <div className="year-selector__tabs">
                {years.map((year) => {
                    const selected = (this.props.year === year) ? "year-selector__tab--selected" : "";

                    return (
                        <div 
                            className={"year-selector__tab " + selected}
                            key={year}
                            onClick={this.handleClick.bind(this, year)}
                        >
                        {year}
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }

});

export default YearSelector;
