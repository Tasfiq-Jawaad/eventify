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

        // return the first formatted address
        return data?.results[0]?.formatted_address
      })
      .catch(error => {
        console.error('Error:', error);
      });
}