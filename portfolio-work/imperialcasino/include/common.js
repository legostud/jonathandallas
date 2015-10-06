//if (parent.frames.length > 0) {
//    parent.location.href = self.document.location
//}

// --------------------------------------
// Clickaway functions
// --------------------------------------
var actionExit = 1;  
var dloadBox = 0;
var closedAd = 0;
document.onclick = new Function ("if (closedAd == 1) { actionExit = 1; closedAd = 0; } else {actionExit = 0;} return true;");

function exiting() {
	if (dloadBox == 1) { return true; }
   	//if (actionExit != 0) { clickAway(); }
   	return true;
}
// --------------------------------------

function gvpop( type, x, y, url ) {
    var p = window.open( url+'&imid=450', '_blank', 'directories=0,height='+y+',width='+x+',hotkeys=0,location=0,menubar=0,resizable=0,scrollbars=0,toolbar=0' );
    if (p) {	
	if ( type == 'under' ) {
	    p.blur();
	    this.focus();
	} else {
	    p.focus();
	}
    }	
    return;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_displayStatusMsg(msgStr) { //v1.0
	status=msgStr;
	document.MM_returnValue = true;
	}
	
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}