let url = "http://localhost:3000/films"; //url for the local json server
document.addEventListener('DOMContentLoaded', () => {//it waitsfor the Dom to load fully

    let movieHolder = () => { //its n arrow function
        fetch(url).then(response => response.json()) //this get request from the server then converts into json format
        .then(array =>{
            let movie1 = array[0];// it getsthe first element inindex 0 for the server
            let moviePoster = document.getElementById("poster");
            let mTitle = document.getElementById("filmTitle");
            let mDescription = document.getElementById("description");///here we initialise the variables andassigningthem
            let runTime = document.getElementById("movie-lenght");
            let showTime = document.getElementById("showing-time");
            let availableTick = document.getElementById("available-tickets");
    
            moviePoster.src = movie1.poster;
            mTitle.innerHTML = movie1.title;
            mDescription.innerHTML = movie1.description;
            runTime.innerHTML = `Movie length: ${movie1.runtime}`;// linking the js variables with corresponding json server variables
            showTime.innerHTML = `Showtime: ${movie1.showtime}`;
            availableTick.innerHTML = `Available Tickets: ${movie1.capacity}`;
    
            let bought = document.getElementById("buyTicket");//assigninnew variable to the button in the html
            let ticket = movie1.capacity - movie1.tickets_sold; //some calculation so that toget the available tickets
                    bought.addEventListener('click', () => { //invocking the eventlisener toperform some task
                if(ticket > 0) { //comparision btw the available tickes and 0
                    ticket--; //it deducts available tickets whe one buys a ticket
                    availableTick.innerText = `Available Tickets: ${ticket}`; //displays remaining available tickets
                }else{
                    availableTick.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                    bought.disabled = false;
                }
            });
        });
    };
            const movieDetails = () => { // this function displays the movies available
                fetch(url).then(response => response.json()) // does same thingwiththe above fech url
                .then(data => {
                    let movieList = document.getElementById("showingMovie");//assign avariable
                    data.forEach(items => {
                        let mlist = document.createElement('li');//thiscreat an li element wiche is stored inmlist
                        mlist.classList.add("group-item"); //givesthemlist a classlist
                        mlist.setAttribute('id', `${items.id}`);//assigns themlist to an atribute
                        mlist.innerText = items.title;
                        movieList.appendChild(mlist);//updates the mlist
    
                        mlist.addEventListener('click', () =>{//adding an event listener

                            let ticket1 = items.capacity - items.tickets_sold; //adain calculating remaining tickets

                            let moviePoster = document.getElementById("poster");
                            let movieTitle = document.getElementById("filmTitle");
                            let movieDescription = document.getElementById("description");//here we also initialise the variables andassigningthem
                            let runningTime = document.getElementById("movie-lenght");
                            let showingTime = document.getElementById("showing-time");
                            let availableTicks = document.getElementById("available-tickets");
            
                            moviePoster.src = items.poster;
                            movieTitle.innerText = items.title;
                            movieDescription.innerText = items.description;
                            runningTime.innerHTML = `Runtime: ${items.runtime}`;//assigning variables to their corresponding value
                            showingTime.innerText = `Showtime:  ${items.showtime}`;
                            availableTicks.innerText = `Available Tickets: ${ticket1}`;
                            
                            let buy = document.getElementById("buyTicket");
                            buy.innerHTML = `buy Tickets`;

                          buy.addEventListener('click',() => {
                                if(ticket1 > 0) { //comparison 
                                    ticket1--;// it decreases the nuber of tickets when someone buys a ticket
                                    availableTicks.innerText = `Available Tickets: ${ticket1}`;
                                }

                                if(ticket1 <= 0) {
                                    availableTicks.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                                    buy.disabled = true;
                                }
                            });


            
                        });
                    });
                });
            };
            movieDetails();
            movieHolder();
        });
        


