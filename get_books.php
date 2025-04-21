<?php
require 'config.php';

$sql = "SELECT b.book_id, b.title, b.genre, b.publication_year, b.isbn, a.name AS author 
        FROM Book b 
        JOIN Author a ON b.author_id = a.author_id";
$stmt = $pdo->query($sql);
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($books);
?>
