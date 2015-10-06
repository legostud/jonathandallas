
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ++resource++cidc.themes.ltd.javascript/uGallery.js - */
// http://www.everestpoker.com/live-the-dream/portal_javascripts/++resource++cidc.themes.ltd.javascript/uGallery.js?original=1
(function(jq){var settings={width:420,height:320,thumbWidth:60,thumbHeight:45,thumbOpacity:0.5,thumbHoverOpacity:1}
jq.uGallery=function(userSettings){var images=[];jq.extend(settings,userSettings);jq("ul.gal>li>img").each(function(index,element){images[index]=jq(element).css({width:element.width+"px",height:element.height+"px"}).attr("src",jq(element).attr("src")).attr("alt",jq(element).attr("alt"))});jq("ul.gal").replaceWith("<div class='gal'><div class='gal-main-viewer'></div><div class='gal-thumbs-wrapper'><div class='gal-thumbs'></div></div></div>");for(var i=0;i<images.length;i++){jq("div.gal-thumbs").append(makeThumb(images[i]))}
jq("div.gal-thumbs>img").wrap("<div class='gal-thumb'></div>");jq("div.gal-thumbs>div.gal-thumb:first>img").trigger('click');setupCSS(images);if(images.length>=6){jq("div.gal-thumbs-wrapper").mousemove(function(e){var pageWidth=jq("html").width();var contentWidth=jq("#visual-portal-wrapper").width();var leftMargin=159;if((pageWidth-contentWidth)>0){leftMargin=((pageWidth-contentWidth)/2)+leftMargin}
var thumbs=jq("div.gal-thumbs");var margin=-(e.pageX-leftMargin);thumbs.css({"margin-left":margin+"px"})})}
jq("div.gal-thumb>img").fadeTo("slow",settings.thumbOpacity);jq("div.gal-thumb>img").hover(
function(){jq(this).fadeTo("fast",settings.thumbHoverOpacity)},
function(){jq(this).fadeTo("slow",settings.thumbOpacity)})}
makeThumb=function(img){var image=jq("<img src='"+jq(img).attr("src")+"' alt='"+jq(img).attr("alt")+"' />");image.css(proportionalDimensions(img,{x:settings.thumbWidth,y:settings.thumbHeight}));image.css({msInterpolationMode:"bicubic"});image.bind("click",img, function(e){var image=jq("<img src='"+jq(img).attr("src")+"' alt='"+jq(img).attr("alt")+"' />");image.css(proportionalDimensions(img,{x:settings.width-20,y:settings.height}));jq("div.gal-main-viewer").fadeOut("slow", function(){jq(this).html(image).hide().fadeIn("slow")})});return image}
proportionalDimensions=function(img,fitInto){if(typeof fitInto!="object"){fitInto.x=settings.thumbWidth;fitInto.y=settings.thumbHeight}
var _old={x:parseInt(jq(img).css("width")),y:parseInt(jq(img).css("height"))};var _new={x:0,y:0};var ratio=_old.x/_old.y;if(_old.x>_old.y){_new.x=fitInto.x;_new.y=fitInto.x/ratio}
else{_new.x=fitInto.y*ratio;_new.y=fitInto.y}
var marginTop=0;if(_new.y<fitInto.y){marginTop=Math.round((fitInto.y-_new.y)/2)}
else{_new.x=fitInto.y*ratio;_new.y=fitInto.y}
return{width:_new.x+"px",height:_new.y+"px","margin-top":marginTop+"px"}}
setupCSS=function(images){jq("div.gal-thumbs>div").css({float:"left",width:settings.thumbWidth+"px",height:settings.thumbHeight+"px","text-align":"center","margin-left":"3px",border:"1px solid #CCC",padding:"3px",overflow:"hidden"});jq("div.gal").css({width:settings.width+"px",overflow:"hidden"});jq("div.gal-main-viewer").css({width:settings.width+"px",height:settings.height+"px",overflow:"hidden","text-align":"center"});jq("div.gal-thumbs-wrapper").css({width:settings.width-20+"px",margin:"auto",overflow:"hidden","padding-top":"5px","padding-bottom":"10px"});jq("div.gal-thumbs").css({height:settings.thumbHeight+"px",width:images.length*(settings.thumbWidth+11)+20+"px"});jq("div.gal-thumb>img").css("background-color","black")}})(jQuery)


/* - qcomments.js - */
// http://www.everestpoker.com/live-the-dream/portal_javascripts/qcomments.js?original=1
function render_abuse_report_form(comment_id){jq('form.report_abuse').bind("submit", function(event){event.preventDefault()});var render_button='input#input-render-abuse-cancel-'+comment_id;jq(render_button).attr('disabled','disabled');var form='span#span-reply-form-'+comment_id;jq(form).slideToggle(500);var holder='span#span-reply-form-holder-'+comment_id;var cancel_button=holder+' input#input-report-abuse-cancel';var qq=jq(cancel_button);jq(cancel_button).attr('comment_id',comment_id)}
function remove_abuse_report_form(comment_id,html){jq('form.report_abuse').bind("submit", function(event){event.preventDefault()});var form='span#span-reply-form-'+comment_id;jq(form).fadeOut();var render_button='input#input-render-abuse-cancel-'+comment_id;jq(render_button).attr('disabled','');if(html!=undefined){var holder='span#span-abuse-count-holder-'+comment_id;jq(holder).append(html)}}
kukit.actionsGlobalRegistry.register("remove_abuse_report_form", function(oper){var comment_id=oper.parms.comment_id;var html=oper.parms.html
remove_abuse_report_form(comment_id,html)});kukit.commandsGlobalRegistry.registerFromAction('remove_abuse_report_form',kukit.cr.makeSelectorCommand);
