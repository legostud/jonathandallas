<!-- Begin Top Banner -->
<div id="banner_graphic_dload" class="top_banner">
 <TMPL_UNLESS GEOIP_NO_DLOAD>
    <div id="banner_button_wrapper"><!-- Begin button -->
        <div id="banner_button_left"></div>
        <div id="banner_button_middle">
            <a href="<TMPL_VAR CUSTOM_SERVER><TMPL_VAR ADV>/<TMPL_VAR URL_NAME><TMPL_VAR DLOAD_ARGS>" <TMPL_IF LANGUAGE_FR>style="font-size:25px;"</TMPL_IF> >
                Nedlast n�
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
            <h2>Spillere hvor du er bosatt har ikke tilgang til v�rt online kasino.</h2>
            <p>Vi beklager denne ulempen. Du kan imidlertid fremdeles spille i Frankrikes ledene online pokerrom. L�r � spille gratispoker med <a href="http://www.everestpoker.com/fr/?imid=470" target="_blank" class="cssBodyLink">Everest Poker!</a></p>
            <p>Vennligst kontakt v�r <a href="/no/support/" class="cssBodyLink">Kundeservice</a> om du skulle ha videre sp�rsm�l.</p>
        </div>
    <TMPL_ELSE>
    <!-- Bonus Offer -->
        <div id="download_offer">
            <div id="download_offer_top">
                <h2>$200 i gave</h2>
                <p>Etter � ha installert programvaren trenger du kun � registrere deg og gj�re ditt f�rste innskudd p� $200, og vi vil legge $200 i bonussjetonger til din spillerkonto.</p>
            </div>
            <div id="download_offer_bottom">Vi �nsker med dette � takke deg for � pr�ve ut <span class="cssBodyBold">Imperial Casino!</span></div>
        </div>
        <!-- Download Instructions -->
        <div id="download_instructions">
            <h2>Nedlastingsinstruksjoner</h2>
            <ul class="download">
                <span id="ffInstructions">
                    <li>Velg "Save file"</li>
                    <li>Finn og �pne den lagrede filen.</li>
                </span>
                <span id="ieInstructions">
                    <li>Velg "Run/Kj�r" eller "Save/Lagre"</li>
                    <li>Dersom du lagret filen p� din maskin, g� til denne filen og start den.</li>
                </span>
                <li>Velg ditt spr�k, og vent mens programvaren installeres automatisk.</li>
                <li>Programvaren vil starte automatisk etter noen f� minutter.</li>
                <li>Klikk "Meld deg inn n�" for � motta dine GRATIS bonussjetonger.</li>
            </ul>
        </div>
        <!-- Message -->
        <div id="download_message">
            Programvaren v�r er sikker og digitalt signert. Alle transaksjoner krypteres og er strengt konfidensielle. V�r kombinasjon av utmerket programvare, fulkommen sikkerhet, komplett anonymitet og sertifisert fair play gj�r <TMPL_VAR CASINO_NAME> til det beste alternativet for global spill-underholdning.
        </div>
        </TMPL_IF>
    </div>
</div>    
<!-- download instructions -->
<TMPL_UNLESS GEOIP_NO_DLOAD><script type="text/javascript" src="/includes/download.js"></script></TMPL_UNLESS>	
