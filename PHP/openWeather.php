<?php

$latitude = $_GET['latitude'] ?? null;
$longitude = $_GET['longitude'] ?? null;

if ($latitude === null || $longitude === null) {
    $response = array(
        "error" => "Latitude or longitude is missing"
    );
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
    exit; 
}

$openWeatherMapBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
$apiKey = 'ba25737d28fb44864b28d72afdc6adef';
$params = http_build_query([
    'lat' => $latitude,
    'lon' => $longitude,
    'appid' => $apiKey
]);

$url = $openWeatherMapBaseUrl . '?' . $params;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    $response = array(
        "error" => "Failed to fetch weather data from the API"
    );
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
    exit; 
}

$decoded = json_decode($response, true);

if ($decoded === null) {
    $response = array(
        "error" => "Failed to decode JSON response from the API"
    );
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
    exit; 
}

$response = array(
    "coord" => $decoded['coord'] ?? null,
    "weather" => isset($decoded['weather'][0]) ? $decoded['weather'][0] : null,
    "main" => $decoded['main'] ?? null,
    "visibility" => $decoded['visibility'] ?? null,
    "wind" => $decoded['wind'] ?? null,
    "clouds" => $decoded['clouds'] ?? null,
    "sys" => $decoded['sys'] ?? null,
    "timezone" => $decoded['timezone'] ?? null,
    "id" => $decoded['id'] ?? null,
    "name" => $decoded['name'] ?? null,
    "cod" => $decoded['cod'] ?? null
);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

?>
