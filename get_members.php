<?php
require 'config.php';

$sql = "SELECT member_id, name, email FROM Member";
$stmt = $pdo->query($sql);
$members = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($members);
?>
