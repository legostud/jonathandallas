<!-- Begin Top Banner -->
<div id="banner_graphic_dload" class="top_banner">
 <TMPL_UNLESS GEOIP_NO_DLOAD>
    <div id="banner_button_wrapper"><!-- Begin button -->
        <div id="banner_button_left"></div>
        <div id="banner_button_middle">
            <a href="<TMPL_VAR CUSTOM_SERVER><TMPL_VAR ADV>/<TMPL_VAR URL_NAME><TMPL_VAR DLOAD_ARGS>" <TMPL_IF LANGUAGE_FR>style="font-size:25px;"</TMPL_IF> >
                Ladda ner nu
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
            <h2>V�ra onlinekasinon �r inte tillg�ngliga i din jurisdiktion.</h2>
            <p>Vi beklagar besv�ret. Du kan dock fortfarande spela i Frankrikes ledande pokerrum. L�r di spela poker gratis med <a href="http://www.everestpoker.com/fr/?imid=470" target="_blank" class="cssBodyLink">Everest Poker!</a></p>
            <p>Tveka inte att kontakta <a href="/sv/support/" class="cssBodyLink">spelarsupporten</a> om du har n�gra fr�gor.</p>
        </div>
    <TMPL_ELSE>
    <!-- Bonus Offer -->
        <div id="download_offer">
            <div id="download_offer_top">
                <h2>200 $ GRATIS</h2>
                <p>Efter att du installerat programvaran, registrerar du dig helt enkelt och g�r din f�rsta ins�ttning p� minst 200 dollar. Vi l�gger d� till 200 dollar i bonusmarker till ditt spelarkonto.</p>
            </div>
            <div id="download_offer_bottom"> Det h�r �r v�rt s�tt att tacka dig f�r att du provar <span class="cssBodyBold">Imperial Casino!</span></div>
        </div>
        <!-- Download Instructions -->
        <div id="download_instructions">
            <h2>Instruktioner f�r nerladdning</h2>
            <ul class="download">
                <span id="ffInstructions">
                    <li>V�lj "Spara fil"</li>
                    <li>Leta upp den sparade filen p� din dator och �ppna den.</li>
                </span>
                <span id="ieInstructions">
                    <li>V�lj "K�r" eller "Spara"</li>
                    <li>Om du sparade filen s� leta upp den p� din dator och �ppna den.</li>
                </span>
                <li>V�lj ditt spr�k och mjukvaran kommer sedan att installeras automatiskt.</li>
                <li>Inom ett par minuter kommer mjukvaran f�r programmet att �ppnas automatiskt.</li>
                <li>Klicka p� "Bli medlem nu" f�r att f� dina bonusmarker GRATIS.</li>
            </ul>
        </div>
        <!-- Message -->
        <div id="download_message">
            V�r mjukvara �r s�ker, trygg och digitalt signerad. Alla transaktioner �r krypterade och absolut konfidentiella. Denna vinnande kombination av utm�rkt mjukvara, absolut s�kerhet, total anonymitet och garanterat rent spel g�r <TMPL_VAR CASINO_NAME> till det b�sta valet f�r global spelarsp�nning.
        </div>
        </TMPL_IF>
    </div>
</div>    
<!-- download instructions -->
<TMPL_UNLESS GEOIP_NO_DLOAD><script type="text/javascript" src="/includes/download.js"></script></TMPL_UNLESS>	
