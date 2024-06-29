<?php

$query = $_GET['country'];
$apiKey = '05beac2d1f7a4d3fa05a988c241230a1';

$url = "https://newsapi.org/v2/everything?q=$query&sortBy=publishedAt&apiKey=$apiKey";
// https://newsapi.org/v2/everything?q=tesla&from=2024-04-16&sortBy=publishedAt&apiKey=API_KEY

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
        $error = 'Invalid JSON response from News API';
        echo json_encode(array('error' => $error));
    } else {
        echo $response;
    }
}

curl_close($ch);

?>
