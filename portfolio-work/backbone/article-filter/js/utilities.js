;(function(window, document, $, undefined) {
    'use strict';

    // default namespace
    var v_bayer = (function(v_bayer) {

        v_bayer.Utilites = (function(){
            
            function require_template(templateName) {
                var template = $('#template_' + templateName);
                if (template.length === 0) {
                    var tmpl_dir = './templates';
                    var tmpl_url = tmpl_dir + '/' + templateName + '.tmpl';
                    var tmpl_string = '';
                    $.ajax({
                        url: tmpl_url,
                        method: 'GET',
                        async: false,
                        contentType: 'text',
                        success: function (data) {
                            tmpl_string = data;

                            $('head').append('<script id="template_' + 
                            templateName + '" type="text/template">' + tmpl_string + '<\/script>');
                        },
                        error: function(msg){
                            try{
                                console.log(msg)
                            }catch(err){}
                        }
                    });
                }
            }

            return { require_template : require_template };
        
        })();
        
        return v_bayer;

    }(window.v_bayer || {}));
    
    //update the Global Custom name space with new functionality and variables
    window.v_bayer = v_bayer;

}(window, document, jQuery));