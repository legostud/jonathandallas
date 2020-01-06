<?php
header('Access-Control-Allow-Origin: http://jonathandallas.com');
header('Content-type: application/json');

if ($_POST) {
	// set response code - 200 OK
	http_response_code(200);

	$subject = "Jonathan Dallas Enquiry Form";
	$to = "nospam@dallasdesigns.org";
	$from = "contact-form@jonathandallas.com";

	// data
	while (list($key,$val)=each($_POST))
	{
		$msg = $msg."$key : $val \n ";
	}

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
