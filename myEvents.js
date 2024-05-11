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
        eventData.forEach(function(event, index) {
            const shortDescription = event.description.split(" ").slice(0, 20).join(" ");
            const formattedDescription = shortDescription.length < event.description.length ? shortDescription + "..." : shortDescription;
            $("#eventsContainer").children('ul:nth-child(1)').append(`
            <li>
            <div class="card relative flex flex-col md:flex-row items-center mt-6 text-white bg-white/30 backdrop-blur-md drop-shadow-2xl shadow-2xl bg-clip-border rounded-xl w-[312px] sm:w-[400px] md:w-[600px] h-full">
                <img src='${event.thumbnailUrl? event.thumbnailUrl : 'assets/Placeholder-_-Glossary.svg'}' alt="Thumbnail for ${event.title}" class="w-[288px] h-[288px] aspect-square rounded-xl mt-6 md:ms-6"/>
                <div
                    class="flex flex-col">
                        <div class="p-6">
                            <h2 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal">
                                ${event.title}
                            </h2>
                            <h3>${event.host}</h3>
                            <p class="block font-sans  antialiased font-light leading-relaxed text-inherit">
                                ${formattedDescription}
                            </p>
                            <p>${event.isOnline ? "Online event" : `Location: ${event.location}`}</p>
                            <p>${event.isFree ? "No entry fee required" : `Entry fee: £ ${event.fee}`}</p>
                        </div>
                        <div class="p-6 pt-0">
                            <a href="event-details.html?local=${index}">
                                <button
                                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Read More
                                </button>
                            </a>
                            <a href="edit-my-event.html?id=${index}">
                                <button
                                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Edit
                                </button>
                            </a>
                        </div>
                </div>
            </li>
            `);
        });
    } else {
        // Display message if there's no event data in local storage
        $("#eventsContainer").append(`<p class="text-3xl text-red-500 font-black ms-8 mt-6 text-center" id="message">No saved events</p>`);
    }
}