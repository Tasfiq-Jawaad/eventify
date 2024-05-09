$(document).ready(function(){
    displayEventDetails();
});

const displayEventDetails = () => {
    // Retrieve event data from local storage
    let eventData = localStorage.getItem("eventData");
    if(eventData) {
        // Parse event data
        eventData = JSON.parse(eventData);

        // Display event details as list items
        let eventList = $("<ul>");
        eventData.forEach(function(event, index) {
            const listItem = $("<li>").append(`
            <div>
                <h2>${event.title}</h2>
                <h3>${event.host}</h3>
                <p>${event.description}</p>
                <p>${event.isFree? "No entry fee required": event.fee}</p>
                <p>${event.isOnline? "Online event": event.location}</p>
                <a href="/event-details.html?local=${index}"><button>View details</button></a>
                <a href="/edit-my-event.html?id=${index}"><button>Edit</button></a>
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