<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$member_id = $data['member_id'];

$sql = "DELETE FROM Member WHERE member_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$member_id]);

echo json_encode(["message" => "Member deleted successfully"]);
?>
