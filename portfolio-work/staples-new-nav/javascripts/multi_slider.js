// JAVASCRIPT for MULTI FRAME SLIDER

// FUNCTION: SLIDE ON TIMEOUT					
function slide(){
			
	// check if they have interacted with the buttons
		if (firstclick == false ) {
			// if yes, rearrange the divs
			var howmany = thepage;
			for (var x = 0; x < howmany; x++) {
				$('#z_slider :first').clone().appendTo($('#z_slider'));
				$('#z_slider :first').remove();
			}
			firstclick = true;
			$('#z_slider').css('left', 0);
				
			
		}
	
	clearTimeout($('#z_slider').data('opts').timeout);	
	
	$('#z_slider').data('opts').timeout = setTimeout(function() {			
		
		$('#z_slider').animate({
			left: '-=' + $('#z_slider').data('opts').frameWidth
			}, $('#z_slider').data('opts').speed, 'swing', function(){						
				
				$('#z_slider :first').clone().appendTo($('#z_slider'));
				$('#z_slider :first').remove();
				$('#z_slider').css('left', 0);		
						
			});	
			
			
			// Increment thepage to keep track of what div we are on
			thepage++;
			
			// Check what div we are on, if we are on last page, reset thepage counter to 0
			if(thepage == $('#z_slider').children('div').length){
				thepage = 0;
			}
			
			$('#z_nav li').removeClass('active');
			$('#z_nav li').eq(thepage).addClass('active');
						
			slide();			
		}, $('#z_slider').data('opts').interval);
		
}

// FUNCTION: SLIDE ON BUTTON CLICK
function slide_button(page){

	// clear the timeout so it stops sliding automatically
	clearTimeout($('#z_slider').data('opts').timeout);	
	
	// change Pause button to Play
	$('#z_playpause').addClass('z_play');	
	$('#z_playpause').removeClass('z_pause');
			
	// check if they have interacted with the nav yet, if not, rearrange the divs to allow for sliding back and forth
	if ( firstclick == true){
		
		if ( thepage != 0 ){
			var howmany = ($('#z_slider').children('div').length) - thepage;
			for (var x = 0; x < howmany; x++) {
				$('#z_slider :first').clone().appendTo($('#z_slider'));
				$('#z_slider :first').remove();
			}
			
			$('#z_slider').css('left', -($('#z_slider').data('opts').frameWidth * thepage));
			
		}
								
		// set firstclick to false so the above doesn't happen again
		firstclick = false;			
	}
	
	thepage = page;
				
	// animate to the selected div
	$('#z_slider').animate({
		left:  -($('#z_slider').data('opts').frameWidth * page)}, $('#z_slider').data('opts').speed, 'swing');						
}


// DOCUMENT READY
function z_init_multi(){
	// add data to slider object
	 $('#z_slider').data('opts', {
		timeout: null,
		interval: 5000,
		speed: 400,
		frame: 1,
		frameWidth: $('#z_slider div img:first').attr('width')	
	});
	
	// number of slider children 
	var numkids = $('#z_slider').children().length;
	
	// calculate and set width of z_slider (number of children x frame width)
	$('#z_slider').css('width', numkids * $('#z_slider').data('opts').frameWidth);
					
	// create navigation li's and spans
	for (var x = 0; x < numkids; x++){
		var newLi = document.createElement('li');
		var newSpan = document.createElement('span');
		$(newLi).append(newSpan);
		$('.z_pagination').append(newLi);
	}
	
	// add listener to slider navigation LI's
	$('#z_nav li').click(function(){
		page = $('#z_nav li').index(this);
		slide_button(page);
		$('#z_nav li').removeClass('active');
		$(this).addClass('active');
	});
	
	// add listener to PLAY PAUSE button
	$('#z_playpause').click(function(){
		if ( $('#z_playpause').attr('class') == 'z_play'){
			$('#z_playpause').addClass('z_pause');	
			$('#z_playpause').removeClass('z_play');
			slide();
		}
		
		else{
			clearTimeout($('#z_slider').data('opts').timeout);
		$('#z_playpause').addClass('z_play');
		$('#z_playpause').removeClass('z_pause');
		}
		
	});	
		
	// set THEPAGE, this keeps track of which DIV we are on, add active class to current page
	thepage = 0;
	$('#z_nav li').eq(thepage).addClass('active');
	
	// Set FIRSTCLICK - this lets us know if they have interacted with the navigation yet
 	firstclick = true;
	
	// start sliding
	slide();
}