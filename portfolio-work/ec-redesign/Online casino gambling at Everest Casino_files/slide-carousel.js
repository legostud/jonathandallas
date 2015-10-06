// Dimensions given will be used as pixels

var SLIDE_CAROUSEL = function() {
    this.initialize();
};

SLIDE_CAROUSEL.prototype = {
    initialize: function() {
        this.number_objects = 1;
        this.interval;
        
        this.animation = {
            start : 5000,
            repeat : 6000,
            slide : 2000,
            click : 1000,
            control :2000 
        };
        this.carousel_wrapper = {
            id : '#carousel-promotions'
        },
        this.object = {
            id : '.promo-item',
            width : 500,
        };
        this.object_wrapper = {
            id : '#carousel-promotions-slider',
            width : '',
            left : 0
        };
        this.left_control = {
            id: '.left-action'
        };
        this.right_control = {
            id : '.right-action'
        };
    },
    //record the number of objects
    setNumberObjects : function () {
        var global = this;
        var _identifier = global.object_wrapper.id + " " + global.object.id;
        global.number_objects = $(_identifier).length;
    },
    //Find the number of objects    
    getNumberObjects : function () {
        var global = this;
        this.setNumberObjects();
        return global.number_objects;
    },
    
    // [ACTION] - start Carousel
    startCarousel : function () {
        var global = this;
        
        //stop carousel if it is already running
        global.stopCarousel();
        
        // keep showing the next object
        global.interval = self.setInterval(
            function() {
                global.slideLeft(global.animation.slide);
            },
            global.animation.repeat
        );
    },
    
    // [ACTION] - stop Carousel
    stopCarousel : function () {
        var global = this;
        self.clearInterval(global.interval);
    },
    
    // [ACTION] - complete the animations on the carousel
    cycleCarousel : function () {    
        var global = this;
        
        // stop all animations
        $(global.object_wrapper.id).stop(true,true);
    },
            
    // [ACTION] - show the last object
    slideRight : function (delay) {
        var global = this;
        var _identifier = global.object_wrapper.id + " " + global.object.id;
        var _offset = "-" + global.object.width + 'px';
        
        //stop existing object animation
        global.cycleCarousel();
        
        // move the last object before the first object
        $(_identifier).first().before( $(_identifier).last() );
        
        // offset the slider left position by one object
        $(global.object_wrapper.id).css('left',_offset);
        
        // moderately increase the left position of the slider by the width of one object
        $(global.object_wrapper.id).animate({left:0},delay);
    },
    
    // [ACTION] - show the next object
    slideLeft : function (delay) {
        var global = this;
        var _identifier = global.object_wrapper.id + " " + global.object.id;
        var _offset = '-' + global.object.width + 'px';
        
        //stop existing object animation
        global.cycleCarousel();
    
        // slowly decrease left position of slider by the width of one object
        $(global.object_wrapper.id).animate({left:_offset},delay,function(){
            //After animation completes
            
            // move first object after the last object
            $(_identifier).last().after( $(_identifier).first() );
        
            // change left position of the slider back to where it was
            $(global.object_wrapper.id).css('left',0);
        });    
    },
    
    // [ACTION] - add controls
    addControls : function () {
        var global = this;
        // enable controls
        global.activateControls();

        // show controls
        global.showControls();
        
    },
    
    // [ACTION] - add click event to controls
    activateControls : function () {
        var global = this;
        var _left_control,_right_control;

        _left_control = global.carousel_wrapper.id + " " + global.left_control.id;
        // add click event to left control to slide right
        $(_left_control).click(function(){
            //stop the carousel animation
            global.stopCarousel();
            
            //show the previous object
            global.slideRight(global.animation.click);
        });
        //restart the carousel when the user moves off of the control
        $(_left_control).mouseout( function() {
            global.startCarousel();
        });
        
        // add click event to right control to slide left
        _right_control = global.carousel_wrapper.id + " " + global.right_control.id;
        $(_right_control).click(function(){
            //stop the carousel animation
            global.stopCarousel();

            //show the next object
            global.slideLeft(global.animation.click);            
        });
        //restart the carousel when the user moves off of the control
        $(_right_control).mouseout( function() {
            global.startCarousel();
        });
    },

    // [ACTION] - show controls
    showControls : function () {
        var global = this;
        var _identifier;
                
        // moderately increase the left position of the left control
        _identifier = global.carousel_wrapper.id + " " + global.left_control.id;
        $(_identifier).animate( {left: 0} , global.animation.control);
        
        // moderately increase the right position of the right control
        _identifier = global.carousel_wrapper.id + " " + global.right_control.id;
        $(_identifier).animate( {right: 0} , global.animation.control);
    },
    
    // start the carousel
    run : function () {
        var global = this;

        //Wait for the DOM to be ready
        $(function(){
            
            // [CONDITION] - Only one object 
            if (global.getNumberObjects() < 2 ) {
                //exit the program
                return false;
            }
        
            // add left and right control arrows
            global.addControls();
            
            // Start the carousel after the "start" seconds
            window.setTimeout(  
                function() {  
                    global.startCarousel();  
                },  
                global.animation.start  
            );    
        });
    }
    
};

/* Add this code to your page or site JS file to start the carousel
// declare a new slide carousel
var slider = new SLIDE_CAROUSEL();
//wait for the DOM to be ready
$(function(){
    //start the carousel
    slider.run();
});
 */


