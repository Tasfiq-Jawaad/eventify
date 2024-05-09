$(document).ready(function () {

    $("#getLocationButton").click(getUserLocation);

    $("#eventForm").submit(function (event) {
        event.preventDefault(); // Prevent page reloading

        const existingData = localStorage.getItem("eventData");
        const eventDataArray = existingData ? JSON.parse(existingData) : [];

        // Get form data
        const formData = {
            title: $("#title").val(),
            host: $("#host").val(),
            description: $("#description").val(),
            location: $("#isOnline").prop("checked") ? "Online" : $("#location").val(),
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


const getUserLocation = () => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(async function (position) {
            // Access the latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude: " + latitude + ", Longitude: " + longitude);

            getAddress(latitude, longitude);

        }, function (error) {
            // Handle errors
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("An unknown error occurred.");
                    break;
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

const getAddress = (lat, lng) => {

    // fetch the formatted address
    fetch(`https://nodejs-serverless-function-express-liard-iota-73.vercel.app/get-address?lat=${lat}&lng=${lng}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            return response.json();
        })
        .then(data => {

            console.log('Formatted address:', data?.results[0]?.formatted_address);

            // display the formatted address
            data?.results[0]?.formatted_address ?
                displayFormattedAddress(data?.results[0]?.formatted_address)
                :
                displayAddressWarningMessage("Can not access the location")
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const displayFormattedAddress = (address) => {
    $(document).ready(function () {

        $("#location").val(address);
        displayAddressWarningMessage("Note: address might not be 100% accurate");
    });
}

const displayAddressWarningMessage = (message) => {
    $(document).ready(function () {

        $("#warningMessage").remove();
        $("#locationInput").append(`<div id="warningMessage">${message}</div>`)
    });
}


$(document).ready(function () {
    $("#isFree").change(function () {
        if (this.checked) {
            $("#fee").val(0);
            $("#fee").prop("disabled", true);
        } else {
            $("#fee").prop("disabled", false);
        }
    });

    $("#isOnline").change(function () {
        if (this.checked) {
            $("#location").val("Online");
            $("#location").prop("disabled", true);
        } else {
            $("#location").prop("disabled", false);
        }
    });
});