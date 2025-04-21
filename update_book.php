<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$book_id = $data['book_id'];
$title = $data['title'];
$genre = $data['genre'];
$year = $data['publication_year'];
$isbn = $data['isbn'];
$author_id = $data['author_id'];

$sql = "UPDATE Book 
        SET title = ?, genre = ?, publication_year = ?, isbn = ?, author_id = ?
        WHERE book_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$title, $genre, $year, $isbn, $author_id, $book_id]);

echo json_encode(["message" => "Book updated successfully"]);
?>
