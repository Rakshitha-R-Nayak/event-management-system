document.getElementById("eventForm").addEventListener("submit", async function(event) {
    event.preventDefault();


    const organizerId = localStorage.getItem("userId");
    console.log("Organizer ID from localStorage:", organizerId);

    if (!organizerId) {
        alert("You must be logged in as an organizer to create an event!");
        window.location.href = "login.html"; // Redirect to login
        return;
    }

    const eventData = {
        name: document.getElementById("title").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value,
        location: document.getElementById("location").value,
        organizerId: localStorage.getItem("userId")
    };

    try {
        const response = await fetch("http://localhost:5000/api/events/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();
        document.getElementById("message").innerText = data.message;
    } catch (error) {
        console.error("Error:", error);
    }
});






document.getElementById("eventForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get the organizer ID from localStorage
    const organizerId = localStorage.getItem("userId");
    if (!organizerId) {
        alert("You must be logged in as an organizer to create an event!");
        window.location.href = "login.html";
        return;
    }

    // Get form data
    const eventData = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        date: document.getElementById("date").value,
        location: document.getElementById("location").value.trim(),
        organizerId: organizerId
    };

    console.log("📢 Event Data Being Sent:", eventData); // ✅ Debugging log

    try {
        const response = await fetch("http://localhost:5000/api/events/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();
        console.log("📢 Server Response:", data); // ✅ Debugging log

        if (response.ok) {
            alert("Event created successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Failed to create event!");
    }
});

function goBack() {
    window.location.href = "dashboard.html";
}

