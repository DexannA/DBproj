<?php
include 'config.php';

$memberId = $_GET['member_id'] ?? 0;

// 1. Get borrowed genres
$genresQuery = "
    SELECT DISTINCT b.genre
    FROM Borrow br
    JOIN Book b ON br.book_id = b.book_id
    WHERE br.member_id = ?
";
$stmt = $conn->prepare($genresQuery);
$stmt->bind_param("i", $memberId);
$stmt->execute();
$result = $stmt->get_result();

$genres = [];
while ($row = $result->fetch_assoc()) {
    $genres[] = $row['genre'];
}
$stmt->close();

if (count($genres) === 0) {
    echo json_encode([]);
    exit;
}

// 2. Find books from those genres not already borrowed
$placeholders = implode(',', array_fill(0, count($genres), '?'));
$params = array_merge($genres, [$memberId]);

$sql = "
    SELECT * FROM Book 
    WHERE genre IN ($placeholders)
    AND book_id NOT IN (
        SELECT book_id FROM Borrow WHERE member_id = ?
    )
";

$stmt = $conn->prepare($sql);

// Dynamically bind params
$types = str_repeat('s', count($genres)) . 'i';
$stmt->bind_param($types, ...$params);
$stmt->execute();

$result = $stmt->get_result();
$books = [];

while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books);
?>
