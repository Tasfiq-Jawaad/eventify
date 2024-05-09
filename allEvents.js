const getAllEvents = async () => {
    try {
        const events = await fetchAllEvents();
        displayEventDetails(events);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}


const displayEventDetails = (events) => {
    $("#message").remove(); //removing any messages set while fetching saved events from local host
    if (events) {
        // Display event details as list items
        let eventList = $("<ul>");
        events.forEach(function (event, index) {
            const shortDescription = event.description.split(" ").slice(0, 50).join(" ");
            const formattedDescription = shortDescription.length < event.description.length ? shortDescription + "..." : shortDescription;
            const listItem = $("<li>").append(`
            <div>
                <h2>${event.title}</h2>
                <h3>${event.host}</h3>
                <p>${formattedDescription}</p>
                <p>${event.isFree ? "No entry fee required" : event.fee}</p>
                <p>${event.isOnline ? "Online event" : event.location}</p>
                <a href="/event-details.html?id=${index}"><button>View details</button></a>
            </div>
            `);
            eventList.append(listItem);
        });

        // Append event list to the container
        $("#eventsContainer").append(eventList);
    } else {
        // Display message if there's no event data in local storage
        $("#eventsContainer").append(`<p id="message">No saved events</p>`);
    }
}

const fetchAllEvents = async () => {
    try {
        const response = await fetch("https://nodejs-serverless-function-express-liard-iota-73.vercel.app/events");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching events:", error);
    }
}

$(document).ready(getAllEvents());
