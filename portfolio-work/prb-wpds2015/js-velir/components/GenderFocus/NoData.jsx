import React from "react";


let NoData = React.createClass({

    displayName: "NoData",

    render: function(){
        return (
            <div className="gender-focus-panel__no-data">
                <span>NO DATA</span>
            </div>
        );
    }
});

export default NoData;
