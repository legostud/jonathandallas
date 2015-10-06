(function($){
        
    nspace("prb.wpds2014").usWhatIfAppStart = function(){

        $('.hover-tip').tooltip();

        var whatIfViz = prb.wpds2014.usWhatIf(d3.select(".viz2-wrapper .viz"));

        $('.step .button').click(function(){
            
            // Toggle others in the group if this is a single selection only
            if($(this).data('type') === "single"){
                $(this).closest('.step').find('.button').removeClass('active');
            }
            $(this).toggleClass('active');

            // If this is a step 1 change, deselect all step2/3
            if($(this).closest('.step').hasClass('step1')){
                $('.step2 .button, .step3 .button').removeClass('active');
                $('.step3 .fadable').fadeOut();
            }

            var indicator = $('.step1 .button.active').data('indicator');
            var rateScenarios = $('.step2 .button.active').map(function(){ return $(this).data('rate');});
            var immigrationScenarios = $('.step3 .button.active').map(function(){ return $(this).data('immigration');});

            // Always include these by default
            immigrationScenarios.push('constant-middle');
            immigrationScenarios.push('noInequality-middle');

            whatIfViz.updateSelections(indicator, rateScenarios, immigrationScenarios);
        });

        $('.step1 .button').click(function(){
            if($('.step2:visible').length === 0){
                $('.step2').fadeIn();
            }
        });

        $('.step2 .button').click(function(){
            var button = this;
            // Defer to the top handler first, to make sure the "active" class is set
            setTimeout(function(){
                if($('.step3:visible').length === 0){
                    $('.step3').show();
                }

                if($(button).hasClass('active')){
                    $('.step3 .rate-group[data-rate="' + $(button).data('rate') + '"] .fadable').fadeIn();
                }
                else{
                    $('.step3 .rate-group[data-rate="' + $(button).data('rate') + '"] .fadable')
                    .fadeOut()
                    .find('.button')
                    .removeClass('active');
                }
            },1);

        });

		var dataLocation = data/whatif.json;
		
        d3.json("data/whatif.json", function(error, data) {
            
            whatIfViz.data = data;

        });
    };
}(jQuery));