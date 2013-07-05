<?php
//loads opens an XML file
include ('openXML.php');
//connect to the XML document
$officesXML = openXML('office.xml')->office;
$locationsXML = openXML('locations.xml')->location;

//find the office number requested
if( isset($_GET['office']) && $_GET['office'] > 0) {
	//$jsonArray = json_decode($_POST['obj']);
	$office_request = (int)trim(strip_tags($_GET['office']));
}
else {
	$jsonArray = array ();
	for($i = 0; $i < count($officesXML); $i++){
		$office = $officesXML[$i]->office_number;
		$name = $officesXML[$i]->name;
		$title = $officesXML[$i]->title; 
		$email = $officesXML[$i]->email; 
		$phone = $officesXML[$i]->phone;
		$category = $officesXML[$i]->category;
		$officeArray = array (
			"office" => "$office",
			"name" => "$name",
			"title" => "$title", 
			"email" => "$email", 
			"phone" => "$phone",
			"category" => "$category"
		);
		$jsonArray[$i] = $officeArray;
	}
	$jsonObj = json_encode($jsonArray);
	echo $jsonObj;	
	return;
}

//find the office in the XML
$officeIndex = 0;
foreach ($officesXML as $officeXML){
	if($officeXML->office_number == $office_request) { break; }
	GLOBAL $officeIndex;
	$officeIndex++;
}
$locationIndex = 0;
foreach ($locationsXML as $locationXML){
	if($locationXML->office_number == $office_request) { break; }
	GLOBAL $locationIndex;
	$locationIndex++;
}

//determine if we need to write data to the office XML
if (count($_GET) > 1) {
	//write the new data to the XML file
	foreach ($_GET as $key => $value) {
		echo "Key: $key Val: $value<br>";
	}
}
$office = $officesXML[$officeIndex]->office_number;
$name = $officesXML[$officeIndex]->name;
$title = $officesXML[$officeIndex]->title; 
$email = $officesXML[$officeIndex]->email; 
$phone = $officesXML[$officeIndex]->phone;
$category = $officesXML[$officeIndex]->category;
$x = $locationsXML[$locationIndex]->x;
$y = $locationsXML[$locationIndex]->y;

//return the office data
$jsonArray = array ( 
	"office" => "$office",
	"name" => "$name",
	"title" => "$title", 
	"email" => "$email", 
	"phone" => "$phone",
	"category" => "$category",
	"x" => "$x",
	"y" => "$y"
);

$jsonObj = json_encode($jsonArray);

echo $jsonObj;

?>