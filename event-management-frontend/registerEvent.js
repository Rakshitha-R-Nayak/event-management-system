document.getElementById("eventRegisterForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value.trim();
    const eventId = document.getElementById("eventId").value.trim();

    if (!userId || !eventId) {
        document.getElementById("message").innerText = "Please enter both Event ID and User ID!";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message
            document.getElementById("message").innerText = data.message;

            // Redirect to another page after 2 seconds
            setTimeout(() => {
                window.location.href = "eventList.html"; // Change to the page you want
            }, 2000);
        } else {
            document.getElementById("message").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error registering!";
    }
});
