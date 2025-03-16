document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const loginData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim()
    };

    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText = data.message;

            // Store userId in localStorage
            localStorage.setItem("userId", data.userId);

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Change to your main user page
            }, 2000);
        } else {
            document.getElementById("message").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error logging in!";
    }
});
function goBack() {
    window.location.href = "dashboard.html";
}
