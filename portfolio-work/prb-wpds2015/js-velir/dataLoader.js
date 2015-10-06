import "./es6-polyfill.js";
import $ from "jquery";


let dataLoader = {

    loadData: function(){
        return $.ajax({
                url: "data/population.json",
                cache: true
            })
            .done((jsonData, textStatus, jqXHR) => {
                this.data = jsonData;
                this.addRankingData();

                // sort regions a-z
                this.data.children.sort((a, b) => a.name.localeCompare(b.name));

            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.error("Error loading json", jqXHR);
            });
    },

    // add ranking data to our structure
    addRankingData: function(){
        
        let worldCounties2015 = this.getWorldData(2015);
        let worldCounties2050 = this.getWorldData(2050);

        // clone and put the regions in order
        let regions2015 = this.data.children.slice(0)
            .sort((a, b) => {
                let key = "2015"; 
                return b.population[key] - a.population[key];
            });

        let regions2050 = this.data.children.slice(0)
            .sort((a, b) => {
                let key = "2015"; 
                return b.population[key] - a.population[key];
            });

        // add empty ranking to world so it doesn't complain
        Object.assign(this.data, {ranking: {}});

        // for each region, update it's own rankings, and it's countries rankings
        this.data.children.forEach((region) => {
            
            Object.assign(region, {
                "ranking":  {
                    "2015": {
                        "world": 1 + regions2015.findIndex((r) => region.name === r.name )
                    },
                    "2050": {
                        "world": 1 + regions2050.findIndex((r) => region.name === r.name )
                    }
                }
            });

            // update each country rankings
            let thisRegion2015 = this.getRegionCountries(region.name, "2015");
            let thisRegion2050 = this.getRegionCountries(region.name, "2050");

            region.children.forEach((country, i) => {
                Object.assign(country, {
                    "ranking":  {
                        "2015": {
                            "world": 1 + worldCounties2015.findIndex((c) => country.name === c.name ),
                            "region": 1 + thisRegion2015.findIndex((c) => country.name === c.name )
                        },
                        "2050": {
                            "world": 1 + worldCounties2050.findIndex((c) => country.name === c.name ),
                            "region": 1 + thisRegion2050.findIndex((c) => country.name === c.name )
                        }
                    }
                });
            });

        });

    },

    // given "World", a region, or a country, return the region that it belongs to.
    // if we're already in the "World" view, only select a region if it's explicitly selected.
    // ie. stay in the "World" view if a country is selected.
    getRegion: function(selectedArea, currentRegion){

        // if the current region is world, keep it as world
        if (selectedArea === this.data.name ){ return this.data.name; }

        return this.data.children.reduce((prev, region, i) => {

            // if the selectedArea is a region
            if (region.name === selectedArea){ return region.name; }

            // if we're in the world view, and a country is selected, stay in world view
            if (currentRegion !== this.data.name){ 

                // if the selectedArea is a country
                let regionContains = region.children.some((country) => {
                    if (country.name === selectedArea){ return true; }
                });

                if (regionContains) { return region.name; }
            }

            return prev;

        }, this.data.name); // default to "World"
    },

    // returns true/false whether or not the selectedArea is a region (as opposed to country)
    isRegion: function(selectedArea){

        if (!this.data){ throw new Error("set data first!"); }

        let region = this.data.children.find((el, i, array) => {
            return el.name === selectedArea;
        });

        return region !== undefined;

    },

    // return true/false whether the selectedArea is a country
    isCountry: function(selectedArea){
        if (!this.data){ throw new Error("set data first!"); }

        let area = this.getAreaData(selectedArea);

        return area && !area.children;
    },

    // given a region and a country, return true if the country is in that region
    isCountryInRegion: function(regionName, countryName){
    
        if (!this.data){ throw new Error("set data first!"); }

        let region = this.data.children.find((el, i, array) => {
            return el.name === regionName;
        });

        if (!region) { return false; }

        let country = region.children.find((el, i, array) => {
            return el.name === countryName;
        });

        return country !== undefined;

    },

    // returns the country/region/world object
    getAreaData: function(selectedArea){
        
        if (!this.data){ throw new Error("set data first!"); }

        // World
        if (selectedArea === this.data.name){ return this.data; }

        for(let i in this.data.children){
            let region = this.data.children[i];

            if (region.name === selectedArea){ 
                return region; 
            }
            else if (region.children) {
                for(let j in region.children){
                    let country = region.children[j];

                    if (country.name === selectedArea){ 
                        return country; 
                    }
                }
            }
        }

        return undefined;

    },
    
    // shared function for getWorldData and getRegionCountries
    _countryMap: function(country){
        return {
            name: country.name,
            population: country.population,
            ranking: country.ranking
        };
    },

    // recursivly go through the world/region children to extract the country population data
    getWorldData: function(year){
        
        if (!this.data){ throw new Error("set data first!"); }

        return this.data.children.flatMap((region) => {
            return region.children
                .map(this._countryMap);
        })
        .sort((a, b) => {
            let key = String(year); 
            return b.population[key] - a.population[key];
        });
    },

    // returns the list of countries and thier population in a given region ordered by the population
    // in the given year
    getRegionCountries: function(regionName, year){

        if (!this.data){ throw new Error("set data first!"); }

        // if we need to load the world data
        if (regionName === this.data.name){ return this.getWorldData(year); }

        let region = this.data.children.find((el, i, array) => {
            return el.name === regionName;
        });

        if (!region || !region.children) { throw `Can't find region "${regionName}"!`; }

        // extract the data for this region
        return region.children
            .map(this._countryMap)
            .sort((a, b) => {
                let key = String(year); 
                return b.population[key] - a.population[key];
            });
    },


    getRegionForCountry: function(countryName){

        for(let region of this.data.children){
            if (this.isCountryInRegion(region.name, countryName)) {
                return region;
            }
        }
        
        throw new Error("Can't find region for " + countryName);    
    },

    // returns the parents of the selected area
    // eg. if a region is selected, country will be empty
    // {"world": {}, "region": {}, "country": {}};
    getSelectedAreas: function(selectedArea){

        let selected = this.getAreaData(selectedArea);

        if (!selected) { throw new Error(selectedArea + " not found!"); }

        // object to hold the data for each area
        let areas = {"world": {}, "region": {}, "country": {}}; 

        // the selected area is "World"
        if (selected.name === this.data.name){
           areas.world = selected;
        }

        // the selected area is region 
        else if (this.isRegion(selected.name)){
            areas.world = this.data;
            areas.region = selected;
        }

        // the selected area is a country
        // else if (this.isCountry(area.name)) { // slower, not needed?
        else {
            areas.world = this.data;
            areas.region = this.getRegionForCountry(selected.name);
            areas.country = selected;
        }

        return areas;

    },


    // return the relevant data for the gender focus charts
    getGenderFocusData: function(selectedArea){
        
        if (!this.data){ throw new Error("set data first!"); }

        let areas = this.getSelectedAreas(selectedArea);

        let panels = [
            { 
                "title" : "Fertility", 
                "key"   : "fertility", 
                "panels": [
                    {
                        "key"      : "rate",
                        "subTitle" : "Total Fertility Rate",
                        "range"    : {"min": 0, "max": 8},
                        "info"     : "The average number of children a woman would have assuming that current age-specific birth rates remain constant throughout her childbearing years (usually considered to be ages 15 to 49).",
                        "hasSignificantData" : null
                    },  
                    { 
                        "key"      : "contraception",
                        "subTitle" : "% Use of Modern Contraception",
                        "units"    : "%",
                        "range"    : {"min": 0, "max": 100},
                        "info"    : "The percentage of currently married or “in union” women of reproductive age who are currently using “modern” methods of contraception. “Modern” methods include clinic and supply methods such as the pill, IUD, condom, and sterilization.",
                        "hasSignificantData" : null
                    }
                ],
                "panelType": "double"
            },
            { 
                "title"     : "Education",
                "key"       : "education",
                "subTitle"  : "% Enrolled in Secondary School",
                "units"     : "%",
                "panelType" : "male-female",
                "range"     : {"min": 0, "max": 140},
                "info"      : "The ratio of the number of students enrolled in secondary school to the population in the age group that officially corresponds to secondary-level education (such as ages 12 to 17) for the country. This is the gross enrollment ratio (GER), which counts enrolled students regardless of age. The GER can exceed 100 percent due to the inclusion of over-aged and/or under-aged students because of early or late school entrance and grade repetition.  ",
                "hasSignificantData" : null
            },
            { 
                "title"     : "Employment",
                "key"       : "employment",
                "subTitle"  : "% Nonagricultural Wage Earners Who Are Women ",
                "units"     : "%",
                "panelType" : "single",
                "range"     : {"min": 0, "max": 60},
                "info"      : "Women’s share of paid employment in nonagricultural sectors (such as industry or services) as a percentage of total nonagricultural wage-earning employees. ",
                "hasSignificantData" : null
            },
            { 
                "title"            : "Government",
                "key"              : "government",
                "subTitle"         : "% Parliament Members Who Are Women",
                "units"            : "%",
                "panelType"        : "single",
                "range"            : {"min": 0, "max": 60},
                "info"             : "The percentage of seats in a country’s single chamber,  combined higher and lower chambers of the national parliament, or other national legislature held by women.",
                "hasSignificantData" : null
            },
            { 
                "title"     : "Health",
                "key"       : "health",
                "subTitle"  : "Life Expectancy at Birth (Years)",
                "panelType" : "male-female",
                "range"     : {"min": 40, "max": 100},
                "info"      : "The average number of years a newborn male or female infant can expect to live under current mortality levels. ",
                "hasSignificantData" : null
            }
        ];

        // only show the data for country, or region, or world (in that order)
        const significantAreaType = (function(a){
            if (Object.keys(a.country).length) { return "country"; }
            if (Object.keys(a.region).length)  { return "region"; }
            if (Object.keys(a.world).length)   { return "world"; }
        }(areas));


        // add the data to the panels in the appropriate format for the panel type
        panels = panels.map((p) => {


            switch (p.panelType){
                // normal charts
                case "single":
                    p.data = ["world", "region", "country"]
                        .map(function(wrc){
                            return {
                                "type": wrc,
                                "value": areas[wrc][p.key]
                            };
                        })
                        .filter((area) => (area.value !== null) && (area.value !== undefined)); // filter out undefined/null

                    // whether or not it contains data for the selectedArea
                    var significantData = p.data.find((p) => p.type === significantAreaType);
                    p.hasSignificantData = (typeof(significantData) !== "undefined");

                    break;

                // double charts
                case "double":

                    p.panels.map(function(sp){
                        sp.data = ["world", "region", "country"]
                            .map(function(wrc){
                                return {
                                    "type": wrc,
                                    "value": (areas[wrc][p.key]) ? areas[wrc][p.key][sp.key] : null
                                };
                            })
                            .filter((area) => (area.value !== null) && (area.value !== undefined)); // filter out undefined/null;

                        // whether or not it contains data for the selectedArea
                        var significantData = sp.data.find((p) => p.type === significantAreaType);
                        sp.hasSignificantData = (typeof(significantData) !== "undefined");
                    });

                    break;

                // male-female charts
                case "male-female":

                    p.data = {male: [], female: []};

                    ["male", "female"].forEach(function(mf){

                        p.data[mf] = ["world", "region", "country"]
                            .map(function(wrc){
                                return {
                                    "type": wrc,
                                    "value": (areas[wrc][p.key]) ? areas[wrc][p.key][mf] : null
                                };
                            })
                            .filter((area) => (area.value !== null) && (area.value !== undefined)); // filter out undefined/null

                    });

                    // whether or not it contains data for the selectedArea
                    p.hasSignificantData = ["male", "female"].some(function(mf){
                        var significantData = p.data[mf].find((p) => p.type === significantAreaType);
                        return (typeof(significantData) !== "undefined");
                    });

                    break;

            }
            
            return p;
        });

        return {
            areas: areas,
            panels: panels
        };
        
    }
};


