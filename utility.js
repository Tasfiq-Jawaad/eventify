$(document).ready(function () {

    $("#getLocationButton").click(getUserLocation);

    $(".isFree").change(function () {
        if (this.checked) {
            $("#fee").val(0);
            $("#fee").prop("disabled", true);
        } else {
            $("#fee").prop("disabled", false);
        }
    });

    $(".isOnline").change(function () {
        if (this.checked) {
            $("#location").val("Online");
            $("#location").prop("disabled", true);
        } else {
            $("#location").prop("disabled", false);
        }
    });
});


const getUserLocation = () => {
    // Check if geolocation is supported by the browser
    $("#locationInput").append(`
    <div id='spinner' class="h-max w-full flex gap-2 overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
        width="24" height="24">
            <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
            </path>
            <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
            </path>
        </svg>
        <span>Geting location</span>
    </div>
  `)
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
            $("#spinner").remove();
        });
    } else {
        $("#spinner").remove();
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
            $("#spinner").remove();
            console.error('Error:', error);
        });
        
}

const displayFormattedAddress = (address) => {
    $(document).ready(function () {

        $("#location").val(address);
        $("#spinner").remove();
        displayAddressWarningMessage("Note: address might not be 100% accurate");
    });
}

const displayAddressWarningMessage = (message) => {
    $(document).ready(function () {

        $("#warningMessage").remove();
        $("#locationInput").append(`<div id="warningMessage">${message}</div>`)
    });
}

export const showToast = (message) => {
    $("#message").text(message);
    $("#toast").show();

    $("#closeToast").click(() => {
        $("#toast").hide();
    })
}

export default getUserLocation