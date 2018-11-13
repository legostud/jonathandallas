	/***************************************
	*
	* Zoom Slider
	* Create new object: var zoom_slider = new zoomSlider();
	* Set variables or leave as default
	* Optional Variables 
	* - zoom_slider.object_class => class name on div wrapping all of the elements for the slider
	* - zoom_slider.left_control => class name of left control
	* - zoom_slider.right_control => class name of the right control
	* - zoom_slider.transition => amount of time when changing items
	* - zoom_slider.name => class of the item to show the person's name
	* - zoom_slider.title => class of the item to show the person's title
	* Initialize the Slider => zoom_slider.init();
	*
	* **************************************/
		
	function zoomSlider() {
		this.left_control = "left";
		this.name_class = "name";
		this.object_class = "zoom-slider";
		this.right_control = "right";
		this.title_class = "title";
		this.transition = 1000;

		// hidden variables
		var count,
			padding_top,
			width_large,
			width_small,
			middle_index,
			parent = this,
			isTouch = document.createTouch !== undefined || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints,
			set_timeout;

		// Add functionality to the left and right control arrows
		this.activateControls = function(){
			$('.' + this.object_class + ' .' + this.left_control).click(function(e){
				parent.showPrevious(parent.transition);
			});
			$('.' + this.object_class + ' .' + this.right_control).click(function(e){
				parent.showNext(parent.transition);
			});
		}

		this.activateImages = function(){
			var i;
			// clicking an item should make that item the active one
			$('.' + this.object_class + ' ul').on('click','.in-active',function(e){
				parent.finishAnimations();
				// show the items that was click (index)
				parent.showItem( $(this).index() );
			});

			// the user has a touch screen
			if(isTouch){
				// activate swiping gestures
				parent.gesture()
			}
		}

		// Center the items in the carousel so one image is always centered
		this.centerImages = function(){
			// if the number of items is even
			if( count%2 == 0){
				// mark the carousel as even so CSS can add right padding
				$('.' + this.object_class + ' ul').addClass('even');
			}
		}

		this.finishAnimations = function(){
			// wrap up all animations
			$('.' + this.object_class + ' ul > li').stop(true,true);
		}

		this.gesture = function(){
			// the user has a touch screen
			if ( isTouch ){
				var $this = this,
					distance = null,
					swipMinDistance = 10,
					startCoords = {}, 
					endCoords = {};
				
				// record the slide action
				// if the user touches the carousel
				$('.' + this.object_class).bind('touchstart', function(e){
					// prevent default behavior
					e.preventDefault();
					e.stopPropagation();
					// tag the carousel as being touched
					$(this).addClass('touching');
					// store the touch location cordinates
	  				endCoords = e.originalEvent.targetTouches[0];
	    			startCoords.pageX = e.originalEvent.targetTouches[0].pageX;

	    			// if the user slides his finger
					$('.touching').bind('touchmove',function(e){
						// prevent default behavior
						e.preventDefault();
						e.stopPropagation();
	    				// update touch location to the new location
	    				endCoords = e.originalEvent.targetTouches[0];
					});
           		});
           		// process the slide action
           		// if the user untouches the carousel
				$('.' + this.object_class).bind('touchend',function(e){
           			// prevent default behavior
					e.preventDefault();
					e.stopPropagation();

					// how far did the user slide
   					distance = endCoords.pageX - startCoords.pageX;

   					// if the distance is great enough
       				if( distance >= swipMinDistance ){
       					// swipeLeft
       					parent.showPrevious();
       				}
       				else if( distance <= - swipMinDistance ){
       					// swipeRight
       					parent.showNext();
       				}	
       				// stop listening for movement
       				$('.touching').off('touchmove').removeClass('touching');

				});

       		}
       	}

		this.markImages = function(){
			// find the index of the middle image
			middle_index = Math.floor(count/2);
			// Tag all image containers as in-active
			$('.' + this.object_class + ' ul > li')
				.addClass('in-active')
				// Tag the active image container
				.eq(middle_index).addClass('active')
				// remove the in-active container from active image
				.removeClass('in-active');
		}

		this.showNext = function(transition_time){
			if(transition_time == null){
				transition_time = parent.transition_time;
			}

			// wrap up all animations
			parent.finishAnimations();

			// copy the first item to after the last item
			$('.' + this.object_class + ' ul')
				.append('<li class="in-active" style="opacity:0;margin-right:-'
					+ width_small
					+ 'px">' 
					+ $('.' 
					+ this.object_class 
					+ ' ul > li:first-child').html() 
					+ '</li>');
			$('.' + this.object_class + ' ul li:last-child')
				.animate({marginRight:0,opacity:1},transition_time,function(){
					$(this).removeAttr("style");
				});
			// remove the first item
			$('.' + this.object_class + ' ul > li:first-child')
				.animate({marginLeft:"-"+width_small,opacity:0},transition_time,function(){
					$(this).remove();
				})
			
			// find the active item
			var $active = $('.' + this.object_class + ' .active');
				// mark the active item from active to in-active
				$active.animate({width:width_small,paddingTop:padding_top},transition_time,function(){
					// mark the item to the right as active
					$(this).addClass('in-active').removeClass("active");
					// remove the inline width style
					$(this).removeAttr("style");
				});
			// find the item to the right of the active item
			$active.next()
				// animate the width of the item to the right equal the active item
				.animate({width:width_large,paddingTop:0},transition_time,function(){
					// mark the item to the right as active
					$(this).addClass('active').removeClass("in-active");
					// remove the inline width style
					$(this).removeAttr("style");
					//update the text description
					parent.updateText();
				});

		}

		this.showPrevious = function(transition_time){
			if(transition_time == null){
				transition_time = parent.transition_time;
			}

			// wrap up all animations
			parent.finishAnimations();

			// copy the first item to after the last item
			$('.' + this.object_class + ' ul')
				.prepend('<li class="in-active" style="opacity:0;margin-left:-'
					+ width_small
					+ 'px">' 
					+ $('.' + this.object_class + ' ul > li:last-child').html() 
					+ '</li>');
			$('.' + this.object_class + ' ul li:first-child')
				.animate({marginLeft:0,opacity:1},transition_time,function(){
					$(this).removeAttr("style");
				});
			// remove the first item
			$('.' + this.object_class + ' ul > li:last-child')
				.animate({marginRight:"-"+width_small,opacity:0},transition_time,function(){
					$(this).remove();
				})
			

			// find the active item
			var $active = $('.' + this.object_class + ' .active');
				// mark the active item from active to in-active
				$active.animate({width:width_small,paddingTop:padding_top},transition_time,function(){
					// mark the item to the right as active
					$(this).addClass('in-active').removeClass("active");
					// remove the inline width style
					$(this).removeAttr("style");
				});
			// find the item to the right of the active item
			$active.prev()
				// animate the width of the item to the right equal the active item
				.animate({width:width_large,paddingTop:0},transition_time,function(){
					// mark the item to the right as active
					$(this).addClass('active').removeClass("in-active");
					// remove the inline width style
					$(this).removeAttr("style");
					//update the text description
					parent.updateText();
				});

		}

		this.showItem = function(item_index){
			// stop any previous actions
			clearTimeout(set_timeout);
			// adjust the transition time based on how for away the item is
			var transition_time = this.transition / Math.abs(item_index - middle_index);
			// if the item_index is the same as the middle_index
			if( item_index == middle_index){
				// do nothing
				return false;
			} else if(item_index > middle_index){
				// If this item to show is to the right of the active item 
				parent.showNext(transition_time);
				item_index--;
			} else {
				// otherwise the item is to the left of the active item
				parent.showPrevious(transition_time);
				item_index++;
			}
			set_timeout = setTimeout(function(){
				parent.showItem(item_index)
			},transition_time);
		}

		this.updateText = function(){
			var name = $('.' + this.object_class + ' .active img').attr("data-name");
			var title = $('.' + this.object_class + ' .active img').attr("data-title");
			$('.' + this.object_class + ' .' + this.name_class).html(name);
			$('.' + this.object_class + ' .' + this.title_class).html(title);
		}

		this.init = function(){
			// do nothing if there is only one item
			count = $('.' + this.object_class + ' ul').children().length;
			if(count < 2) {
				return false;
			}

			// center the images in the slider
			this.centerImages();
			// mark the active and in-active images
			this.markImages();
			// Update the text being displayed
			this.updateText();
			// record the width of the inactive item
			width_small = $('.' + this.object_class + ' .in-active').width();
			// record the width of the inactive item
			width_large = $('.' + this.object_class + ' .active').width();
			// record the difference
			padding_top = width_large - width_small;
			// Activate the controls
			this.activateControls();
			// Avtivate image click event
			this.activateImages();
		}
	}
