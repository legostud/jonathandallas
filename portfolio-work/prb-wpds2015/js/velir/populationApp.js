(function($){

    nspace("prb.wpds2014").populationAppStart = function(){

        var viz2014, viz2050;
        var $dropdown = $('#region-dropdown');
        var $sortWrapper = $('#viz1-sort');

        var options = {
            sort: $('a.active', $sortWrapper).attr('data-type'),
            shadingExponent: 0.9,
            shadingLumRange: {
                low: 30,
                high: 45,
            }
        };

        viz2014 = prb.wpds2014.partitionDonutChart(d3.select("#viz2014 .viz"), $("#viz2014  .center-text"), options);

        viz2050 = prb.wpds2014.partitionDonutChart(d3.select("#viz2050 .viz"), $("#viz2050  .center-text"), options);

        viz2014.setRegionLabels($('#region-labels-2014').html());

        viz2050.setRegionLabels($('#region-labels-2050').html());

        $(viz2014).on('mouse:enter', function(e, name){
            viz2050.startHover(name);
        });

        $(viz2050).on('mouse:enter', function(e, name){
            viz2014.startHover(name);
        });

        $(viz2014).on('mouse:leave', function(e, name){
            viz2050.endHover(name);
        });

        $(viz2050).on('mouse:leave', function(e, name){
            viz2014.endHover(name);
        });

        $(viz2014).on('filter:in', function(e, name){
            $dropdown.val(name).trigger('chosen:updated');
            $('.viz1-back').show();
            viz2050.filterIn(name);
        });

        $(viz2050).on('filter:in', function(e, name){
            $dropdown.val(name).trigger('chosen:updated');
            $('.viz1-back').show();
            viz2014.filterIn(name);
        });

        $(viz2014).on('filter:out', function(e, name){
            $dropdown.val('none').trigger('chosen:updated');
            $('.viz1-back').hide();
            viz2050.filterOut(name);
        });

        $(viz2050).on('filter:out', function(e, name){
            $dropdown.val('none').trigger('chosen:updated');
            $('.viz1-back').hide();
            viz2014.filterOut(name);
        });

        $(viz2014).on('set:active', function(e, name){
            $dropdown.val(name).trigger('chosen:updated');
            viz2050.setActiveSegment(name);
        });

        $(viz2050).on('set:active', function(e, name){
            $dropdown.val(name).trigger('chosen:updated');
            viz2014.setActiveSegment(name);
        });

        $(viz2014).on('clear:active', function(e){
            $dropdown.val('none').trigger('chosen:updated');
            viz2050.clearActiveSegment();
        });

        $(viz2050).on('clear:active', function(e){
            $dropdown.val('none').trigger('chosen:updated');
            viz2014.clearActiveSegment();
        });

        $('.viz1-back').click(function(){
            viz2014.clickBack();
            viz2050.clickBack();
        });

        d3.json("data/population.json", function(error, root) {

            // Calculate the relative sizes of the rings
            var world2014Pop = root.population.mid2014;
            var world2050Pop = root.population.mid2050;
            var popRatio = world2014Pop/world2050Pop;

            // Using a 2014 ring size of 50, calculate the 2050 ring size
            var innerCircleRadius = 70;
            var ringWidth2014 = 35;
            var ringArea2014 = (Math.PI * Math.pow(ringWidth2014 + innerCircleRadius, 2)) - (Math.PI * Math.pow(innerCircleRadius, 2));


            var ringWidth2050 = Math.sqrt(((ringArea2014 * (1/popRatio)) + (Math.PI * Math.pow(innerCircleRadius, 2)))/Math.PI) - innerCircleRadius;

            viz2014.setData(_.cloneDeep(root), function(node){
                return node.population.mid2014;
            }, ringWidth2014, innerCircleRadius);

            viz2050.setData(_.cloneDeep(root), function(node){
                return node.population.mid2050;
            }, ringWidth2050, innerCircleRadius);

            // Init the region dropdown
            _.forEach(_.sortBy(root.children, function(c){ return c.name;}), function(region){
                $dropdown.append($('<option/>')
                    .attr('value', region.name)
                    .attr('class', 'region')
                    .html(region.name.toUpperCase()));

                _.forEach(_.sortBy(region.children, function(c){ return c.name;}), function(country){
                    $dropdown.append($('<option/>')
                        .attr('value', country.name)
                        .attr('data-parent', region.name)
                        .attr('class', 'country')
                        .html(country.name.toUpperCase())
                        );
                });
            });

            $dropdown
            .click(function(e){
                e.stopPropagation();
            })
            .change(function(e){
                e.stopPropagation();
                var val = $dropdown.val();
                var parent = $('option[value="' + val + '"]', $dropdown).attr('data-parent');

                viz2014.clearActiveSegment();
                viz2050.clearActiveSegment();

                if(val === 'none'){
                    if(viz2014.currentRoot.name !== 'World'){
                        viz2014.clickBack();
                    }
                    return;
                }

                if(viz2014.currentRoot.name !== 'World' && viz2014.currentRoot.name !== parent){
                    viz2014.clickBack();
                }

                viz2014.clickSegment(val);
            })
            .show()
            .chosen();

            // Hack to set the width of the box to be flexible, but the dropdown is max width
            var $chosen = $dropdown.next('.chosen-container');
            var calculatedWidth = $chosen.css('width');
            $chosen.attr('style', '');
            $('.chosen-drop', $chosen).css('width', calculatedWidth);

        });

        $('a', $sortWrapper).click(function(e){
            e.preventDefault();

            if($(this).hasClass('active')){
                return;
            }
            $(this).siblings('a').removeClass('active');
            $(this).addClass('active');
            viz2014.setSort($(this).attr('data-type'));
            viz2050.setSort($(this).attr('data-type'));
        });

    };
}(jQuery));