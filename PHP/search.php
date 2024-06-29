<?php

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["q"])) {
    $searchText = $_GET["q"];
    $url = "https://nominatim.openstreetmap.org/search?q=" . urlencode($searchText) . "&format=json&addressdetails=1&polygon_geojson=0";

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Content-Type: application/json"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "Error: " . $err;
    } else {
        echo $response;
    }
} else {
    echo "Invalid request.";
}

?>
