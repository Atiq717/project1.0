<?php

$lat = $_GET['lat'];
$lng = $_GET['lng'];
$username = 'atiq717';
$baseUrl = 'http://api.geonames.org/countryCodeJSON';

$url = "$baseUrl?lat=$lat&lng=$lng&username=$username";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if(curl_errno($ch)){
    $error = 'Curl error: ' . curl_error($ch);
    echo json_encode(array('error' => $error));
} else {
    $json = json_decode($response);
    if ($json === null && json_last_error() !== JSON_ERROR_NONE) {
        $error = 'Invalid JSON response from GeoNames API';
        echo json_encode(array('error' => $error));
    } else {
        echo $response;
    }
}

curl_close($ch);

?>
