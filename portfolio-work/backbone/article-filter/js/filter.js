// default namespace
var v_bayer = v_bayer || {};

var FilterModel = Backbone.Model.extend({
    url: 'js/filter-category.json',
    defaults:{
    	// label keys are equal to the id values in the json for each filter
    	labels:{
    		crops:"Crops",
    		pests:"Hot Topic"
    	},
    	per_page:5
    }
});

var filter_model = new FilterModel();

var FilterView = Backbone.View.extend({
	el: '#filter_container',

	tagName: 'li',
	
	filter_values: "",
	filter_class: ".filter-group",
	filter_data:{},

	current_page: 1,

	template_filters: _.template( $('#filter_template').html() ),
	template_results: _.template( $('#result_template').html() ),
	template_pagination: _.template( $('#pagination_template').html() ),

	events: {
		'change .filter-group':'filterResults',
		'click .pagination-link':'pageChange'
	},

	initialize: function(){
		this.num_results = this.model.get("per_page").toString(),

     	this.listenTo(this.model, 'change', this.render);
     	// update the model with new data
     	this.model.fetch({data: {"args":{"selected":JSON.stringify(this.filter_data),"page":"1","num_results":this.num_results}}, type: 'GET'});
	},

	filterResults: function(event){
		var parent = this;
		// get get status of each filter
		this.$el.find(this.filter_class).each(function(){
			var id = $(this).attr('id');
			var value = $(this).val();
			parent.filter_data[id] = value;
		});
		// update the browser URL

		// request new data from server
		this.model.fetch({data: {"args":{"selected":JSON.stringify(this.filter_data),"page":this.current_page,"num_results":this.num_results}}, type: 'GET'});
	},
	pageChange: function(event){
		// check if the requested page is already shown
		if($(this).hasClass('active')){ 
			// do nothing
			return false; 
		}
		// get the requested page number
		this.current_page = parseInt($(event.target).text());
		// get new data from the server
		this.model.fetch({data: {"args":{"selected":JSON.stringify(this.filter_data),"page":this.current_page,"num_results":this.num_results}}, type: 'GET'});

	},
	render: function(){
		var parent = this;
		// get the list of filters
		var filters = this.model.get('filters');
		// get the list of filter labels
		var labels = this.model.get('labels');
		// get the list of results
		var results = this.model.get('results');
		// get the page values
		var pagination = this.model.get('pages');
		var pages = Math.ceil(parseInt(pagination.total)/this.model.get('per_page'));
		// empty the location to render the template
		this.$el.empty();
		// for each filter 
		_.each(filters, function(filter, index){
			//repeat the template
			parent.$el.append(parent.template_filters({
				select_label: labels[filter.id],
				select_id: filter.id,
				options: filter.options
			}));
		});
		// for each result
		_.each(results, function(result, index){
			//repeat the template
			parent.$el.append(parent.template_results({
				image_src: result.image,
				href: result.url,
				title: result.title,
				date: result.date,
				content: result.content,
				tags: result.tags
			}));
		});
		// if there is more than one page of results
		if(pages > 1){
			// show pagination 
			this.$el.append('<div class="pagination">');
			for(i=1;i<=pages;i++){
				this.$el.append(parent.template_pagination({
					index: i,
					current: parseInt(pagination.current)
				}));
			}
			this.$el.append('</div>');
		}
		return this;
	}
});

var filter_view = new FilterView({model: filter_model});

v_bayer.FilterRouter = Backbone.Router.extend({
	routes:{
      '*filter': 'setFilter'
    },

    setFilter: function( param ) {
      // Set the current filter to be used
      if (param) {
        param = param.trim();
      }
      v_bayer.FilterParam = param || '';

      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items
      // FilterModel.trigger('filter');
    }
});

v_bayer.filter_router = new v_bayer.FilterRouter();
Backbone.history.start();

