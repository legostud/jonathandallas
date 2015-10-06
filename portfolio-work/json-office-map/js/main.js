var name_source = '<ul>{{#data}}<li data-index="{{@index}}">{{name}}</li>{{/data}}</ul>',
	name_template = Handlebars.compile(name_source),
	overlay_template,
	room_data = {},
	employee_data = {},
	location_data = [];

var room_source = '<ul>'
	+ '<li><b>{{name}}</b></li>'
	+ '<li>{{phone}}</li>'
	+ '</ul>';
var employee_source = '<ul>'
	+ '<li><b>{{name}}</b></li>'
	+ '<li>{{title}}</li>'
	+ '<li>{{phone}}</li>'
	+ '<li>{{email}}</li>'
	+ '</ul>';

$.getJSON('./json/rooms.json', function(data) {
	room_data = { data: data };
	$(".rooms").append(name_template(room_data)).fadeIn();
});


$.getJSON('./json/employees.json', function(data) {
	employee_data = { data: data };
	$(".employees").append(name_template(employee_data)).fadeIn();
});

$.getJSON('./json/locations.json', function(data) {
	$.each(data, function(){
		location_data[this.seat_num] = {x:this.x_cord, y:this.y_cord, floor:this.floor};
	});
});

// if the user clicks a name
$('nav').on('click','li', function(){
	// get the index value from the name
	var index = $(this).attr('data-index');
	// determine if it was an employee or a room name
	var type = $(this).parents('section').attr('class');		
	var data_clicked = {};
	if(type == "rooms"){
		// get the user data for that index
		data_clicked = room_data.data[index];
		// build the template for the overlay
		overlay_template = Handlebars.compile(room_source);

	} else {
		// get the user data for that index
		data_clicked = employee_data.data[index];
		// build the template for the overlay
		overlay_template = Handlebars.compile(employee_source);
	}
	try{
		// populate the overlay with room or employee data
		$(".overlay .data").html(overlay_template(data_clicked));
		// position the overlay at that seat number
		$('.overlay').css('left',location_data[data_clicked.seat_num].x + 'px');
		$('.overlay').css('top',location_data[data_clicked.seat_num].y + 'px');

		// show the correct map
		if(location_data[data_clicked.seat_num].floor == 1){
			$('.map').addClass('floor1').removeClass('floor4');
		} else {
			$('.map').addClass('floor4').removeClass('floor1');
		}
	} catch(e){
		$('.overlay').css('left','10px').css('top','20px');
	}
	// show the overlay
	$(".overlay").fadeIn();
	// focus the page on the overlay
	window.scrollTo(location_data[data_clicked.seat_num].x-100,location_data[data_clicked.seat_num].y)

});
// if the user clicks the map
$('.map').click(function(e){
	// hide the overlay
	$(".overlay").hide();
	// show the clicked cordinates related to the map
	if(console){
		var x = $(".map").offset().left;
		var y = $(".map").offset().top;
		var floor; 
		if($(".map").hasClass('floor4') ) { floor = 4 } else { floor = 1 }
		console.log(',{\n"seat_num":,\n'
			+ '"floor":' + floor + ',\n'
			+ '"x_cord":' + parseInt(e.pageX-x) +',\n'
			+ '"y_cord":' + parseInt(e.pageY-y ) + '\n}\n'
		);
	}
});
