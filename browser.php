<?php

    error_reporting(0);
    ini_set('display_errors', 0);

    require_once('resources/HZip.php');
    require_once('resources/ClassOS.php');
    require_once('resources/FileSize32bit.php');

    define('BASE', 'http://' . $_SERVER['SERVER_NAME'] . ($_SERVER["SERVER_PORT"]!=80?':'.$_SERVER["SERVER_PORT"]:'') . str_replace(basename($_SERVER["SCRIPT_FILENAME"]), '', $_SERVER['PHP_SELF']));

    // Include the DirectoryLister class
    require_once('resources/DirectoryLister.php');

    // Initialize the DirectoryLister object
    $lister = new DirectoryLister();

    // Restrict access to current directory
    ini_set('open_basedir', getcwd());

    // Return file hash
    if (isset($_GET['hash'])) {

        header('Content-Type: application/json');

        // Get file hash array and JSON encode it
        $hashes = $lister->getFileHash(utf8_decode($_GET['hash']));

        $data   = json_encode($hashes);

        // Return the data
        die($data);

    }

    if (isset($_GET['zip'])) {

        $dirArray = $lister->zipDirectory($_GET['zip']);

    } elseif (isset($_GET['dir'])) {
        header('Content-Type: application/json');

        // Initialize the directory array
        $dirArray = $lister->listDirectory($_GET['dir']);
        //$json = array('messages' => array('type' => null, 'text' => null));
        $json = array('messages' => array());

        foreach($dirArray as $name => $fileInfo):
            foreach($fileInfo as $key => $value){
                if ($key === 'is_file')
                    $json['directory'][utf8_encode($name)][$key] = $value;
                else
                    $json['directory'][utf8_encode($name)][$key] = utf8_encode($value);
            }
        endforeach;

        if($lister->getSystemMessages())
            foreach ($lister->getSystemMessages() as $message) {
                $json['messages'][] = $message;
            }

        exit(json_encode($json, JSON_PRETTY_PRINT));
    } else {
        // Define theme path
        if (!defined('THEMEPATH')) define('THEMEPATH', BASE . $lister->getThemePath());
        if (!defined('ASSETSPATH')) define('ASSETSPATH', BASE . $lister->getAssetsPath());

        // Set path to theme index
        $themeIndex = $lister->getThemePath(true) . '/index.php';

        // Initialize the theme
        if (file_exists($themeIndex)) {
            include($themeIndex);
        } else {
            die('ERROR: Failed to initialize theme');
        }

    }

    function pre($arr, $exit = false, $line = false, $return = false) {
        $arr = ($line?$line . "\n":'') . '<pre>' . print_r($arr,1) . '</pre>';
        if ($return) return $arr;
        if ($exit) exit($arr);
        echo $arr;
    }