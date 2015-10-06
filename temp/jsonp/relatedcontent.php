<?php

$callback = $_GET["callback"];
$response = $callback . '([null])';

echo $response;
?>