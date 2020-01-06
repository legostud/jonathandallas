// JavaScript Document
window.onload = function(){ 

	alert("welcome"); 


$(document).ready(function()
{
  //hide the all of the element with class msg_body
  $(".answer").hide();
  
  //toggle the componenet with class msg_body
  $(".question").click(function()
  {
    $(this).next(".answer").slideToggle(600);
  });
  //Hide all answers on click
  $(".hide_all").click(function()
  {
  	$(".answer").hide();
  });
  $(".show_all").click(function()
  {
	$(".answer").show();
  });
});

}