var currentfloor = 4;
$(function(){
	getOffices("name");
	//hide results
	$('#result-wrapper').click( function() { $(this).hide(); });
	//Temporary to find locations of all offices
	$('#map').click(function(e){
		var x = $("#map").offset().left;
		var y = $("#map").offset().top;
		$('#mouse').html(e.pageX-x +', '+ (e.pageY-y ));
	});
	$(".sortby-name").click(function(){
		clearOffices();
		getOffices("name");
		$(this).hide();
		$(".sortby-location").show();
	});
	$(".sortby-location").click(function(){
		clearOffices();
		getOffices("office");
		$(this).hide();
		$(".sortby-name").show();
	});
});
function clearOffices() {
	$("#conferences").html('');
	$("#employees").html('');
	$("#other").html('');
}
function sortName(a,b){  
	return a.name > b.name ? 1 : -1;  
}; 
function sortOffice(a,b){  
	return a.office > b.office ? 1 : -1;  
};   
function getOffices(sortby) {
	var sorted;
	//Get the JSON string and pass it to the cb function
	$.getJSON("office.php", function(data){
		if (sortby == "name"){
			sorted = $(data).sort(sortName);
		}
		if (sortby == "office"){
			sorted = $(data).sort(sortOffice);
		}
		$.each(sorted, function(i,item){
			var code = '<p id="'+item.office+'" class="name">'+item.name+'</p>';
			if(item.category == "employee") {
				$(code).appendTo("#employees");
			}
			else if (item.category == "conference") {
				$(code).appendTo("#conferences");
			}
			else {
				$(code).appendTo("#other");
			}
		});
		showResults();
	});		
}
function getOffice(office) {
	//Get the JSON string and pass it to the cb function
	if(office.charAt(0)==3 && office.charAt(0)!=currentfloor) { 
		$('#map').css("background-position","left -604px");
		$('#map-name .floor3').show();
		$('#map-name .floor4').hide();
		currentfloor = 3;
	}
	if(office.charAt(0)==4 && office.charAt(0)!=currentfloor) { 
		$('#map').css("background-position","left top");
		$('#map-name .floor3').hide();
		$('#map-name .floor4').show();
		currentfloor = 4;
	}
	
	$.getJSON("office.php?office="+office, function(item){
		if(item.category == "employee") {
			$('#result').html('<span class="name">'+item.name+'</span><br />'+item.title+'<br />'+item.email+'<br />'+item.phone+'<br />Office#'+item.office);
		}
		else if (item.category == "conference") {
			$('#result').html('<span class="name">'+item.name+'</span><br />'+item.phone+'<br />Room#'+item.office);
		}
		else {
			$('#result').html('<span class="name">'+item.name+'</span>');
		}
		x = 0;
		y = 0;
		if (item.x && item.y) {
			x = item.x-10 + 'px';
			y = item.y-20 + 'px';
		}
		$('#result-wrapper').css({'top':y,'left':x}).show();
	});	
}
function showResults () {
	$('#offices p').click(function() {
		var office = $(this).attr("id");
		getOffice(office);
	});
}
function update() {
	//implements the JSON.org parser
	mySerializedOffice = JSON.stringify(myOffice);
	$.post("office.php",{office_number: 1234, obj: mySerializedOffice});
}

	
