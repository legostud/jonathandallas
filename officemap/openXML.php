<?php
//Load an xml file from the includes folder and return the object
function openXML($file)
{
	//load the Albums.xml file to get the categories
	$xmlFile = "$file";
	if (file_exists($xmlFile)) {
   		$xml = simplexml_load_file($xmlFile);
	}
	//if the file is not found
	else {
   		exit("Failed to open $file.");
	}
	//return the XML code
	return $xml;
}
?>
