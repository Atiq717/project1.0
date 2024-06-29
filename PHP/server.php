<?php

    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
    header('X-Content-Type-Options: nosniff');


    $input = $_POST['search'];

    if ($input){
        ini_set('display_errors', 'On');
        error_reporting(E_ALL);

        $executionStartTime = microtime(true);

        $url = "http://api.geonames.org/countryCodeJSON?lat=$input&username=atiq717";
        // $url = "http://api.geonames.org/countryCodeJSON?lat=$lat&lng=$long&username=atiq717";
        
        // Initialize cURL session
        $ch = curl_init();
        
        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        // Execute cURL request
        $result = curl_exec($ch);
        
        // Close cURL session
        curl_close($ch);

        $decode = json_decode($result, true);

        // $output['status']['code'] = '200';
        // $output['status']['name'] = 'ok';
        // $output['status']['description'] = 'success';
        // $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . 'ms';
        // $output['data'] = $decode;

        $response = array(
            "languages" => $decode['languages'],
            "distance" => $decode['distance'],
            "countryCode" => $decode['countryCode'],
            "countryName" => $decode['countryName']
        );

        // Return JSON response
        header('Content-Type: application/json; charset-UTF-8');
        echo json_encode($response);


    } else {
    // If request method is not POST, set error response
    $output['status']['code'] = '405';
    $output['status']['name'] = 'error';
    $output['status']['description'] = 'Method Not Allowed';
    $output['status']['returnedIn'] = '0ms'; // Placeholder for execution time
    
    header('Content-Type: application/json; charset-UTF-8');
    echo json_encode($output);

    }
    ?>