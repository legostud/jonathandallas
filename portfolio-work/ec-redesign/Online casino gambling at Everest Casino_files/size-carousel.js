// Dimensions given will be used as pixels

var SIZE_CAROUSEL = function() {
    this.initialize();
};

SIZE_CAROUSEL.prototype = {
    initialize: function() {
        this.number_objects = 1;
        this.interval;
        this.show_menu = true;
        
        this.animation = {
            control_time :1000, 
            repeat_time : 6000,
            start_time : 5000,
            resize_time : 4000
        };
        this.object_wrapper = {
            id : '#h-promos'
        };
        this.object = {
            id : '.promo-item',
            image : '.promo-image-banner',
            height : 530,
            label : 'banner',
            top : 200,
            width : 960
        };
        this.menu = {
            id: '#h-promos-menu',
            link : {
                id : '.promo-menu-link',
                current_label : 'current'
            }
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
                //Show the second object
                global.expandObject(1,global.animation.resize_time);
                //hide the first object
                global.shrinkObject(0,global.animation.resize_time);
                // [CONDITION] - if a menu is be shown
                if(global.show_menu) {
                    //update Menu
                    global.updateMenu();
                }
            },
            global.animation.repeat_time
        );
    },
    
    // [ACTION] - stop Carousel
    stopCarousel : function () {
        var global = this;
        //stop the carousel loop
        self.clearInterval(global.interval);
        //stop existing object animation
        global.cycleCarousel();
    },
    
    // [ACTION] - complete the animations on the carousel
    cycleCarousel : function () {    
        var global = this;
        
        // stop all animations
        $(global.object_wrapper.id + " " + global.object.id).stop(true,true);
    },
            
    // [ACTION] - expand a specific object
    expandObject : function ( index, delay ) {
        var global = this;
        var _identifier = global.object_wrapper.id + " " + global.object.id;

        //[CONDITION] - If we don't know what to expand, do nothing
        if (index === null ) { return false; }
        
        //[CONDITION] - use default delay time if one is not provided
        if(delay === null ){ delay = global.animation.resize_time; }
        
        $(_identifier).eq(index).animate({
            //Increase the height
            height: global.object.height,
            //Increase the width
            width: global.object.width,
            //move the object up
            top: 0,
            //move the object left
            left: 0
        },delay, function(){
            //animation complete
        });        
        
    },
    
    // [ACTION] - hide the first object
    shrinkObject : function (index, delay) {
        var global = this;
        var _identifier = global.object_wrapper.id + " " + global.object.id;
        
        //[CONDITION] - If we don't know what to expand, do nothing
        if (index === null ) { return false; }

        //[CONDITION] - use default delay time if one is not provided
        if(delay === null ){ delay = global.animation.resize_time; }
        
        //Animate the first object
        $(_identifier).eq(index).animate({
            //Reduce the height to zero
            height: 0,
            //Reduce the width to zero
            width: 0,
            //move the object down
            top: global.object.top        
        },delay, function(){
            //animation complete
            //move the object to the end of the queue   
            $(_identifier).last().after( $(_identifier).first() );
            //remove all css added by jQuery
            $(_identifier).last().removeAttr('style');
        });        
    
    },
    
    // [ACTION] - add Menu
    addMenu : function () {
        var global = this;
        //uniquely label each of the objects
        global.labelObjects();
        
        // create the Menu
        global.createMenu();
        
        // enable Menu
        global.activateMenu();

        //show Menu
        global.showMenu();
        
    },
    // [ACTION] - build the Menu
    createMenu : function () {
        var global = this;
        //get existing html code for individual button
        var _link_html = $(global.menu.id).html();

        //clear existing links from menu
        $(global.menu.id).empty();
        
        //build one button for each object
        for (var _count = 1; _count <= global.number_objects; _count++) {
            $(global.menu.id).append(_link_html);
            $(global.menu.link.id).last().attr('name',global.object.label+_count);
        }
        //Mark the first item as current
        $(global.menu.link.id).first().addClass(global.menu.link.current_label);
        
    },

    // [ACTION] add a unique class to each banner
    labelObjects : function() {
        var global = this;
        var _count = 0;
        var _identifier = global.object_wrapper.id + " " + global.object.id;
        
        $(_identifier).each(function() {
            _count++;
            $(this).addClass(global.object.label + _count);
            
        });
        
    },
    
    // [ACTION] - mark the control that matches the current object shown
    updateMenu : function () {
        var global = this;
        var _index;
        var _current_label = global.menu.link.current_label;
        var _links = $(global.menu.id + " " + global.menu.link.id);
        var _length = _links.length;

        //find the postion of the current menu item
        _index = $(global.menu.id + " ." + _current_label).index();

        //remove the "current_label" class
        $(global.menu.id + " ." + _current_label).removeClass(_current_label);

        //increment index to be the next menu item
        _index++;
        
        //[CONDITION] - is the index beyond the end of the menu (length starts at 1 not 0)
        if( _index == _length ){
            // true - mark the first item as current
            _index = 0;
        }
        _links.eq(_index).addClass(_current_label);
        
    },
    
    
    // [ACTION] - add click event to Menu
    activateMenu : function () {
        var global = this;
        //add click event to each menu icon
        $(global.menu.link.id).click( function() {
        
            // [CONDITION] - Did they ask to show the current object
            if( $(this).hasClass(global.menu.link.current_label) ){
                // request is done so do nothing
                return true;
            }
            //stop the carousel
            global.stopCarousel();
            
            //get the name value from the clicked menu icon
            var _name = $(this).attr('name');

            //find the index of the object that matches the name value above
            var _index = $(global.object.id + "." +_name).index();

            //hide all objects before the requested object
            for( i=0; i < _index; i++ ){
                global.shrinkObject(i, global.animation.control_time);
            }

            //Show the requested object
            global.expandObject(_index, global.animation.control_time);
    
            //unmark the menu icon that is marked current
            $(global.menu.link.id + "." + global.menu.link.current_label).removeClass(global.menu.link.current_label);

            //change the current menu icon to be the clicked one
            $(this).addClass(global.menu.link.current_label);
        });

        //restart the caruosel when the user leaves the menu
        $(global.menu.link.id).mouseout( function() {
            global.startCarousel();
        });
    },

    // [ACTION] - show Menu
    showMenu : function () {
        var global = this;
        
        //make the menu visible
        $(global.menu.id).show();

    },
    
    // start the carousel
    run : function () {
        var global = this;
        
        //wait for the DOM to be ready
        $(function(){
    
            // [CONDITION] - Only one object 
            if (global.getNumberObjects() < 2 ) {
                //exit the program
                return false;
            }
            
            // add the menu buttons
            if(global.show_menu){
                global.addMenu();
            }
            
            // Start the carousel after the "start" seconds
            window.setTimeout(  
                function() {  
                    global.startCarousel();  
                },  
                global.animation.start_time  
            );
        });    
    }
    
};

/* Add this code to your page or site JS file to start the carousel
//wait for the DOM to be ready
$(function(){
    // declare a new size carousel
    var size_carousel = new SIZE_CAROUSEL();
    //start the carousel
    size_carousel.run();
});
 */


