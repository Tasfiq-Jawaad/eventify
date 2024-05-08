import { getAddress } from "./utility.js";

$(document).ready(function () {

    $("#getLocationButton").click(getUserLocation);
});


function getUserLocation() {
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