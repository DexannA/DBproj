<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$book_id = $data['book_id'];

$sql = "DELETE FROM Book WHERE book_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$book_id]);

echo json_encode(["message" => "Book deleted successfully"]);
?>
