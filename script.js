const url = "http://localhost:5000/films";  // Ensure correct URL for your json-server API

document.addEventListener('DOMContentLoaded', () => {

    // Fetch and display details of the first movie when the page loads
    const moviePlaceHolder = () => {
        fetch(url)
            .then(res => res.json())  // Get all films data from server
            .then(content => {
                const firstMovie = content[0];  // Get the first movie in the list

                // DOM Elements for movie details
                const filmImg = document.getElementById("poster");
                const movieTitle = document.getElementById("filmTitle");
                const movieDescr = document.getElementById("movieDescription");
                const runningTime = document.getElementById("runtime");
                const showingTime = document.getElementById("showtime");
                const availTicket = document.getElementById("ticketsAvailable");

                // Set the movie details in the DOM
                filmImg.src = firstMovie.poster;
                movieTitle.innerText = firstMovie.title;
                movieDescr.innerText = firstMovie.description;
                runningTime.innerText = `Runtime: ${firstMovie.runtime} minutes`;
                showingTime.innerText = `Showtime: ${firstMovie.showtime}`;
                availTicket.innerText = `Tickets Available: (${firstMovie.capacity - firstMovie.tickets_sold})`;

                // Handle "Buy Ticket" button click event for the first movie
                const ticketBuy = document.getElementById("buyTicket");
                let tickets = firstMovie.capacity - firstMovie.tickets_sold;

                ticketBuy.addEventListener('click', () => {
                    // Decrease ticket count when a ticket is bought
                    if (tickets > 0) {
                        tickets--;
                        availTicket.innerText = `Tickets Available: (${tickets})`;
                    }

                    // If tickets run out, mark the movie as "Sold Out"
                    if (tickets <= 0) {
                        availTicket.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                        ticketBuy.innerText = "Ticket Sold Out";  // Disable the buy button
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));  // Handle fetch errors
    }

    // Fetch and display the list of all movies in the menu
    const movieDetails = () => {
        fetch(url)
            .then(response => response.json())  // Fetch all movies data
            .then(data => {
                const list = document.getElementById("showingMovie");

                data.forEach(item => {
                    // Create a list item for each movie
                    const movieList = document.createElement("li");
                    movieList.classList.add("list-group-item", "border", "border-info", "sinema");
                    movieList.setAttribute('id', `${item.id}`);
                    movieList.innerText = item.title;

                    // Append the movie item to the movie list
                    list.appendChild(movieList);

                    // When a movie is clicked, display its details
                    movieList.addEventListener('click', () => {
                        const filmImage = document.getElementById("poster");
                        const filmTitle = document.getElementById("filmTitle");
                        const filmDescr = document.getElementById("movieDescription");
                        const runTime = document.getElementById("runtime");
                        const showTime = document.getElementById("showtime");
                        const availTickets = document.getElementById("ticketsAvailable");

                        // Set the selected movie details
                        filmImage.src = item.poster;
                        filmTitle.innerText = item.title;
                        filmDescr.innerText = item.description;
                        runTime.innerHTML = `Runtime: <span>${item.runtime}</span>`;
                        showTime.innerText = `Showtime: ${item.showtime}`;
                        availTickets.innerText = `Tickets Available: (${item.capacity - item.tickets_sold})`;

                        // Handle the "Buy Ticket" button for each movie
                        const ticketsBuy = document.getElementById("buyTicket");
                        let ticket = item.capacity - item.tickets_sold;

                        ticketsBuy.addEventListener('click', () => {
                            if (ticket > 0) {
                                ticket--;
                                availTickets.innerText = `Tickets Available: (${ticket})`;
                            }

                            // If tickets run out, mark the movie as "Sold Out"
                            if (ticket <= 0) {
                                availTickets.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                                ticketsBuy.innerText = "Sold Out";  // Disable the buy button
                            }
                        });
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));  // Handle fetch errors
    }

    // Initial function calls
    movieDetails();  // Display all movies in the menu
    moviePlaceHolder();  // Display details of the first movie

});
