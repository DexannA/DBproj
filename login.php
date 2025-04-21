<?php
session_start();
$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

// Connect to DB
$conn = new mysqli("localhost", "root", "", "LibraryManagement");

// Check if user exists
$query = "SELECT ID, name FROM Member WHERE ID = ? AND password = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $username, $password); // assumes ID is numeric and password is stored in plain text
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $_SESSION["user_id"] = $row["ID"];
    $_SESSION["user_name"] = $row["name"];

    // Check if user is librarian too
    $checkLibrarian = $conn->prepare("SELECT * FROM Librarian WHERE ID = ?");
    $checkLibrarian->bind_param("i", $username);
    $checkLibrarian->execute();
    $isLibrarian = $checkLibrarian->get_result()->num_rows > 0;

    $_SESSION["is_librarian"] = $isLibrarian;
    echo json_encode([
        "success" => true,
        "member_id" => $member['member_id'],
        "name" => $member['name']
    ]);

    echo json_encode(["status" => "success", "redirect" => "dashboard.html"]);
} else {
    echo json_encode(["status" => "error"]);
}

$conn->close();
?>
