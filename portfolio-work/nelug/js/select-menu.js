$(document).ready(function(){

	// Create the dropdown base
	$("<select />").appendTo("header nav");

	// Create default option "Go to..."
	$("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "Go to..."
	}).appendTo("header nav select");

	// Populate dropdown with menu items
	$("header nav .global-nav a").each(function() {
	 var el = $(this);
	 $("<option />", {
		 "value"   : el.attr("href"),
		 "text"    : el.text()
	 }).appendTo("nav select");
	});

	$("header nav select").change(function() {
	  window.location = $(this).find("option:selected").val();
	});

	$('header nav .mobile-link').click(function(e){
		e.preventDefault();
		$('header nav select').show().focus();
	});
	
});