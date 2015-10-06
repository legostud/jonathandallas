<table dir="ltr" width="100%" cellpadding="0" cellspacing="5" border="0" class="cssBody"><tr><td>
	<p class="cssHeader">Erbjudanden</p>
	
	<p>Från vår generösa välkomstbonus till våra dramatiska månadsvisa turneringar och våra specialerbjudanden - <TMPL_VAR CASINO_NAME>&#153; är fulladdat med nervkittlande tävlingar och fantastiska chanser att vinna. Använd din tur, din skicklighet eller båda för att vinna stora vinster!</p>
	
	<TMPL_IF CL_DISCLAIMER>
		<p><TMPL_VAR CL_DISCLAIMER></p>
	</TMPL_IF>
	
	<table cellpadding="0" cellspacing="8" border="0" align="center" width="100%">
	
	<TMPL_IF TOURNAMENT><TMPL_LOOP TOURNAMENT>
		<tr><td colspan="2">
			<hr class="cssLine" style="height:1px">
		</td></tr>
		
		<tr valign="center">
			<td>
				<a href="<TMPL_VAR URL>" id="casinos"><img src="<TMPL_VAR IMAGE>" border="0" /></a>
				<p><a href="<TMPL_VAR URL>" class="cssBodyLink">Mer information</a></p>
			</td>
			<td>
				<span class="cssBodyBoldColor1"><TMPL_VAR TITLE></span>
				<p><TMPL_VAR CAPTION></p>
			</td>
		</tr>
	</TMPL_LOOP></TMPL_IF>
	
	<TMPL_IF EVENT><TMPL_LOOP EVENT>
		<tr><td colspan="2">
			<hr class="cssLine" style="height:1px">
		</td></tr>
		
		<tr valign="top">
			<td>
				<a href="<TMPL_VAR URL>"><img src="<TMPL_VAR IMAGE>" border="0" /></a>
				<p><a href="<TMPL_VAR URL>" class="cssBodyLink">Mer information</a></p>
			</td>
			<td>
				<span class="cssBodyBoldColor1"><TMPL_VAR TITLE></span>
				<p><TMPL_VAR CAPTION></p>
			</td>
		</tr>
	</TMPL_LOOP></TMPL_IF>
	
	</table>
	
	<p>&nbsp;</p>
</td></tr></table>