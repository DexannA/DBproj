<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$genre = $data['genre'];
$year = $data['publication_year'];
$isbn = $data['isbn'];
$author_id = $data['author_id'];

$sql = "INSERT INTO Book (title, genre, publication_year, isbn, author_id)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$title, $genre, $year, $isbn, $author_id]);

echo json_encode(["message" => "Book added successfully"]);
?>
