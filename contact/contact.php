<?php
header('Access-Control-Allow-Origin: http://jonathandallas.com');
header('Content-type: application/json');

if ($_POST && $_POST["recaptcha"] ) {
	// set response code - 200 OK
	http_response_code(200);

	$captcha = $_POST["recaptcha"];
	$secretKey = "6LeYf8sUAAAAAOE1tUUg4ciBb8f8q9OgJTa83bWb";
	$ip = $_SERVER['REMOTE_ADDR'];

  // post request to server
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $data = array('secret' => $secretKey, 'response' => $captcha);

  $options = array(
    'http' => array(
      'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
      'method'  => 'POST',
      'content' => http_build_query($data)
    )
  );
  $context  = stream_context_create($options);
  $response = file_get_contents($url, false, $context);

  $responseKeys = json_decode($response,true);

  if($responseKeys["success"]) {
		$subject = "Jonathan Dallas Enquiry Form";
		$to = "contact-form@jonathandallas.com";
		$from = "contact-form@jonathandallas.com";

		// data
		$msg = $_POST["name"] . " (" . $_POST["email"] . ") " . "\r\n" . $_POST["message"];

		// Headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";
		$headers.= "From: <" . $from . ">";
		mail($to, $subject, $msg, $headers);

		// echo json_response(200,'working');
		echo json_encode(["IsValid" => true]);
  } else {
		echo json_encode(["IsValid" => false, "Message" => "Bad Recaptcha"]);
  }
} else {

	// tell the user about error
	echo json_encode(["IsValid" => false, "Message" => "no form data"]);
}

?>
