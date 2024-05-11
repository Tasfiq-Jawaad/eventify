$(document).ready(function () {

    $("#eventForm").submit(function (event) {
        event.preventDefault(); // Prevent page reloading

        const existingData = localStorage.getItem("eventData");
        const eventDataArray = existingData ? JSON.parse(existingData) : [];

        console.log(event.target.date.value)

        // Get form data
        const formData = {
            title: $("#title").val(),
            host: $("#host").val(),
            description: $("#description").val(),
            location: $("#isOnline").prop("checked") ? "Online" : $("#location").val(),
            date: $("#date").val(),
            thumbnailUrl: $("#thumbnailUrl").val(),
            imageUrl: $("#imageUrl").val(),
            fee: $("#isFree").prop("checked") ? 0 : $("#fee").val(),
            isFree: $("#isFree").prop("checked"),
            isOnline: $("#isOnline").prop("checked")
        };

        console.log("Form data", formData)

        eventDataArray.push(formData);

        // Store updated data in local storage
        localStorage.setItem("eventData", JSON.stringify(eventDataArray));

        alert("Event data has been stored in local storage!");
    });
});