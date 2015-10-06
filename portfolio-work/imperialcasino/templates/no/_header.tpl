<div id="header_content">
    <div id="header_logo">
        <!-- Home page Link -->
        <div id="home_page_link"><h1><a href="/no/">Online kasino</a></h1></div>
        <!-- Language Selector -->
        <div id="language_selector">
        	Velg Språk:<br />
            <script type="text/javascript" src="/includes/language-navigation.js" charset="UTF-8"></script>
        </div>
    </div>    
    <!-- Top Navigation -->
	<TMPL_VAR NAME="HEADER">
</div>    
<div id="document_content">    
    <!-- Top Banner -->
    <!-- Download Page has a different banner -->
    <div id="banner_graphic_generic">
        <TMPL_UNLESS GEOIP_NO_DLOAD>
        <div id="banner_button_wrapper">
            <div id="banner_button_left">&nbsp;</div>
            <div id="banner_button_middle">
                <a href="/no/dload/">Spill nå</a>
            </div>
            <div id="banner_button_right">&nbsp;</div>
        </div>
        </TMPL_UNLESS>
    </div> 
<!-- continues until _footer.tpl -->