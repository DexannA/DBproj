<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$member_id = $data['member_id'];
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$sql = "UPDATE Member SET name = ?, email = ?, password = ? WHERE member_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, $password, $member_id]);

echo json_encode(["message" => "Member updated successfully"]);
?>
