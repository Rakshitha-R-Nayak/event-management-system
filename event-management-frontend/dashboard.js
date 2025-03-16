document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You must log in first!");
        window.location.href = "login.html";  // Redirect to login if not logged in
        return;
    }

    try {
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await userResponse.json();

        if (userResponse.ok) {
            document.getElementById("userName").innerText = userData.name;
            document.getElementById("userEmail").innerText = userData.email;
            document.getElementById("userRole").innerText = userData.role;
        } else {
            alert("Error fetching user details: " + userData.message);
        }

        // Fetch registered events
        const eventResponse = await fetch(`http://localhost:5000/api/users/${userId}/events`);
        const events = await eventResponse.json();

        if (eventResponse.ok) {
            const eventList = document.getElementById("eventList");
            events.forEach(event => {
                const li = document.createElement("li");
                li.innerText = `${event.name} - ${event.date}`;
                eventList.appendChild(li);
            });
        } else {
            alert("Error fetching events: " + events.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Do you like to continue");
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You must log in first!");
        window.location.href = "login.html"; // Redirect to login if not logged in
        return;
    }

    try {
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await userResponse.json();

        if (userResponse.ok) {
            document.getElementById("userName").innerText = userData.name;
            document.getElementById("userEmail").innerText = userData.email;
            document.getElementById("userRole").innerText = userData.role;

            // ✅ Show "Create Event" button if user is an organizer
            if (userData.role === "organizer") {
                document.getElementById("createEventBtn").style.display = "block";
            }
        } else {
            alert("Error fetching user details: " + userData.message);
        }
        if (userData.role === "attendee") {
            document.getElementById("viewEventsBtn").style.display = "block";
        }
     else {
        alert("Error fetching user details: " + userData.message);
    }

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load dashboard!");
    }
});

// ✅ Function to redirect to createEvent page
function openCreateEventPage() {
    window.location.href = "createEvent.html"; // Redirects to createEvent page
}

function openViewEventsPage() {
    window.location.href = "viewEvents.html";
}

// ✅ Logout function
function logout() {
    localStorage.removeItem("userId"); // Clear user session
    window.location.href = "login.html"; // Redirect to login
}

