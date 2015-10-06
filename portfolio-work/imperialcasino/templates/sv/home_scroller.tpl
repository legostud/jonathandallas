<script language="JavaScript1.2">
/* Fading Scroller - By DynamicDrive.com */
var delay=2000 //set delay between message change (in miliseconds)
var fcontent=new Array()
begintag='<span style="font-family:Verdana, Helvetica, Tahoma, Arial, Sans-Serif;font-size:12px"><center>'
fcontent[0]="<span style=font-size:16px;font-weight:bold>Bästa Spelen!</span><br>Realistisk 3D Grafik<br>Gratis och Snabb Nerladdning!"
fcontent[1]="<span style=font-size:16px;font-weight:bold>Bästa Erbjudandena!</span><br>Nytt Spel Varje Månad, Garanterat!<br>Höga Bonusar och Belöningar!"
fcontent[2]="<span style=font-size:16px;font-weight:bold>Pålitlig och Säker!</span><br>Licensierat och Kontrollerat sedan 1997<br>Granskade Odds"
fcontent[3]="<span style=font-size:16px;font-weight:bold>Globalt Erkända</span><br>$1.7 Billioner i genomförda transaktioner från 189 olika länder!"
fcontent[4]="<span style=font-size:16px;font-weight:bold>Hög utbetalningsprocent!</span><br>Bättre Utbetalningstakter än landbaserade Kasinos!"
fcontent[5]="<span style=font-size:16px;font-weight:bold>Omedelbara Utbetalningar!</span><br>Fullt Utbud av Betalningsmetoder<br>Alla Valutor Accepterade!"
closetag='</center></span>'

var fwidth=286 //set scroller width
var fheight=45 //set scroller height
				
var ie4=document.all&&!document.getElementById
var ns4=document.layers
var DOM2=document.getElementById
var faderdelay=0
var index=0

if (DOM2)
faderdelay=1500

//function to change content
function changecontent(){
if (index>=fcontent.length)
index=0
if (DOM2){
document.getElementById("fscroller").style.color="rgb(0,0,0)"
document.getElementById("fscroller").innerHTML=begintag+fcontent[index]+closetag
colorfade()
}
else if (ie4)
document.all.fscroller.innerHTML=begintag+fcontent[index]+closetag
else if (ns4){
document.fscrollerns.document.fscrollerns_sub.document.write(begintag+fcontent[index]+closetag)
document.fscrollerns.document.fscrollerns_sub.document.close()
}

index++
setTimeout("changecontent()",delay+faderdelay)
}

// colorfade() partially by Marcio Galli for Netscape Communications.
// Modified to utilize RGB colors by Dann Goddu for Grand Virtual, Inc.
frame=20;
rhex=0  // Initial r color value.
ghex=0  // Initial g color value.
bhex=0  // Initial b color value.

function colorfade() {
if(frame>0) {	
rhex+=12.75; // increase r color value
ghex+=12.75; // increase g color value
bhex+=12.75; // increase b color value
document.getElementById("fscroller").style.color="rgb("+rhex+","+ghex+","+bhex+")"; // Set color value.
frame--;
setTimeout("colorfade()",20);	
}
else{
document.getElementById("fscroller").style.color="rgb(255,255,255)";
frame=20;
rhex=0
ghex=0
bhex=0 }   
}

if (ie4||DOM2)
document.write('<div id="fscroller" style="border:0px solid black;width:'+fwidth+';height:'+fheight+';padding:0px"></div>')

//window.onload=changecontent
</script>