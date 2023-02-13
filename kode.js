const targetTime = new Date("October 08, 2023 09:30:00");  // Set the target time
let timeRemaining = targetTime - Date.now();  // Calculate the initial time remaining
setInterval(updateCountdown, 1000);
setInterval(fyll_gif, (1000*20))
//setInterval(fyll_film, (1000*60))

window.onload = function(){
    updateCountdown();
    fyll_gif();  
}

function updateCountdown() {
  // Calculate the time remaining
  timeRemaining = targetTime - Date.now();

  // If the countdown is complete, stop the interval and display a message
  if (timeRemaining < 0) {
    clearInterval(interval);
    console.log("Countdown complete!");
    return;
  }

  // Calculate the number of days, hours, minutes, and seconds remaining
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Display the time remaining
  var p = document.getElementById("tid");
  p.innerHTML = days + " dagar, " + hours + " timar, " + minutes + " minutt, og " + seconds + " sekund";
}

async function fyll_film(){
  const samenlikning = document.getElementById("samenlikning");
  const film = tilfeldig_film()
  let antall = Math.round(timeRemaining / filmlengde_i_sekund(film["timar"], film["minutt"]));

  samenlikning.innerHTML = "På den tida kan du sjå " + film["tittel"] + " " + antall + " gongar!";
}

async function fyll_gif(){
    const samenlikning = document.getElementById("samenlikning");
    let gifUrl = await getRandomGif("running");
    samenlikning.innerHTML = "<img id='gif' src='" + gifUrl + "'>";
}

function tilfeldig_film(){
    const filmar = [
        {
            "tittel": "Avengers: Endgame",
            "timar": 3,
            "minutt": 2,
            "sekund": 0
        },
        {
            "tittel": "Love Actually",
            "timar": 2,
            "minutt": 9,
            "sekund": 0
        },
        {
            "tittel": "Skyfall",
            "timar": 2,
            "minutt": 23,
            "sekund": 0
        },
        {
            "tittel": "Spider-Man (2002)",
            "timar": 2,
            "minutt": 1,
            "sekund": 0
        },
        {
            "tittel": "Max Manus",
            "timar": 1,
            "minutt": 58,
            "sekund": 0
        },
        {
            "tittel": "Avatar",
            "timar": 2,
            "minutt": 42,
            "sekund": 0
        }
    ]
    return filmar[Math.floor(Math.random() * filmar.length)];
}

function filmlengde_i_sekund(timar, minutt){
    return (timar * 60 + minutt) * 60 * 1000;
}


async function getRandomGif(searchTerm) {
    // Build the API endpoint URL
    const apiKey = "nXQZqueNgbznfpm65bfJ8YL1wFvxmZG4";
    const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTerm}`;
  
    // Make the GET request to the API
    const response = await fetch(endpoint);
  
    // Check the response status code
    if (response.status !== 200) {
      console.error(`Error: ${response.status}`);
      return;
    }
  
    // Parse the response data
    const data = await response.json();
  
    // Return the GIF URL
    return data.data.images.original.url;
}
  
