<?php

$searchText = $_GET['searchText'];
$baseUrl = 'https://nominatim.openstreetmap.org/search?';

$params = array(
    'q' => $searchText,
    'format' => 'json',
    'addressdetails' => 1,
    'polygon_geojson' => 0
);

$queryString = http_build_query($params);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . $queryString);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if(curl_errno($ch)){
    $error = 'Curl error: ' . curl_error($ch);
    echo json_encode(array('error' => $error));
} else {
    $json = json_decode($response);
    if ($json === null && json_last_error() !== JSON_ERROR_NONE) {
        $error = 'Invalid JSON response from Nominatim API';
        echo json_encode(array('error' => $error));
    } else {
        echo $response;
    }
}

curl_close($ch);

?>
