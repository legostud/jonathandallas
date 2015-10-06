(function($){
        
    nspace("prb.wpds2014").flipperAppStart = function(){
        var locations;
        var regionSelector = $('#flipper-region-selector');
        var locationSelector = $('#flipper-location-selector');
        
        regionSelector.change(function(){updateLocations(locations);});
        
        var regionSelectBox = regionSelector.selectBoxIt();
        var locationSelectBox = locationSelector.selectBoxIt();
        
        $.getJSON( "data/population-flipper.json", function(data) {
            locations = data;
            populateGroups(locations);
        });
        
        locationSelector.change(function() {flipFlippers();});
        
        var flipFlippers = function(){
            var selectedRegion = regionSelector.find('option:selected').val();
            var selectedLocation = locationSelector.find('option:selected').val();
            var frontIsVisible = $('#flippers .front').is(':visible');
            var locationObj = selectedLocation === 'All' ? 
                locations[selectedRegion] : 
                locations[selectedRegion].children[selectedLocation];
                                
            var activeFlippers = frontIsVisible ? 
                'div.back' : 
                'div.front';

            var inactiveFlippers = frontIsVisible ? 
                'div.front' : 
                'div.back';                    
            
            $('#fertility-counter .flip1970 ' + activeFlippers + ' .numbers')
					.text(locationObj.fertility.year1970);
            $('#fertility-counter .flip2014 ' + activeFlippers + ' .numbers')
					.text(locationObj.fertility.year2014);
            $('#mortality-counter .flip1970 ' + activeFlippers + ' .numbers')
					.text(locationObj.mortality.year1970);
            $('#mortality-counter .flip2014 ' + activeFlippers + ' .numbers')
					.text(locationObj.mortality.year2014);
            $('#life-counter .flip1970 ' + activeFlippers + ' .numbers')
					.text(locationObj.expectancy.year1970);
            $('#life-counter .flip2014 ' + activeFlippers + ' .numbers')
					.text(locationObj.expectancy.year2014);
            
            chainFlip(['#fertility-counter .flip1970',
                '#fertility-counter .flip2014 ',
                '#mortality-counter .flip1970 ',
                '#mortality-counter .flip2014 ',
                '#life-counter .flip1970 ',
                '#life-counter .flip2014 '], 0, activeFlippers, inactiveFlippers);

        };
        
        var populateGroups = function(locations){
            regionSelector.empty();
            
            var groupOptions = [];
                                
            $.each(locations, function(key, value){
                groupOptions.push('<option value="' + key + '">'+ key + '</option>');
            });
            
            $(groupOptions.join("")).appendTo(regionSelector);
            
            regionSelector.data("selectBox-selectBoxIt").refresh();
            updateLocations(locations);
        };
        
        var updateLocations = function(locations) {
            locationSelector.empty();
            
            var selectedRegion = regionSelector.find('option:selected').val();
            
            var locationOptions = ["<option>All</option>"];
            $.each(locations[selectedRegion].children, function(key, value){
                locationOptions.push('<option value="' + key + '">' + key + '</option>');
            });
            
            $(locationOptions.join("")).appendTo(locationSelector);
            locationSelectBox.data("selectBox-selectBoxIt").refresh();
            flipFlippers();
        };
        
        var chainFlip = function(toAnimate, ix, active, inactive){
            
            if(toAnimate[ix]){
                $(toAnimate[ix] + ' ' + active)
                    .zIndex(10)
                    .slideDown(110, "easeInOutSine", function(){
                    $(toAnimate[ix] + ' ' + inactive)
                        .zIndex(0)
                        .hide();
                    $(this).zIndex(5);
                    chainFlip(toAnimate, ix + 1, active, inactive);
                });
            }
        };
        
        var toImages = function(numberStr){
            var html = '';
            for(var i = 0; i < numberStr.length; i++){
                var thisChar = numberStr[i];
                
                if(thisChar == '.'){
                    html += '<img src="img/_.png" /> ';
                }
                else if(!isNaN(parseInt(thisChar, 10))){
                    html += '<img src="img/' + parseInt(thisChar, 10) + '.png" /> ';
                }
            }
            return html;
        };
        
    };
	 
}(jQuery));