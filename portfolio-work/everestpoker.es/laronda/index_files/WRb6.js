var WRWarn="Copyright 2006-2009 ClickTale Ltd., US Patent Pending",WRA,WRD=document,WRAS=location,WRA4=false,WRA5,WRv,WRL,WRE=".clicktale.net/",WRAP="http://s.clicktale.net/",WRn,WRB=new Array(),WRw,ClickTaleCookieDomain,ClickTaleUnloadPause=200,ClickTaleEventsMask=255-128,ClickTaleFetchFrom,ClickTaleCookieExpiryDays=365,WRBe,WRAf,WRAT,WRAU,WRAV,WRAW;(function(a){if(a.search(/www\.\w+\.\w+/i)==0){ClickTaleCookieDomain=a.substring(4,a.length)}})(WRD.domain);WRA6();if(WRA4){WRA7("note1: entering debug mode, ClickTale script is installed")}if(typeof WRInitTime=="undefined"){var WRInitTime=(new Date()).getTime();if(WRA4){WRA7("warning1: top ClickTale script is missing in the page")}}if(WRD.addEventListener){WRD.addEventListener("DOMContentLoaded",WRondomload,false)}if(!WRn){WRn=WRp()}if(WRn&&WRn.substr(0,2)=="IE"){WRD.write('<script id="ClickTaleDefer" defer="defer" src=//:><\/script>');(function(a){if(a){a.onreadystatechange=function(){if(this.readyState=="complete"){WRondomload()}}}})(WRD.getElementById("ClickTaleDefer"))}WRw=(WRD.compatMode=="BackCompat");WRv=(WRw?WRD.body:WRD.documentElement);WRo(window,"load",WRf);function ClickTale(d,e,a){if(WRAf){if(WRA4){WRA7("error3: Monitoring has already started")}throw"CT: Monitoring has already started"}if(ClickTaleIsPlayback()){return}if(e==undefined){e=1}if(WRA4){WRA7("note2: preparing to record (ver "+11.6+") for project id "+d);if(e==1){WRA7("note3: recording all visitors to this page")}else{WRA7("note3: recording approximately 1 of every "+Math.ceil(1/e)+" visitors to this page")}}if(!WRn){if(WRA4){WRA7("warning2: the current browser is not supported")}return}if(WRAS.protocol=="file:"){if(WRA4){WRA7("warning3: the current protocol is not supported")}return}if(WRl("WRIgnore")){if(WRA4){WRA7("warning6: the current machine/user is temporarily disabled for recording")}return}WRL=WRl("WRUID");var c=false;if(WRL==null){c=true;if(Math.random()<e){WRL=WRAg()}else{WRL=0}}WRk("WRUID",WRL,ClickTaleCookieExpiryDays);if(WRL==0||(WRl("WRUID")==null&&e!=1)){if(WRA4){WRA7("warning4: the current machine/user is disabled for recording")}return}if(!a){a="www"}WRE="http://"+a+WRE;if(typeof ClickTaleSSL!="undefined"){if((ClickTaleSSL==1&&WRAS.protocol=="https:")||ClickTaleSSL==2){WRAP=WRE=WRE.replace(/^http/,"https")}}if(typeof ClickTaleScriptSource!="undefined"){if(typeof ClickTaleScriptSource=="string"){WRAP=ClickTaleScriptSource}else{WRAP=WRE}}WRAf=true;WRC({a:"start",t:WRI()});WRA=d;var b=new Image();b.src=WRE+"i/"+WRA+".gif?r="+e+"&UID="+WRL+(c?"&new":"")+"&"+WRH();b.onerror=function(){b.onload=null;b.onerror=null;WRA8()};b.onload=function(){b.onload=null;b.onerror=null;WRG(b)}}function ClickTaleIsPlayback(){try{return parent&&parent!=window&&parent.WebPlayer}catch(a){}return false}function WRG(b){var c=WRD.createElement("script");c.src=WRAP+"WRb6"+(b.width>1?"S"+b.width:"")+"b.js";var a=WRD.getElementById("ClickTaleDiv");if(!a){a=WRD.getElementById("ClickTale")}if(a){if(WRA4){WRA7("note4: preparing for stage 2")}a.appendChild(c)}else{if(WRA4){WRA7("error1: no 'ClickTale' DIV element found in this page")}}}function WRA8(){if(WRA4){WRA7("error2: unable to record because either there are no credits for project or communication may be down")}WRk("WRIgnore",true,ClickTaleCookieExpiryDays?0.007:false)}function WRH(){return Math.floor(Math.random()*2147483647)}function WRAg(){return WRH()+"."+(WRInitTime&2147483647)}function WRI(){return(new Date()).getTime()-WRInitTime}function WRC(a){if(typeof WRc=="function"){WRc(a)}else{if(WRB.push){WRB.push(a)}}}function WRf(){WRC({a:"load",w:WRs(),h:WRt(),sw:WRv.scrollWidth,sh:WRv.scrollHeight,cw:WRv.clientWidth,ch:WRv.clientHeight,t:WRI()})}function WRs(){return self.innerWidth||WRv.offsetWidth}function WRt(){return self.innerHeight||WRv.offsetHeight}function WRk(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*86400000));var a="; expires="+b.toGMTString()}else{var a=""}WRD.cookie=c+"="+d+a+"; path=/;"+(ClickTaleCookieDomain?" domain="+ClickTaleCookieDomain+";":"")}function WRl(b){var e=b+"=";var a=WRD.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}function ClickTaleGetSID(){return typeof WRSID=="number"?WRSID:null}function ClickTaleGetUID(){var a=WRl("WRUID");return a>0?a:null}function ClickTaleTag(a){WRC({a:"tag",c:a,t:WRI()})}ClickTaleEvent=ClickTaleTag;function ClickTaleNote(a){WRC({a:"note",c:a,t:WRI()})}function ClickTaleField(b,a){WRC({a:"field",f:b,v:a,t:WRI()})}function ClickTaleExec(a){WRC({a:"exec",c:a,t:WRI()})}function ClickTaleIgnore(a){WRk("WRUID",0,a)}function ClickTaleUploadPage(a,b){if(WRAf){throw"CTUP: Monitoring has already started"}WRAT=true;WRAV=a;WRAW=b;if(WRAU&&typeof WRAh=="function"){WRAh()}}function ClickTaleSetAllSensitive(){WRBe=true}function WRondomload(){if(ClickTaleIsPlayback()||WRAU){return}var b=WRD.getElementById("ClickTaleDefer");if(b){b.parentNode.removeChild(b)}var a=new RegExp('(<div id="?ClickTaleDiv"?[^>]+>)\\s*<script[^>]+><\/script>\\s*(</div>)',"i");WRAU=WRD.documentElement.innerHTML.replace(a,"$1$2");WRC({a:"domload",t:WRI()});if(typeof WRAX=="function"){WRAX()}if(WRAT&&typeof WRAh=="function"){WRAh()}}function WRA6(){if(ClickTaleIsPlayback()){return}WRA9(WRAS.hash.substr(1));WRA9(WRAS.search.substr(1))}function WRA9(d){var c=d.split("&");for(var b=0;b<c.length;b++){var e=c[b].split("=");var a=decodeURIComponent(e[0]).toLowerCase();if(e.length==2&&(a=="ct"||a=="clicktale")){WRBA(e[1])}}}function WRBA(d){var c=d.split(",");for(var b=0;b<c.length;b++){switch(c[b].toLowerCase()){case"debug":WRD.write('<textarea id="ClickTaleDebugDump" rows="5" cols="80" style="position: absolute; left:10px; top:10px; border: solid #6C358D;"></textarea>');WRA5=WRD.getElementById("ClickTaleDebugDump");if(WRA5){WRA5.value=""}WRA4=true;break;case"enable":WRk("WRIgnore",null,-1);var a=WRl("WRUID");if(a==null||a==0){WRk("WRUID",WRAg(),ClickTaleCookieExpiryDays)}break;case"disable":WRk("WRUID",0,ClickTaleCookieExpiryDays);break;case"reset":WRk("WRUID",null,-1);break;default:ts=c[b].match(/^(\w+)(\(|%28)(.+)(\)|%29)$/i);if(ts&&ts.length==5){var a=decodeURIComponent(ts[3]),e=ts[1];switch(e.toLowerCase()){case"t":ClickTaleTag(a);break;case"ua":WRn=decodeURIComponent(a);WRA7("warning7: forcing userAgent type: "+WRn);break;default:WRA7("warning5: unknown parameter in URL: "+e);break}}break}}}function WRA7(a){if(WRA5){WRA5.value+=(a+"\n")}else{alert("CT: "+a)}}function WRp(){var a=navigator.userAgent;if(a.indexOf("Opera ")!=-1){return}if(a.indexOf("MSIE 8.0")!=-1){return"IE8"}if(a.indexOf("MSIE 7.0")!=-1){return"IE7"}if(a.indexOf("MSIE 6.0")!=-1){return"IE6"}if(a.indexOf("Firefox/3.6")!=-1){return"FF36"}if(a.indexOf("Firefox/3.5")!=-1){return"FF35"}if(a.indexOf("Firefox/3.0")!=-1){return"FF30"}if(a.indexOf("Firefox/2.0")!=-1){return"FF20"}if(a.indexOf("Firefox/1.5")!=-1){return"FF15"}}function WRo(c,a,b){if(c.addEventListener){c.addEventListener(a,b,false)}else{if(c.attachEvent){c.attachEvent("on"+a,b)}}};