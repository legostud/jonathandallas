<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css" media="screen">
		.original {
			clear:left;
			float:left;
			padding:10px;
			border: thin sold black;
		}
		.translated {
			clear:right;
			float:left;
			padding:10px;
			border: thin sold black;
			background-color:#AAAAAA;
		}
	</style>
	<script type="text/javascript" src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">
    
    google.load("language", "1");
    
    function translate() {
      var text = document.getElementById("original3").innerHTML;
      google.language.detect(text, function(result) {
        if (!result.error && result.language) {
          google.language.translate(text, result.language, "en",
                                    function(result) {
            var translated = document.getElementById("translated3");
            if (result.translation) {
              translated.innerHTML = result.translation;
            }
          });
        }
      });
    }
    google.setOnLoadCallback(initialize);
    
    </script>
</head>
<body>

	<?php 
    $file = fopen("GoogleDataTest.txt","r")or exit("Unable to open file!");
    
    //while(!feof($file)) {
    for($i=0;$i<8;$i++) {
        $message = utf8_encode(fgetss($file));
        $message = ereg_replace("/\n\r|\r\n|\n|\r/", "", $message);
        $message = preg_replace("/\t/", "", $message);
        echo "<div class=\"original\" id=\"original".$i."\">" . $message . "</div>";
        echo "<div class=\"translated\" id=\"translated".$i."\"> </div>";
    }
    echo "<script language=\"javascript\">translate();</script>";
    
    $file = fclose($file);
    ?>

	</body>
</html>
