<?php
include 'config.php';

// Fetch transaction records (joining with Book and Member tables)
$query = "SELECT t.borrow_id, b.title, m.name AS member_name, t.borrow_date, t.return_date
          FROM Borrow t
          JOIN Book b ON t.book_id = b.book_id
          JOIN Member m ON t.member_id = m.member_id";

$result = $conn->query($query);

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);
?>
