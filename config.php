<?php
$host = "127.0.0.1:3306";
$db = "LibraryManagement";
$user = "root"; // your MySQL username
$pass = "";     // your MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
