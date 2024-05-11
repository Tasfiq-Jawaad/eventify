$(document).ready(function () {
    let eventID = getLocalID() || null;
    let event = null;
    if (eventID)
        event = getLocalEventDetails(eventID) || null;

    if (event && eventID) {
        displayEventDetails(event);
    }
    else if(eventID) {
        displayMessage("No such event found. Make sure the query parameter in the url is correct");
    }


    if (eventID === null) {
        eventID = getServerID() || null;
        if (eventID)
            getServerEventDetails(eventID)
    }

    

});

const getLocalEventDetails = (eventID) => {
    // Retrieve event data from local storage
    let eventData = localStorage.getItem("eventData");
    if (eventData) {
        // Parse event data
        eventData = JSON.parse(eventData);

        // Check if the index is within the array bounds
        if (eventID >= 0 && eventID < eventData.length) {
            let event = eventData[eventID];
            return event;
        }
    }
}

const getServerEventDetails = async (eventID) => {
    try {
        const response = await fetch(`https://nodejs-serverless-function-express-liard-iota-73.vercel.app/events/${eventID}`);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        displayEventDetails(data);
    } catch (error) {
        displayMessage("No such event found. Make sure the query parameter in the url is correct");
        throw new Error("Error fetching events:", error);
    }
}

const displayEventDetails = (event) => {
    if(event.thumbnailUrl && event.imageUrl){
        $("#image").prop("srcset", `${event.thumbnailUrl} 312w, ${event.imageUrl} 450w`)
    }
    else{
        $("#image").prop("src", `${event.imageUrl? event.imageUrl : 'assets/Placeholder-_-Glossary.svg'}`)
    }
    $("#title").text(event.title);
    $("#host").text(event.host);
    $("#description").text(event.description);
    $("#location").text(`Location: ${event.location}`);
    $("#date").text(`Date: ${event.date}`);
    $("#fee").text(`Entry fee: ${event.fee}`);
}

const getLocalID = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("local");
}

const getServerID = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

const displayMessage = (message) => {
    $("#eventDetails").empty();
    $("#eventDetails").append(`<p>${message}</p>`);
}