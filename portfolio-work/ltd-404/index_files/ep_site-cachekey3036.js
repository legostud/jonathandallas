
/* - ep_site.js - */
// http://cms.grandvirtual.com:90/ep/portal_javascripts/ep_site.js?original=1
var EP={server:'everestpoker.com',_initialized:null,init: function(){this.download_link=null;this.set_promotional_links();this.set_download_links();this._initialized=true},set_cookie: function(name,value,elapsed){var expires="";if(elapsed){var date=new Date();date.setTime(date.getTime()+(elapsed*60*1000));expires="; expires="+date.toGMTString()}
document.cookie=name+"="+escape(value)+expires+"; path=/"},read_cookies: function(name){var cookies=document.cookie.split(/; */);var cookie_hash={};for(var i=0;i<cookies.length;i++){var cookie=cookies[i];var c_pair=cookie.match(/^(\w+)=(.*)/);if(!c_pair){c_pair=cookie.match(/^(\w+)/);if(!c_pair){continue}}
if(c_pair.length<2){continue}
var val=c_pair[2]?c_pair[2]:'';if(name){if(c_pair[1]==name){return val}}
else{cookie_hash[c_pair[1]]=val}}
if(name){return null}
else{return cookie_hash}},erase_cookie: function(name){createCookie(name,"",-1)},set_promotional_links: function(){jq("a.promo_link").click(function(event){var cookies=EP.read_cookies();var a=cookies.a?cookies.a:'V101';var m=cookies.m?cookies.m:'';var url=jq(this)[0].href;if(url.match(/\?/)){url=url+'&adv='+a+'&mid='+m}
else{url=url+'?adv='+a+'&mid='+m}
var promoWindow=window.open(url,'promo_link');promoWindow.focus();return false})},set_download_links: function(){jq("a.download_link").each(function(iter,link){if(!EP.download_link){var host=window.location.host;var cookies=EP.read_cookies();var a=cookies.a?cookies.a:'V101';var m=cookies.m?cookies.m:'';var i=cookies.i?cookies.i:'';url='http://'+host+'/downloads/'+a+'/Everest Poker.exe'+'?IMID='+i+'&MID='+m;EP.download_link=url}
link.href=EP.download_link})},gvpop: function(url,type,width,height){if(url===undefined){return null}
type=type?type:'under';width=width?width:720;height=height?height:300;var cookies=EP.read_cookies();if(cookies.ep_pt){return false}
var a=cookies.a?cookies.a:'V101';var m=cookies.m?cookies.m:'';var full_url=url+'&adv='+a+'&mid='+m;var window_args='directories=0,height='+height+',width='+width+',hotkeys=0,location=0,menubar=0,resizable=0,scrollbars=0,toolbar=0';var popWindow=window.open(full_url,'_blank',window_args);if(popWindow){if(type=='under'){popWindow.blur();window.focus()}
else{popWindow.focus()}
EP.set_cookie('ep_pt','true',60);return popWindow}
else{return null}}}
jq(function(){EP.init()});
function addVerticalSpacing(){var viewportHeight;if(typeof window.innerWidth!='undefined'){viewportHeight=window.innerHeight} else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){viewportHeight=document.documentElement.clientHeight} else{viewportHeight=document.getElementsByTagName('body')[0].clientHeight}
var containerHeight;containerHeight=document.getElementById('visual-portal-wrapper').offsetHeight;if(viewportHeight>containerHeight){var addedSpace;addedSpace=(viewportHeight-containerHeight);document.getElementById('clear-space-after-content').style.height=addedSpace+"px"}}
