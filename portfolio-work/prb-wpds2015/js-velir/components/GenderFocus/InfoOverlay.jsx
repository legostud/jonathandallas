import React from "react";

let InfoOverlay = React.createClass({

    displayName: "InfoOverlay",

    propTypes: {
        showInfo: React.PropTypes.bool.isRequired,
        onInfoClick: React.PropTypes.func.isRequired
    },

    render: function(){

        const svg = (
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 35 35" enable-background="new 0 0 35 35">
                <circle fill="#3E4E50" cx="17.5" cy="17.5" r="14.2"/>
                <circle fill="none" stroke="#47494C" stroke-miterlimit="10" cx="17.5" cy="17.5" r="17"/>
                {
                    (this.props.showInfo) 
                        ? <path id="toggle-info-x" fill="#C8D66C" d="M20.2,23.5l-2.7-4.1l-2.8,4.1h-3.5l4.3-6.2l-4-5.8H15l2.5,3.7l2.5-3.7h3.5l-4,5.8 l4.3,6.2H20.2z"/>
                        : <path id="toggle-info-i" fill="#C8D66C" d="M14.4,23.4h1.7v-7.3h-1.8V14H19v9.4h1.7v2.2h-6.2V23.4z M16.1,9.4H19V12h-2.9V9.4z"/>
                }
            </svg>
        );

        return (
            <div className="gender-focus__info">
                
                <div className="gender-focus__info-content info-overlay">
    
                    <div className="info-overlay__col">
                        <div className="info-overlay__section">
                            <div className="info-overlay__title">Fertility</div>
                            <strong>Total Fertility Rate</strong>
                            <p>The average number of children a woman would have assuming that current age-specific birth rates remain constant throughout her childbearing years (usually considered to be ages 15 to 49).</p>
                            <strong>% Use of Modern Contraception</strong>
                            <p>The percent of currently married or “in union” women of reproductive age who currently use a “modern” contraception method, such as the pill, IUD, condom, or sterilization. </p>
                            </div>
                    </div>

                    <div className="info-overlay__col">
                        <div className="info-overlay__section">
                            <div className="info-overlay__title">Education</div>
                            <strong>% Enrolled in Secondary School</strong>
                            <p>The number of students enrolled in secondary education divided by the secondary-school-age population (the Gross Enrollment Ratio). The ratio can be over 100 when there are students enrolled who are older or younger than the age expected for secondary school students.</p>
                        </div>
                        <div className="info-overlay__section">
                            <div className="info-overlay__title">Employment</div>
                            <strong>% Nonagricultural Wage Earners Who Are Women </strong>
                            <p>The percent of workers in wage employment in the nonagricultural sector who are women.</p>
                        </div>
                    </div>

                    <div className="info-overlay__col">
                        <div className="info-overlay__section">
                            <div className="info-overlay__title">Government</div>
                            <strong>% Parliament Members Who Are Women</strong>
                            <p>The percent of seats in a country’s single chamber, combined higher and lower chambers of the national parliament, or other national legislature held by women. </p>
                        </div>
                        <div className="info-overlay__section">
                            <div className="info-overlay__title">Health</div>
                            <strong>Life Expectancy at Birth (Years)</strong>
                            <p>The average number of years a newborn infant can expect to live under current mortality rates.</p>
                        </div>
                    </div>

                </div>

                <div className="gender-focus__info-toggle" onClick={this.props.onInfoClick}>{svg}</div>
                
            </div>
        );
    }
});

export default InfoOverlay;
