jewel.storage = (function() {
    var db = window.localStorage;
    
    function get(key) {
        var value = db.getItem(key);
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return;
        }
    }
    
    function set(key, value) {
        value = JSON.stringify(value);
        db.setItem(key,value);
    }
    
    return {
        get : get,
        set : set
    };

})();