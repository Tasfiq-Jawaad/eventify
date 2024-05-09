$(document).ready(function () {
    let eventID = getQueryParam() || null;

    getEventDetails(eventID);
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
            $("#isOnline").prop("checked", event.isOnline);
            $("#fee").val(event.fee).prop("disabled", event.isFree);
            $("#isFree").prop("checked", event.isFree);

            console.log(event)
        } else {
            // Display message if id not found in local storage
            $("#formContainer").empty();
            $("#formContainer").append("404 page not found");
        }
    } else {
        // Display message if there's no event data in local storage
        $("#formContainer").empty();
        $("#formContainer").append("404 page not found");
    }
}

const getQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}