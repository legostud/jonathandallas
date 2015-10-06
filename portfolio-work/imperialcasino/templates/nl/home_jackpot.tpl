<a href="/nl/about/jackpot.html">Totaal in Jackpots:
<span id="div_total"><noscript><TMPL_VAR DEFAULT_TOTAL></noscript></span></a>

<script>
var counter = new Counter("Updaten...", "<TMPL_VAR DECIMAL_POINT>", "<TMPL_VAR THOUSANDS_SEP>", "<TMPL_VAR CURRENCY_POSITION>");
counter.onlyDisplay("total");
initializeJP("/Jackpots/jackpots.rss");
</script>