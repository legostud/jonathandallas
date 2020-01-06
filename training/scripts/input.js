jewel.input = ( function() {
    var dom = jewel.dom,
        $ = dom.$,
        settings = jewel.settings,
        inputHandlers;
        
    var keys = {
        37 : "KEY_LEFT",
        38 : "KEY_UP",
        39 : "KEY_RIGHT",
        40 : "KEY_DOWN",
        13 : "KEY_ENTER",
        32 : "KEY_SPACE",
        65 : "KEY_A",
        66 : "KEY_B",
        67 : "KEY_C",
        // alpha keys 68 - 87
        88 : "KEY_X",
        89 : "KEY_Y",
        90 : "KEY_Z"
    };
        
    function initialize() {
        inputHandlers = {};
        var board = $("#game-screen .game-board")[0];
        
        dom.bind(board, "mousedown", function(event) {
            handleClick(event, "CLICK", event);
        });

        dom.bind(board, "touchstart", function(event) {
            handleClick(event, "TOUCH", event.targetTouches[0]);
        });
        
        dom.bind(document, "keydown", function(event) {
            var keyName = keys[event.keyCode];
            if (keyName && settings.controls[keyName]) {
                event.preventDefault();
                trigger(settings.controls[keyName]);
            }
        });
    }
    
    function bind(action, handler) {
        // bind a handler function to a game action
        if(!inputHandlers[action]) {
            inputHandlers[action] = [];
        }
        inputHandlers[action].push(handler);
    }
    
    function handleClick(event, control, click) {
        // is any action bound to this input control?
        var action = settings.controls[control];
        if(!action) {
            return;
        }
        
        var board = $("#game-screen .game-board")[0],
            rect = board.getBoundingClientRect(),
            relX,
            relY,
            jewelX,
            jewelY;
            
        // click the position relative to the board
        relX = click.clientX - rect.left;
        relY = click.clientY - rect.top;
        // jewel coordinates
        jewelX = Math.floor(relX / rect.width * settings.cols);
        jewelY = Math.floor(relY / rect.width * settings.cols);
        // trigger functions bound to action
        trigger(action, jewelX, jewelY);
        //prevent the default click behavior
        event.preventDefault();
    }
    
    function trigger(action) {
        // trigger a game action
        var handlers = inputHandlers[action],
            args = Array.prototype.slice.call(arguments,1);
        
        if (handlers) {
            for (var i=0; i<handlers.length; i++) {
                handlers[i].apply(null, args);
            }
        }
    }
    
    return {
        initialize : initialize,
        bind : bind
    };
    
})();