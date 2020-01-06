<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<?php 
  $login = "legostud:cidc123";  
   
  $tweets = "http://twitter.com/statuses/friends_timeline.xml?count=5";  
    
  $tw = curl_init();  
    
  curl_setopt($tw, CURLOPT_URL, $tweets);  
    
  curl_setopt($tw, CURLOPT_USERPWD, $login);  
    
  curl_setopt($tw, CURLOPT_RETURNTRANSFER, TRUE);  
    
  $twi = curl_exec($tw);  
    
  $tweeters = new SimpleXMLElement($twi);  
    
  $latesttweets = count($tweeters);  
    
  if ($latesttweets>2) {  
     
      echo "<h3>".$latesttweets." latest tweets from the users I follow | <a href=\"http://www.twitter.com/ashleyford\">Follow Me!</a></h3>";  
    
      }  
    
  ## Printing/Dumping the data  
     
  foreach ($tweeters->status as $twit1) {  
    
  $description = $twit1->text;  
    
  $description = preg_replace("#(^|[\n ])@([^ \"\t\n\r<]*)#ise", "'\\1<a href=\"http://www.twitter.com/\\2\" >@\\2</a>'", $description);  
  $description = preg_replace("#(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t<]*)#ise", "'\\1<a href=\"\\2\" >\\2</a>'", $description);  
  $description = preg_replace("#(^|[\n ])((www|ftp)\.[^ \"\t\n\r<]*)#ise", "'\\1<a href=\"http://\\2\" >\\2</a>'", $description);  
    
  echo "<div class='user'><a href=\"http://www.twitter.com/", $twit1->user->screen_name,"\" target=\"_blank\"><img border=\"0\" class=\"twitter_followers\" src=\"", $twit1->user->profile_image_url, "\" title=\"", $twit1->name, "\" /></a>\n";  
  echo "<div class='name'>", $twit1->user->name,"</div>";  
  echo "<div class='followers'>", $twit1->user->location,"</div>";  
  echo "<div class='location'>", $twit1->user->url,"</div>";  
  echo "<div class='text'>".$description."<div class='description'>From ", $twit1->source,"</div></div></div>";}  
     
  curl_close($tw);  
?>
</body>
</html>
