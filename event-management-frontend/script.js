document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        role: document.getElementById("role").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register user!");
    }
});
function openLoginPage() {
    window.location.href = "login.html"; // Redirects to login page
}

