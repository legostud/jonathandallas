<!-- Begin Top Banner -->
<div id="banner_graphic_dload" class="top_banner">
 <TMPL_UNLESS GEOIP_NO_DLOAD>
    <div id="banner_button_wrapper"><!-- Begin button -->
        <div id="banner_button_left"></div>
        <div id="banner_button_middle">
            <a href="<TMPL_VAR CUSTOM_SERVER><TMPL_VAR ADV>/<TMPL_VAR URL_NAME><TMPL_VAR DLOAD_ARGS>" <TMPL_IF LANGUAGE_FR>style="font-size:25px;"</TMPL_IF> >
                Nu Downloaden
            </a>
        </div>
        <div id="banner_button_right"></div>
    </div><!-- End button -->
    </TMPL_UNLESS>
</div><!-- End Top Banner -->

<!-- document content - area specific -->
<div id="document_content_interior_top"></div>
<div id="document_content_interior_middle">
    <!-- main page content -->
    <div id="page_content" class="dload"><!-- Begin Content -->				
    <TMPL_IF GEOIP_NO_DLOAD>
        <div id="download_instructions" style="width: 100%;">
            <h2>Ons online casino is niet toegankelijk in jouw jurisdictie.</h2>
            <p>We verontschuldigen ons voor dit ongemak. Je kunt echter nog wel spelen in Frankrijk's originele online pokerroom. Leer om gratis poker te spelen met <a href="http://www.everestpoker.com/fr/?imid=470" target="_blank" class="cssBodyLink">Everest Poker!</a></p>
            <p>Mocht je nog aanvullende vragen hebben, neem dan contact op met onze <a href="/nl/support/" class="cssBodyLink">Klantenservice</a>.</p>
        </div>
    <TMPL_ELSE>
    <!-- Bonus Offer -->
        <div id="download_offer">
            <div id="download_offer_top">
                <h2>GRATIS Bonus van $200</h2>
                <p>Registreer jezelf zodra je de software geïnstalleerd hebt en maak je eerste storting van ten minste $200. We zullen vervolgens $200 in bonusfiches op je spelersrekening storten.</p>
            </div>
            <div id="download_offer_bottom">Op deze manier willen we je bedanken voor het uitproberen van <span class="cssBodyBold">Imperial Casino!</span></div>
        </div>
        <!-- Download Instructions -->
        <div id="download_instructions">
            <h2>Instructies voor Downloaden</h2>
            <ul class="download">
                <span id="ffInstructions">
                    <li>Selecteer "Bestand Opslaan"</li>
                    <li>Zoek het opgeslagen bestand op en open de software.</li>
                </span>
                <span id="ieInstructions">
                    <li>Selecteer "Openen" of "Opslaan"</li>
                    <li>Indien je ervoor hebt gekozen om op te slaan, ga dan naar het betreffende bestand op je computer en open het.</li>
                </span>
                <li>Selecteer de gewenste taal en wacht af terwijl de software automatisch geïnstalleerd wordt.</li>
                <li>De casinosoftware zal binnen enkele minuten automatisch worden geopend.</li>
                <li>Klik op "Doe Nu Mee" om jouw GRATIS bonusfiches te ontvangen.</li>
            </ul>
        </div>
        <!-- Message -->
        <div id="download_message">
            Onze software is veilig en betrouwbaar. Alle transacties zijn veilig gecodeerd en strikt vertrouwelijk. Deze winnende combinatie van fantastische software, complete veiligheid, absolute privacy en gegarandeerd eerlijk spel, maakt <TMPL_VAR CASINO_NAME> de beste keuze voor een gamingervaring van wereldklasse.
        </div>
        </TMPL_IF>
    </div>
</div>    
<!-- download instructions -->
<TMPL_UNLESS GEOIP_NO_DLOAD><script type="text/javascript" src="/includes/download.js"></script></TMPL_UNLESS>	
