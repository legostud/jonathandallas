<!-- Begin Top Banner -->
<div id="banner_graphic_dload" class="top_banner">
 <TMPL_UNLESS GEOIP_NO_DLOAD>
    <div id="banner_button_wrapper"><!-- Begin button -->
        <div id="banner_button_left"></div>
        <div id="banner_button_middle">
            <a href="<TMPL_VAR CUSTOM_SERVER><TMPL_VAR ADV>/<TMPL_VAR URL_NAME><TMPL_VAR DLOAD_ARGS>" <TMPL_IF LANGUAGE_FR>style="font-size:25px;"</TMPL_IF> >
                Nedlast nå
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
            <h2>Spillere hvor du er bosatt har ikke tilgang til vårt online kasino.</h2>
            <p>Vi beklager denne ulempen. Du kan imidlertid fremdeles spille i Frankrikes ledene online pokerrom. Lær å spille gratispoker med <a href="http://www.everestpoker.com/fr/?imid=470" target="_blank" class="cssBodyLink">Everest Poker!</a></p>
            <p>Vennligst kontakt vår <a href="/no/support/" class="cssBodyLink">Kundeservice</a> om du skulle ha videre spørsmål.</p>
        </div>
    <TMPL_ELSE>
    <!-- Bonus Offer -->
        <div id="download_offer">
            <div id="download_offer_top">
                <h2>$200 i gave</h2>
                <p>Etter å ha installert programvaren trenger du kun å registrere deg og gjøre ditt første innskudd på $200, og vi vil legge $200 i bonussjetonger til din spillerkonto.</p>
            </div>
            <div id="download_offer_bottom">Vi ønsker med dette å takke deg for å prøve ut <span class="cssBodyBold">Imperial Casino!</span></div>
        </div>
        <!-- Download Instructions -->
        <div id="download_instructions">
            <h2>Nedlastingsinstruksjoner</h2>
            <ul class="download">
                <span id="ffInstructions">
                    <li>Velg "Save file"</li>
                    <li>Finn og åpne den lagrede filen.</li>
                </span>
                <span id="ieInstructions">
                    <li>Velg "Run/Kjør" eller "Save/Lagre"</li>
                    <li>Dersom du lagret filen på din maskin, gå til denne filen og start den.</li>
                </span>
                <li>Velg ditt språk, og vent mens programvaren installeres automatisk.</li>
                <li>Programvaren vil starte automatisk etter noen få minutter.</li>
                <li>Klikk "Meld deg inn nå" for å motta dine GRATIS bonussjetonger.</li>
            </ul>
        </div>
        <!-- Message -->
        <div id="download_message">
            Programvaren vår er sikker og digitalt signert. Alle transaksjoner krypteres og er strengt konfidensielle. Vår kombinasjon av utmerket programvare, fulkommen sikkerhet, komplett anonymitet og sertifisert fair play gjør <TMPL_VAR CASINO_NAME> til det beste alternativet for global spill-underholdning.
        </div>
        </TMPL_IF>
    </div>
</div>    
<!-- download instructions -->
<TMPL_UNLESS GEOIP_NO_DLOAD><script type="text/javascript" src="/includes/download.js"></script></TMPL_UNLESS>	
