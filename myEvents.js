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
                <p>${event.description}</p>
                <p>${event.isFree? "No entry fee required": event.fee}</p>
                <p>${event.isOnline? "Online event": event.location}</p>
            </div>
            `);
            eventList.append(listItem);
        });

        // Append event list to the container
        $("#myEventsContainer").append(eventList);
    } else {
        // Display message if there's no event data in local storage
        $("#myEventsContainer").append("<p>No saved events</p>");
    }
}