

<?php

    $id = $_GET['id'];
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');

    sleep(3);
    echo "data: 111\n\n";
    flush();

?>