// { 
//     "title": "government", 
//     "subTitle": "% parliament members who are women",
//     "data": [
//         { 
//             "type": "world",
//             "value": 123
//         },
//         { 
//             "type": "region",
//             "value": 456
//         },
//     ]
// },
// {
//     "title": "health",
//     "subTitle": "Life expectancy at birth (years)",
//     "data": {
//         "male": [
//             { "type": "world", "value": 123},
//             { "type": "region", "value": 456},
//         ],
//         "female": [
//             { "type": "world", "value": 345},
//             { "type": "region", "value": 234},
//         ]
//     }
// }




/**
 * polyfills
 */

// define flatMap
// map over elements (and return an array), then flatten the results.
(function(){
    if (Array.prototype.flatMap) { return; }

    let flatMap = function(fn) {
        let array = Object(this);
        
        let results = [];

        array.forEach(function(obj) {
            results.push(fn(obj)); 
        });
        // console.log(results);
        return results.flatten();
    };

    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, "flatMap", {
                value: flatMap, 
                configurable: true, 
                enumerable: false, 
                writable: true
            });
        } catch(e) {}
    }

    if (!Array.prototype.flatMap) {
        Array.prototype.flatMap = flatMap;
    }
}());

 
// define flatten, given an array of arrays, flatten it
// eg [[1, 2], [3, 4]]  => [1, 2, 3, 4]
(function(){
    if (Array.prototype.flatten) { return; }

    let flatten = function() {
        let array = Object(this);

        return array.reduce((a, b) => {
            return a.concat(b);
        });
    };

    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, "flatten", {
                value: flatten, 
                configurable: true, 
                enumerable: false, 
                writable: true
            });
        } catch(e) {}
    }

    if (!Array.prototype.flatten) {
        Array.prototype.flatten = flatten;
    }
}());



export default dataLoader;
