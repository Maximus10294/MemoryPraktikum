

var onGoingGame = true;
var getAllPlayersJson;
var backendPlayerCount = 0;
var test = 0;




function StartUpGame() {

            if(!onGoingGame)
            {
                location.reload()
            }

            onGoingGame = false;






            document.getElementById("MemBox").style.backgroundColor = colors[turn % numberOfPlayers];
            generateScoreBoard();
            return;
}








    function SetPlayerCount()
    {
        numberOfPlayers = document.getElementById("SpielerAnzahl").value;
        for(let i = 0; i < numberOfPlayers; i++)
        {
            playerscore[i] = 0;


        }
    }







function colorChange() {
        if((viewedCardsArePair)) {
                document.getElementById(currentViewedCards[0]).style.borderColor = colors[turn % numberOfPlayers];
                document.getElementById(currentViewedCards[1]).style.borderColor = colors[turn % numberOfPlayers];
                viewedCardsArePair = false;
        }

        document.getElementById("MemBox").style.backgroundColor = colors[turn % numberOfPlayers];
        return;

}

function generateScoreBoard() {

        document.getElementById("Scoreboarddyn").innerHTML = '';

        for(let i = 0; i < numberOfPlayers; i++) {

                const node = document.createElement("li");
                const textnode = document.createTextNode("SPIELER: " + (i+1) + " PUNKTE: " + playerscore[i]);
                node.appendChild(textnode);
                node.style.color = colors[i];
                document.getElementById("Scoreboarddyn").appendChild(node);
        }
}









async function loadHighscores() {

              var playerResponse = await getAllPlayers();
              var oldPlayerResponse = playerResponse;
              console.log(playerResponse);
              backendPlayerCount = playerResponse.length;
              console.log(playerResponse[0].username);
              //getAllTestObjects();
              var table = document.getElementById("Highscores");
                    for (let i = 1; i <= playerResponse.length; i++) {
                            var row = table.insertRow(i);
                            for (let j = 1; j < 5; j++) {

                                    var cell = row.insertCell(j - 1);
                                    cell.id = `${i}${j}`;
                                    if(j == 1)
                                    {
                                    cell.innerHTML = `${i}.`;
                                    }
                                    else if(j == 2)
                                    {
                                    cell.innerHTML = `${playerResponse[i - 1].username}`;
                                    }
                                    else if(j == 3)
                                    {
                                    cell.innerHTML = `${playerResponse[i - 1].score.points}`;
                                    }
                                    else
                                    {
                                    cell.innerHTML = `${playerResponse[i -1 ].score.turns}`;
                                    }

                            }
                    }

                    const myInterval = setInterval(async function() {
                                                                 playerResponse = await getAllPlayers();

                                                                 if((backendPlayerCount) != playerResponse.length)
                                                                 {
                                                                    location.reload()
                                                                 }

                                                                 for(let i = 0; i < playerResponse.length; i++)
                                                                 {
                                                                 if(playerResponse[i].score.points != oldPlayerResponse[i].score.points || playerResponse[i].score.turns != oldPlayerResponse[i].score.turns) {
                                                                 location.reload();
                                                                 }
                                                                 }
                                                            }, 2000);

                    }






async function getAllPlayers() {
   const res = await fetch('http://localhost/getAllPlayers');
   getAllPlayersJson = await res.json();
   console.log(getAllPlayersJson.length);
   return getAllPlayersJson;
}


function returnPlayerData(player) {
    console.log(JSON.stringify(player));
    fetch('http://localhost/saveUser', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player)
    });
}


/*
function getAllTestObjects() {
   fetch('http://localhost:8080/getAllTestObjects')
      .then(response => {
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
}
*/

