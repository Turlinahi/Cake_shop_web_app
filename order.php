<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cakeType = $_POST['cakeType'];
    $cakeImage = '';
    $cakeText = '';

    // Determine the cake image and text based on the selected cake type
    switch ($cakeType) {
        case '25':
            $cakeImage = 'cake1.jpg';
            $cakeText = 'Chocolate Cake';
            break;
        case '24':
            $cakeImage = 'red.jpg';
            $cakeText = 'Red Velvet Cake';
            break;
        case '22':
            $cakeImage = 'carrot.jpg';
            $cakeText = 'Carrot Cake';
            break;
        case '26':
            $cakeImage = 'genoise.jpg';
            $cakeText = 'Genoise Cake';
            break;
        case '20':
            $cakeImage = 'angel.jpg';
            $cakeText = 'Angel Food Cake';
            break;
    }

    // Display the selected cake image and text
    echo '<h4>Your Order:</h4>';
    echo '<img src="' . $cakeImage . '" alt="' . $cakeText . '">';
    echo '<p>' . $cakeText . '</p>';
}
?>
