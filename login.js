document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("member_id", data.member_id);
                localStorage.setItem("member_name", data.name);
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Login failed");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
