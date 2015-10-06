
/* - ++resource++cidc.themes.ltd.javascript/common.js - */
// http://www.everestpoker.com/live-the-dream/portal_javascripts/++resource++cidc.themes.ltd.javascript/common.js?original=1
jq(document).ready(function(){if(jq(".velaro")){var deptID;var lang=jq(".language_code_hack").html();switch(lang){case "de":deptID=8819;break;case "en":deptID=8822;break;case "es":deptID=8823;break;case "fr":deptID=8824;break;case "it":deptID=8825;break;case "nl":deptID=8826;break;case "sv":deptID=8827;break;case "ja":deptID=8980;break;case "pt":deptID=8981;break;default:deptID=8822}
jq(".velaro").html("<a href=\"http://service.velaro.com/visitor/requestchat.aspx?siteid=3475&showwhen=inqueue&deptid="+deptID+"\" target=\"VelaroChat\"  onClick=\"this.newWindow = window.open('http://service.velaro.com/visitor/requestchat.aspx?siteid=3475&showwhen=inqueue&deptid="+deptID+"', 'VelaroChat', 'toolbar=no,location=no,directories=no,menubar=no,status=no,scrollbars=no,resizable=yes,replace=no');this.newWindow.focus();this.newWindow.opener=window;return false;\"><img alt=\"Velaro Live Help\" src=\"http://visitors.velaro.com/visitor/check.aspx?siteid=3475&showwhen=inqueue&deptid="+deptID+"\" border=\"0\"></a></p>")}});jq(document).ready(function(){jq(".answer").hide();jq(".question").click(function(){if(jq(this).is(".expanded")){jq(this).removeClass("expanded")}
else{jq(this).addClass("expanded")}
jq(this).nextAll().each(function(){if(jq(this).is(".answer")){jq(this).slideToggle(600)}
else{return false}})});jq(".hide_all").click(function(){jq(".answer").hide();jq(".question").removeClass("expanded")});jq(".show_all").click(function(){jq(".answer").show();jq(".question").addClass("expanded")})});
function sbsn_callback(url,status){if(url!=''){window.location.href=url}
else{jq("#sbsn-form-error").show()}}
function sbsn(form_id,url){jq.post(url+'/search_by_screen_name',jq(form_id).serialize(),sbsn_callback);return false}
function get_gallery(gallery){date=new Date();jq.get(gallery+'/photo_gallery_view?ie_is_dumb='+date.getTime(),get_gallery_callback);return false}
function get_gallery_add_form(gallery){date=new Date();jq.get(gallery+'/photo_gallery_add?ie_is_dumb='+date.getTime(),get_gallery_callback);return false}
function get_gallery_callback(data,status){jq('#profile-photos').html(data);jq('#profile-galleries').hide();jq('#profile-photos').show();jq.uGallery();return false}
function show_profile_galleries(){jq('#profile-photos').hide();jq('#profile-galleries').show();return false}
function get_post(post){jq.get('blog/'+post+'/blog_view',get_post_callback);return false}
function get_post_callback(data,status){jq('#profile-post').html(data);jq('#profile-blog').hide();jq('#profile-post').show();return false}
function show_blog(){jq('#profile-post').hide();jq('#profile-blog').show();return false}
jq(document).ready(function(){jq("#poker_face").click(function(){jq("#poker_face_hint").toggle();jq("#social_networking_hint").hide();jq("#past_experience_hint").hide();jq("#skill_knowledge_hint").hide()});jq("#social_networking").click(function(){jq("#poker_face_hint").hide();jq("#social_networking_hint").toggle();jq("#past_experience_hint").hide();jq("#skill_knowledge_hint").hide()});jq("#past_experience").click(function(){jq("#poker_face_hint").hide();jq("#social_networking_hint").hide();jq("#past_experience_hint").toggle();jq("#skill_knowledge_hint").hide()});jq("#skill_knowledge").click(function(){jq("#poker_face_hint").hide();jq("#social_networking_hint").hide();jq("#past_experience_hint").hide();jq("#skill_knowledge_hint").toggle()});jq(".hint").click(function(){jq(".hint").hide()});jq(".hint").hover("",function(){jq(this).hide()})});
