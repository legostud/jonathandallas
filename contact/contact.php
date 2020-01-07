<?php
header('Access-Control-Allow-Origin: http://jonathandallas.com');
header('Content-type: application/json');

if ($_POST && &_POST["recaptcha"] ) {
	// set response code - 200 OK
	http_response_code(200);

	$subject = "Jonathan Dallas Enquiry Form";
	$to = "contact-form@jonathandallas.com";
	$from = $_POST["email"];

	// data
	$msg = $_POST["name"] . "\r\n" . $_POST["message"];

	// Headers
	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: <" . $from . ">";
	mail($to, $subject, $msg, $headers);

	// echo json_response(200,'working');
	echo json_encode(["IsValid" => true]);

} else {

	// tell the user about error
	echo json_encode(["IsValid" => false, "Message" => "no form data"]);
}

?>
