<script language="JavaScript1.2">
/* Fading Scroller - By DynamicDrive.com */
var delay=2000 //set delay between message change (in miliseconds)
var fcontent=new Array()
begintag='<span style="font-family:Verdana, Helvetica, Tahoma, Arial, Sans-Serif;font-size:12px"><center>'
fcontent[0]="<span style=font-size:16px;font-weight:bold>Beste Games!</span><br>Realistische 3D graphics<br>Gratis en snelle download!"
fcontent[1]="<span style=font-size:16px;font-weight:bold>Beste Promoties!</span><br><span style=font-size:11px>Elke maand gegarandeerd een nieuwe game!</span><br>Top bonussen en beloningen!"
fcontent[2]="<span style=font-size:16px;font-weight:bold>Vertrouwd en veilig!</span><br>Licentie en reglement sinds 1997<br>Gecontroleerde gamingkansen"
fcontent[3]="<span style=font-size:16px;font-weight:bold>Wereldwijd erkend</span><br>$1.7 biljoen verwerkte<br>transacties uit 189 landen!"
fcontent[4]="<span style=font-size:16px;font-weight:bold>Beste uitbetalingen!</span><br>Hogere uitbetalingspercentages<br>dan landcasino's!"
fcontent[5]="<span style=font-size:16px;font-weight:bold>Directe geldopname!</span><br>Vele betaalmogelijkheden<br>Begin Binnen een paar Minuten te Spelen!"
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
document.getElementById("fscroller").style.color="rgb(88,75,108)"
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
rhex=88  // Initial r color value.
ghex=75  // Initial g color value.
bhex=108  // Initial b color value.

function colorfade() {
if(frame>0) {	
rhex+=8.35; // increase r color value
ghex+=9; // increase g color value
bhex+=7.35; // increase b color value
document.getElementById("fscroller").style.color="rgb("+rhex+","+ghex+","+bhex+")"; // Set color value.
frame--;
setTimeout("colorfade()",20);	
}
else{
document.getElementById("fscroller").style.color="rgb(255,255,255)";
frame=20;
rhex=88
ghex=75
bhex=108 }   
}

if (ie4||DOM2)
document.write('<div id="fscroller" style="border:0px solid black;width:'+fwidth+';height:'+fheight+';padding:0px"></div>')

//window.onload=changecontent
</script>