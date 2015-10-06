<!-- Begin Top Banner -->
<div id="banner_graphic_dload" class="top_banner">
 <TMPL_UNLESS GEOIP_NO_DLOAD>
    <div id="banner_button_wrapper"><!-- Begin button -->
        <div id="banner_button_left"></div>
        <div id="banner_button_middle">
            <a href="<TMPL_VAR CUSTOM_SERVER><TMPL_VAR ADV>/<TMPL_VAR URL_NAME><TMPL_VAR DLOAD_ARGS>" <TMPL_IF LANGUAGE_FR>style="font-size:25px;"</TMPL_IF> >
                Download Agora
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
            <h2>O acesso ao nosso casino online não está disponível na sua região.</h2>
            <p>Lamentamos o sucedido e pedimos desculpa. No entanto, pode continuar a jogar na sala de poker online francesa original. Aprenda gratuitamente a jogar poker com o <a href="http://www.everestpoker.com/fr/?imid=470" target="_blank" class="cssBodyLink">Everest Poker!</a></p>
            <p>Para esclarecer qualquer dúvida que possa ter, por favor, contacte a nossa equipe de <a href="/pt/support/" class="cssBodyLink">Suporte ao Jogador</a>.</p>
        </div>
    <TMPL_ELSE>
    <!-- Bonus Offer -->
        <div id="download_offer">
            <div id="download_offer_top">
                <h2>$200 Oferta GRÁTIS</h2>
                <p>Depois de instalar o software, registe-se simplesmente, faça o seu primeiro depósito de pelo menos $200 e iremos adicionar $200 em fichas de bónus à sua conta de jogador.</p>
            </div>
            <div id="download_offer_bottom">Esta é a nossa forma de dizer obrigado por experimentar o <span class="cssBodyBold">Imperial Casino!</span></div>
        </div>
        <!-- Download Instructions -->
        <div id="download_instructions">
            <h2>Instruções para o Download</h2>
            <ul class="download">
                <span id="ffInstructions">
                    <li>Seleccione 'Salvar Ficheiro'</li>
                    <li>Localize o ficheiro no seu computador e faça-o correr.</li>
                </span>
                <span id="ieInstructions">
                    <li>Seleccione 'Run' ou 'Salvar'</li>
                    <li>Se escolheu salvar, localize o ficheiro no seu computador faça duplo clique para o lançar.</li>
                </span>
                <li>Seleccione a sua língua e aguarde relaxadamente enquanto o software se instala automaticamente.</li>
                <li>Dentro de alguns minutos, o software de casino irá abrir-se automaticamente.</li>
                <li>Clique 'Inscreva-se Agora' para receber as suas fichas de bónus GRÁTIS.</li>
            </ul>
        </div>
        <!-- Message -->
        <div id="download_message">
            O nosso software é seguro, comprovado e assinado digitalmente. Todas as transacções são codificadas usando criptografia e estritamente confidenciais. Esta combinação de um grande programa, total segurança e absoluta privacidade fazem do <TMPL_VAR CASINO_NAME> a melhor escolha para uma excitante experiência de jogo global.
        </div>
        </TMPL_IF>
    </div>
</div>    
<!-- download instructions -->
<TMPL_UNLESS GEOIP_NO_DLOAD><script type="text/javascript" src="/includes/download.js"></script></TMPL_UNLESS>	
