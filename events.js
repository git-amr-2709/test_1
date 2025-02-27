const eventList = document.getElementById("eventList");

function getEvents() {
    return JSON.parse(localStorage.getItem("events")) || [];
}

function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}

function hostEvent() {
    const hostName = document.getElementById("hostName").value.trim();
    const eventTitle = document.getElementById("eventTitle").value.trim();
    const eventTopic = document.getElementById("eventTopic").value.trim();
    const eventDate = document.getElementById("eventDate").value.trim();
    const eventTime = document.getElementById("eventTime").value.trim();
    const eventLink = document.getElementById("eventLink").value.trim();

    if (!hostName || !eventTitle || !eventTopic || !eventDate || !eventTime || !eventLink) {
        alert("Please fill in all fields!");
        return;
    }

    const newEvent = {
        hostName,
        eventTitle,
        eventTopic,
        eventDate,
        eventTime,
        eventLink
    };

    let events = getEvents();
    events.push(newEvent);
    saveEvents(events);

    alert("Event created successfully!");
    
    // Clear inputs
    document.getElementById("hostName").value = "";
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventTopic").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";
    document.getElementById("eventLink").value = "";
}

// Render Events on Attend Page
if (eventList) {
    function renderEvents() {
        const events = getEvents();
        eventList.innerHTML = "";

        if (events.length === 0) {
            eventList.innerHTML = `<p class="text-gray-400">No events available.</p>`;
            return;
        }

        events.forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("bg-gray-700", "p-4", "rounded", "mb-4");

            eventElement.innerHTML = `
                <h3 class="text-lg font-bold">${event.eventTitle}</h3>
                <p><strong>Host:</strong> ${event.hostName}</p>
                <p><strong>Topic:</strong> ${event.eventTopic}</p>
                <p><strong>Date:</strong> ${event.eventDate}</p>
                <p><strong>Time:</strong> ${event.eventTime}</p>
                <a href="${event.eventLink}" target="_blank" class="bg-green-600 px-4 py-2 mt-2 inline-block rounded">Join Now</a>
            `;

            eventList.appendChild(eventElement);
        });
    }

    renderEvents();
}
