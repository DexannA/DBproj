<?php
header("Content-Type: application/json");

// Read the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input values
$name = trim($data["name"]);
$username = trim($data["username"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Always hash passwords!

// Database connection
$host = "localhost";
$db = "LibraryManagement";
$user = "root";
$pass = ""; // update this with your MySQL root password

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Check if username is already taken (assuming 'username' is stored in a separate login/auth table)
$stmt = $conn->prepare("SELECT ID FROM Member WHERE ID = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "taken"]);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Insert new member
$stmt = $conn->prepare("INSERT INTO Member (ID, name) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $name);

if ($stmt->execute()) {
    
    echo json_encode(["status" => "success", "redirect" => "dashboard.html"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to create account"]);
}

$stmt->close();
$conn->close();
?>
