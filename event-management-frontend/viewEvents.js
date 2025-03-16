async function fetchEventsByLocation() {
    const location = document.getElementById("locationInput").value.trim();

    if (!location) {
        alert("Please enter a location.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/events/location/${location}`);
        const events = await response.json();

        const eventList = document.getElementById("eventList");
        eventList.innerHTML = ""; // Clear previous results

        if (events.length === 0) {
            eventList.innerHTML = "<p>No events found in this location.</p>";
            return;
        }
        localStorage.setItem("eventsData", JSON.stringify(events));

        // ✅ Redirect to `eventsList.html`
        window.location.href = "eventsList.html";
        
        
    } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events.");
    }
}

// ✅ Function to go back to dashboard
function goBack() {
    window.location.href = "dashboard.html";
}
