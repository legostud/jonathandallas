;(function(window, document, $, undefined) {
	'use strict';

	// default namespace
	var v_bayer = (function(v_bayer) {

		v_bayer.ArticleFilter = {

			Model : Backbone.Model.extend({
			    url: './json/filter-articles.json',
			    defaults:{
			    	per_page:10,
			    	recent_date_offset:10,
			    	filter_data:[],
			    	current_page:1,
			    	submit_button:"View Results",
			    	reset_button:"Clear Selections"
			    },
   				fetchWithData: function(){
					this.fetch({
						data: {"args":{"selected":this.get('filter_data'),"page":this.get('current_page'),"num_results":String(this.get('per_page'))}},
						type:'GET'
					});	
				}
			}),

			FilterView : Backbone.View.extend({
				el: '#filter_container',

				filter_values: "",
				filter_class: ".filter-group",

				events: {
					//'change .filter-group':'filterResults',
					'click .update_results':'filterResults',
					'click .reset_results':'resetResults'
				},

				initialize: function(){
					//this.num_results = this.model.get("per_page").toString(),

			     	this.listenTo(this.model, 'change', this.render);

					v_bayer.Utilites.require_template('article-filters');

					this.template = _.template( $('#template_article-filters').html() );
				},

				filterResults: function(event){
					var array = [];
					// get get status of each filter
					this.$el.find(this.filter_class).each(function(){
						array.push(String($(this).val()));
					});
					this.model.set('filter_data',array);
					// request new data from server
					this.model.fetchWithData();
				},
				resetResults: function(){
					this.model.set('filter_data',[]);
					this.model.fetchWithData();
				},
				render: function(){
					var parent = this;
					// get the list of filters
					var filters = this.model.get('filters');
					// get the list of filter labels
					var labels = this.model.get('labels');
					// empty the location to render the template
					this.$el.empty();
					// for each filter 
					_.each(filters, function(filter, index){
						//repeat the template
						parent.$el.append(parent.template({
							select_label: labels[filter.id],
							select_id: filter.id,
							options: filter.options
						}));
					});
					this.$el.append('<a class="update_results" href="#/submit">'+ this.model.get('submit_button') +'</a>');
					this.$el.append('<a class="reset_results" href="#/reset">'+ this.model.get('reset_button') +'</a>');
					return this;
				}
			}),

			ResultsView : Backbone.View.extend({
				el: '#results_container',

				tmpl:"article-results",

				initialize: function(){		     	
			     	this.listenTo(this.model, 'change', this.render);

			     	v_bayer.Utilites.require_template(this.tmpl);
					this.template = _.template( $('#template_'+ this.tmpl).html() );
					this.setRecentDate();
				},
				setRecentDate: function(){
					// helps determine which articles are recent/new
					var days = this.model.get('recent_date_offset');
					this.recent_date = new Date();
					this.recent_date.setDate(this.recent_date.getDate() - days);
				},
				render: function(){
					// remove the existing results
					this.$el.empty();
					// pass the results to the template 
					this.$el.append(this.template({
						results:this.model.get('results'),
						recent_date:this.recent_date
					}));
				}
			}),
			PaginationView : Backbone.View.extend({
				el: '#pagination_container',

				tmpl:"article-pagination",

				events: {
					'click .pagination-link':'pageChange',
					'click .previous_article':'previousPage',
					'click .next_article':'nextPage'
				},
				initialize: function(){		     	
			     	this.listenTo(this.model, 'change', this.render);

			     	v_bayer.Utilites.require_template(this.tmpl);
					this.template = _.template( $('#template_'+ this.tmpl).html() );
				},

				pageChange: function(event){
					// check if the requested page is already shown
					if($(event.target).hasClass('active')){ 
						// do nothing
						return false; 
					}
					// get the requested page number
					this.model.set('current_page',parseInt($(event.target).text()));
					// get new data from the server
					this.model.fetchWithData();
				},
				previousPage : function(event){
					if($(event.target).hasClass('disabled')){ 
						// do nothing
						return false; 
					}
					// subtract one from the current page
					this.model.set('current_page',this.model.get('current_page')-1);
					// get new data from the server
					this.model.fetchWithData();
				},
				nextPage : function(event){
					if($(event.target).hasClass('disabled')){ 
						// do nothing
						return false; 
					}
					// add one to the current page
					this.model.set('current_page',this.model.get('current_page')+1);
					// get new data from the server
					this.model.fetchWithData();
				},
				render: function(){
					// get the page values
					var pagination = this.model.get('pages');
					var pages = Math.ceil(parseInt(pagination.total)/this.model.get('per_page'));
					// remove the existing pagination
					this.$el.empty();
					
					// if there is more than one page of results
					if(pages > 1){
						// show pagination 
						this.$el.append('<a href="#/page/previous" class="arrow previous_article">previous</a>');
						for(var i=1;i<=pages;i++){
							this.$el.append(this.template({
								index: i,
								current: parseInt(pagination.current)
							}));
						}
						this.$el.append('<a href="#/page/next" class="arrow next_article">next</a>');

						// are we showing the first page
						if(pagination.current == "1"){
							//disable the previous arrow
							this.$el.find('.previous_article').addClass('disabled');
						}
						// are we showing the last page
						if(parseInt(pagination.current) == pages){
							//disable the next arrow
							this.$el.find('.next_article').addClass('disabled');
						}
					}
					return this;
				}
			}),

			FilterRouter : Backbone.Router.extend({
				routes:{
			      '*filter': 'setFilter'
			    },

			    setFilter: function( param ) {
			      // Set the current filter to be used
			      if (param) {
			        param = param.trim();
			      }
			      v_bayer.FilterParam = param || '';
			    }
			})

		};

        return v_bayer;

    }(window.v_bayer || {}));
    
	//update the Global Custom name space with new functionality and variables
	window.v_bayer = v_bayer;
    

	(function(){

		var filter_model = new v_bayer.ArticleFilter.Model();
		// key values should match the filter id's returned for each drop down
		filter_model.set({labels:{crops:"Crops",pests:"Hot Topic"}});
		filter_model.set({per_page:5});

		var filter_view = new v_bayer.ArticleFilter.FilterView({model: filter_model});
		var results_view = new v_bayer.ArticleFilter.ResultsView({model: filter_model});
		var pagination_view = new v_bayer.ArticleFilter.PaginationView({model: filter_model});
		
		// update the model with new data
		filter_model.fetchWithData();

		var filter_router = new v_bayer.ArticleFilter.FilterRouter();
		Backbone.history.start();

	})();


}(window, document, jQuery));

