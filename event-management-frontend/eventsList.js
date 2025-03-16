document.addEventListener("DOMContentLoaded", () => {
    const eventsData = JSON.parse(localStorage.getItem("eventsData"));

    if (!eventsData || eventsData.length === 0) {
        document.getElementById("eventsContainer").innerHTML = "<p>No events available.</p>";
        return;
    }

    const eventsContainer = document.getElementById("eventsContainer");
    
    eventsData.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        `;

        eventsContainer.appendChild(eventCard);
    });
});

// ✅ Function to go back to the View Events page
function goBack() {
    window.location.href = "viewEvents.html";
}
