<?php

if (!isset($_GET['lat']) || !isset($_GET['lon'])) {
    http_response_code(400);
    echo json_encode(array("error" => "Latitude and longitude parameters are required"));
    exit();
}

$lat = $_GET['lat'];
$lon = $_GET['lon'];

$username = "atiq717";

$url = "http://api.geonames.org/countryCodeJSON?lat=$lat&lng=$lon&username=$username";

$response = file_get_contents($url);

if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(array("error" => "Failed to fetch data from Geonames API"));
    exit();
}

$data = json_decode($response, true);

if (!$data) {
    http_response_code(500);
    echo json_encode(array("error" => "Failed to decode JSON data"));
    exit();
}

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($data);
?>
