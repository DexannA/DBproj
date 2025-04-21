<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$sql = "INSERT INTO Member (name, email, password) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, $password]);

echo json_encode(["message" => "Member registered successfully"]);
?>
