const getAllEvents = async () => {
    try {
        const events = await fetchAllEvents();
        displayEventDetails(events);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}


const displayEventDetails = (events) => {
    $("#message").remove(); //removing any messages set while fetching saved events from local host
    if (events) {
        // Display event details as list items
        events.forEach(function (event, index) {
            const shortDescription = event.description.split(" ").slice(0, 20).join(" ");
            const formattedDescription = shortDescription.length < event.description.length ? shortDescription + "..." : shortDescription;
            $("#eventsContainer").children('ul:nth-child(1)').append(`
            <li class="relative">
                <div class="card relative flex flex-col md:flex-row items-center mt-6 text-white bg-white/30 backdrop-blur-md drop-shadow-2xl shadow-2xl bg-clip-border rounded-xl w-[312px] sm:w-[400px] md:w-[600px] h-full">
                    <img src='${event.thumbnailUrl? event.thumbnailUrl : 'assets/Placeholder-_-Glossary.svg'}' alt="Thumbnail for ${event.title}" class="w-[288px] h-[288px] aspect-square rounded-xl mt-6 md:mt-0 md:ms-6 object-cover"/>
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
                                <p>Date (dd/mm/yy): ${event.date}</p>
                                <p>${event.isFree ? "No entry fee required" : `Entry fee: £ ${event.fee}`}</p>
                            </div>
                            <div class="p-6 pt-0">
                                <a href="event-details.html?id=${index}">
                                    <button
                                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Read More
                                    </button>
                                </a>
                            
                            </div>
                    </div>
                </div>
            </li
            `);
        });
    } else {
        // Display message if there's no event data in server
        $("#eventsContainer").empty().append(`<p class="text-3xl text-red-500 font-black ms-8 mt-6 text-center"  id="message">No saved events</p>`);
    }
}

const fetchAllEvents = async () => {
    try {
        const response = await fetch("https://nodejs-serverless-function-express-liard-iota-73.vercel.app/events");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching events:", error);
    }
}

$(document).ready(getAllEvents());
