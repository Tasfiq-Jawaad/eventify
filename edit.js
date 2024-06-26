import { showToast } from "./utility.js";

$(document).ready(function () {
    let eventID = getQueryParam() || null;
    
    if(eventID)
     getEventDetails(eventID);
    else
    displayMessage("404! No such event found. Make sure the query parameter in the url is correct")

    $("#eventForm").submit(function (event) {
        event.preventDefault(); // Prevent page form reloading

        // Retrieve event data from local storage
        let eventData = localStorage.getItem("eventData");
        if (eventData) {
            // Parse event data
            eventData = JSON.parse(eventData);

            // Check if the index is within the array bounds
            if (eventID >= 0 && eventID < eventData.length) {
                // Update event details with form values
                eventData[eventID].title = event?.target.title?.value;
                eventData[eventID].host = event?.target?.host?.value;
                eventData[eventID].description = event?.target?.description?.value;
                eventData[eventID].location = event?.target?.isOnline?.checked ? "Online" : event?.target?.location?.value;
                eventData[eventID].thumbnailUrl = event?.target?.thumbnailUrl?.value;
                eventData[eventID].imageUrl = event?.target?.imageUrl?.value;
                eventData[eventID].date = event?.target?.date?.value;
                eventData[eventID].fee = event?.target?.isFree?.checked ? 0 : event?.target?.fee?.value;
                eventData[eventID].isFree = event?.target?.isFree?.checked;
                eventData[eventID].isOnline = event?.target?.isOnline?.checked;

                // Store updated event data back into local storage
                localStorage.setItem("eventData", JSON.stringify(eventData));

                showToast("Event details have been updated successfully!")
            } else {
                alert("Invalid event ID.");
            }
        } else {
            // Display message if there's no event data in local storage
            alert("No event details available.");
        }
    });
});

const getEventDetails = (eventID) => {
    // Retrieve event data from local storage
    let eventData = localStorage.getItem("eventData");
    if (eventData) {
        // Parse event data
        eventData = JSON.parse(eventData);

        // Check if the index is within the array bounds
        if (eventID >= 0 && eventID < eventData.length) {
            let event = eventData[eventID];
            // Display event details
            $("#title").val(event.title);
            $("#host").val(event.host);
            $("#description").val(event.description);
            $("#location").val(event.location).prop("disabled", event.isOnline);
            $("#thumbnailUrl").val(event.thumbnailUrl);
            $("#imageUrl").val(event.imageUrl);
            $("#date").val(event.date);
            $(".isOnline").prop("checked", event.isOnline);
            $("#fee").val(event.fee).prop("disabled", event.isFree);
            $(".isFree").prop("checked", event.isFree);

        } else {
            // Display message if id not found in local storage
            displayMessage("404 page not found. Make sure the query parameter in the url is correct");
        }
    } else {
        // Display message if there's no event data in local storage
        displayMessage("No saved events");
    }
}

const getQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

const displayMessage = (message) => {
    $("main").empty();
    $("main").append(`<p class="text-3xl text-red-500 font-black ms-8 mt-6 text-center">${message}</p>`);
}