export function getAddress(lat, lng) {

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

export function displayFormattedAddress(address) {
  $(document).ready(function () {

    $("#location").val(address);
    displayAddressWarningMessage("Note: address might not be 100% accurate");
  });
}

export function displayAddressWarningMessage(message) {
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
      $("#fee").val("Online");
      $("#location").prop("disabled", true);
    } else {
      $("#location").prop("disabled", false);
    }
  });
});