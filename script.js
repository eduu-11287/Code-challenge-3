const url = "http://localhost:5000/films";  // Ensure correct URL for your json-server API

// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Fetch and display details of the first movie when the page loads
    const moviePlaceHolder = () => {
        fetch(url) // Send a GET request to the server to fetch the films data
            .then(res => res.json())  // Parse the response from JSON format to a JavaScript object
            .then(content => {
                const firstMovie = content[0];  // Get the first movie in the list from the fetched data

                // Select DOM elements where movie details will be displayed
                const filmImg = document.getElementById("poster");
                const movieTitle = document.getElementById("filmTitle");
                const movieDescr = document.getElementById("movieDescription");
                const runningTime = document.getElementById("runtime");
                const showingTime = document.getElementById("showtime");
                const availTicket = document.getElementById("ticketsAvailable");

                // Set the movie details in the DOM by updating the innerText or src of the elements
                filmImg.src = firstMovie.poster;  // Set the poster image for the first movie
                movieTitle.innerText = firstMovie.title;  // Set the title of the movie
                movieDescr.innerText = firstMovie.description;  // Set the description of the movie
                runningTime.innerText = `Runtime: ${firstMovie.runtime} minutes`;  // Set the runtime
                showingTime.innerText = `Showtime: ${firstMovie.showtime}`;  // Set the showtime
                availTicket.innerText = `Tickets Available: (${firstMovie.capacity - firstMovie.tickets_sold})`;  // Set available tickets

                // Select the "Buy Ticket" button and calculate the available tickets
                const ticketBuy = document.getElementById("buyTicket");
                let tickets = firstMovie.capacity - firstMovie.tickets_sold;  // Calculate available tickets

                // Adds event listener to the "Buy Ticket" button
                ticketBuy.addEventListener('click', () => {
                    if (tickets > 0) {
                        tickets--;  // decreases the  available tickets by 1 when the button is clicked
                        availTicket.innerText = `Tickets Available: (${tickets})`;  // Update the available tickets in the DOM
                    }

                    // If tickets run out, mark the movie as "Sold Out"
                    if (tickets <= 0) {
                        availTicket.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;  // Show "SOLD OUT" badge
                        ticketBuy.innerText = "Ticket Sold Out";  // Change the button text to "Sold Out"
                        ticketBuy.disabled = true;  // Disable the buy ticket button once sold out
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));  // Log any errors that occur during the fetch operation
    }

    // Fetch and display the list of all movies in the menu
    const movieDetails = () => {
        fetch(url)  // Send a GET request to fetch all movie data
            .then(response => response.json())  // Parse the response to JSON
            .then(data => {
                const list = document.getElementById("showingMovie");  // Get the list container from the DOM

                // Iterate over the data (which contains all the movies)
                data.forEach(item => {
                    // Create a list item for each movie and add necessary classes
                    const movieList = document.createElement("li");
                    movieList.classList.add("list-group-item", "border", "border-info", "sinema");  // Add Bootstrap classes for styling
                    movieList.setAttribute('id', `${item.id}`);  // Set a unique id for each list item (based on movie id)
                    movieList.innerText = item.title;  // Set the title of the movie as the text for the list item

                    // Append the created list item to the showingMovie container in the DOM
                    list.appendChild(movieList);

                    // Add an event listener to the list item to show the movie's details when clicked
                    movieList.addEventListener('click', () => {
                        const filmImage = document.getElementById("poster");
                        const filmTitle = document.getElementById("filmTitle");
                        const filmDescr = document.getElementById("movieDescription");
                        const runTime = document.getElementById("runtime");
                        const showTime = document.getElementById("showtime");
                        const availTickets = document.getElementById("ticketsAvailable");

                        // Update the movie details in the DOM based on the selected movie item
                        filmImage.src = item.poster;
                        filmTitle.innerText = item.title;
                        filmDescr.innerText = item.description;
                        runTime.innerHTML = `Runtime: <span>${item.runtime}</span>`;
                        showTime.innerText = `Showtime: ${item.showtime}`;
                        availTickets.innerText = `Tickets Available: (${item.capacity - item.tickets_sold})`;

                        // Handle the "Buy Ticket" button for each movie
                        const ticketsBuy = document.getElementById("buyTicket");
                        let ticket = item.capacity - item.tickets_sold;  // Get the number of available tickets for this movie

                        // Reset the Buy Ticket button state and update available tickets
                        ticketsBuy.innerText = "Buy Ticket";
                        availTickets.innerHTML = `Tickets Available: (${ticket})`;

                        // Add event listener to the "Buy Ticket" button for this specific movie
                        ticketsBuy.addEventListener('click', () => {
                            if (ticket > 0) {
                                ticket--;  // Decrease available tickets when clicked
                                availTickets.innerText = `Tickets Available: (${ticket})`;  // Update available tickets in the DOM
                            }

                            // If tickets run out, mark the movie as "Sold Out"
                            if (ticket <= 0) {
                                availTickets.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;  // Show "SOLD OUT" badge
                                ticketsBuy.innerText = "Sold Out";  // Disable the buy button once sold out
                                ticketsBuy.disabled = false;  // Disable the button
                            }
                        });
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));  // Log any errors that occur during the fetch operation
    }

    // Initial function calls to fetch and display all movies and details of the first movie
    movieDetails();  // Display the list of all movies in the menu
    moviePlaceHolder();  // Display details of the first movie when the page loads

});
