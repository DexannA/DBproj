document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("cpwd");
    const usernameInput = document.getElementById("username");
    const nameInput = document.getElementById("name");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Always prevent default form submission

        // Passwords must match
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match!");
            confirmPassword.focus();
            return;
        }

        // Password strength check
        if (password.value.length < 8) {
            alert("Password must be at least 8 characters long.");
            password.focus();
            return;
        }

        // Send signup data to server
        const data = {
            name: nameInput.value.trim(),
            username: usernameInput.value.trim(),
            password: password.value
        };

        fetch("signup.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else if (data.status === "taken") {
                alert("That UserID is already taken.");
                usernameInput.style.borderColor = "crimson";
            } else {
                alert(data.message || "Signup failed.");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("An error occurred. Please try again later.");
        });
    });

    // Password strength hint
    password.addEventListener("input", () => {
        password.style.borderColor = password.value.length < 8 ? "crimson" : "green";
    });

    // Check if username already exists when user finishes typing it
    usernameInput.addEventListener("blur", () => {
        const username = usernameInput.value.trim();

        if (!username) return;

        fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "taken") {
                alert("That UserID is already taken. Please choose another.");
                usernameInput.style.borderColor = "crimson";
            } else {
                usernameInput.style.borderColor = "green";
            }
        })
        .catch(error => console.error("Error:", error));
    });
});

