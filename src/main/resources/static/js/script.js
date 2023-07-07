var columns;
var rows;
var turn = 1;
var shownCardsInCurrentMove = 0;
var numberOfPlayers;
var winner;
var gameIsADraw;
var viewedCardsArePair;
var onGoingGame = true;
var getAllPlayersJson;
var backendPlayerCount = 0;
var test = 0;
const colors = ["#FFD400", "#D90368", "#970B78", "#541388", "#2E294E"];
let highscores = [70, 53, 42, 34, 19];
let playersInDraw = [];
let playerscore = [];
const covernode = [];
let pairs = [];
let currentViewedCards = [];


function StartUpGame() {

            if(!onGoingGame)
            {
                location.reload()
            }

            onGoingGame = false;

            SetPlayerCount();
            document.getElementById("table").style.visibility = "visible";
            document.getElementById("MemBox").style.visibility = "visible";
            document.getElementById("MemBox").appendChild(document.getElementById("table"));

            calculateSize();
            generateTable()


            generatePairs();
            addPicturesToCards();
            document.getElementById("MemBox").style.backgroundColor = colors[turn % numberOfPlayers];
            generateScoreBoard();
            return;
}

function generateTable() {
            var table = document.getElementById("table");
            for (let i = 1; i <= columns; i++) {
                    var row = table.insertRow(i - 1);
                    for (let j = 1; j <= rows; j++) {
                            covernode[i + j] = document.createElement(`cover${i}`);
                            covernode[i + j].innerHTML = '<div class="cover"></div>';
                            covernode[i + j].id = `${i}${j}0`;
                            var cell = row.insertCell(j - 1);
                            cell.id = `${i}${j}`;
                            document.getElementById(cell.id).appendChild(covernode[i + j]);
            }
    }
}

function addPicturesToCards() {
            for(let i = 0; i < pairs.length; i++) {
                    document.getElementById(pairs[i][0]).style.padding = 0;
                    document.getElementById(pairs[i][0]).style.backgroundImage = `url('https://picsum.photos/100/100?random=${i}')`;
                    document.getElementById(pairs[i][0]).style.width = "100px";
                    document.getElementById(pairs[i][0]).style.height = "75px";
                    document.getElementById(pairs[i][0]).childNodes[0].onclick = function() {showCard(this.id)};

                    document.getElementById(pairs[i][1]).style.backgroundImage = `url('https://picsum.photos/100/100?random=${i}')`;
                    document.getElementById(pairs[i][1]).style.width = "100px";
                    document.getElementById(pairs[i][1]).style.height = "75px";
                    document.getElementById(pairs[i][1]).childNodes[0].onclick = function() {showCard(this.id)};
            }
}

function calculateSize() {

            cards = document.getElementById("PaarAnzahl").value * 2;

            rows = Math.round(Math.sqrt(cards));

            while(cards % rows != 0) {
                    rows = rows - 1;
            }
            columns = cards / rows;
}

function generatePairs() {

            // Erstelle eine Liste aller IDs
            let ids = [];

            for(let i = 1; i <= rows; i++) {

                for(let j = 1; j <= columns; j++) {

                    let row = i < 10 ?  i : i;
                    let col = j < 10 ?  j : j;

                    ids.push("" + col + row);

                }

            }
            // Stelle sicher, dass wir eine gerade Anzahl von IDs haben

            if (ids.length % 2 !== 0) {

                throw new Error("Kann keine Paare erstellen, weil die Anzahl der IDs ungerade ist.");

            }



            // Erstelle die Paare



            while(ids.length > 0) {

                // Wähle zufällig eine ID aus und entferne sie aus der Liste

                let index1 = Math.floor(Math.random() * ids.length);
                let id1 = ids.splice(index1, 1)[0];



                // Wähle zufällig eine zweite ID aus und entferne sie aus der Liste

                let index2 = Math.floor(Math.random() * ids.length);
                let id2 = ids.splice(index2, 1)[0];

                // Füge das Paar zur Liste der Paare hinzu

                pairs.push([id1, id2]);

            }
            // Gib die Liste der Paare zurück
            return pairs;

}

function showCard(input){

            shownCardsInCurrentMove++;
            document.getElementById(input).style.visibility = "hidden";


            currentViewedCards[shownCardsInCurrentMove - 1] = input / 10;


            if(shownCardsInCurrentMove == 2) {

                shownCardsInCurrentMove = 0;
                document.getElementById("Body").style.pointerEvents="none";
                setTimeout(compareSelectedCardsWithPairs, 1000);
                return currentViewedCards;
            }
            return currentViewedCards;


}

function compareSelectedCardsWithPairs(){

            for(let i = 0; i < pairs.length; i++)
            {
                if((pairs[i][0] == currentViewedCards[0] && pairs[i][1] == currentViewedCards[1])|| (pairs[i][1] == currentViewedCards[0] && pairs[i][0] == currentViewedCards[1]))
                {
                    viewedCardsArePair = true;
                    playerscore[turn % numberOfPlayers]++;
                    colorChange();
                    generateScoreBoard();
                    document.getElementById("Body").style.pointerEvents="auto";
                    CheckIfFinished();

                    return playerscore;
                }
            }

            hideCardsAgain();
            colorChange();
            document.getElementById("Body").style.pointerEvents="auto";

            return playerscore;
}

function hideCardsAgain(){

    turn++;

    document.getElementById(currentViewedCards[0] * 10).style.visibility = "visible";
    document.getElementById(currentViewedCards[1] * 10).style.visibility = "visible";

    }

    function SetPlayerCount()
    {
        numberOfPlayers = document.getElementById("SpielerAnzahl").value;
        for(let i = 0; i < numberOfPlayers; i++)
        {
            playerscore[i] = 0;


        }
    }

function CheckIfFinished() {

        for(let i = 1; i <= columns; i++)
        {
            for(let j = 1; j <= rows; j++)
            {
                console.log(columns);
                console.log(`${i}${j}0`);
                if(document.getElementById(`${i}${j}0`).style.visibility != "hidden")
                {
                console.log(i + j + '0');
                return;
                }
            }
        }

        console.log("game Finished");
        findWinner();
        if(!gameIsADraw)
                {
                    alert("SPIELER: " + ((winner) + 1) + " GEWINNT!!!! PUNKTE: " + playerscore[turn % numberOfPlayers]);
                }
        var rating = (cards / 2) * (cards / 2) / turn;
        const player = {username : prompt('Name:'), score:{points: rating,turns: turn}};
        returnPlayerData(player);
        onGoingGame = false;





}

function findWinner() {

        drawindex = 0;
        winner = 0;

        for(let i = 0; i < numberOfPlayers; i++)
        {
            if(playerscore[i] > playerscore[winner])
            {
                winner = i;
            }
        }

        for(let i = 0; i < numberOfPlayers; i++)
        {
            if(playerscore[i] == playerscore[winner] && winner != i)
            {
                gameIsADraw = true;
                playersInDraw[drawindex] = i;
                drawindex++;
            }
        }

        if(gameIsADraw)
        {
            playersInDraw[drawindex] = winner;
            alert("UNENTSCHIEDEN ZWISCHEN: " + playersInDraw + " PUNKTE: " + playerscore[winner]);
            return gameIsADraw;
        }
        return winner;
}

function cleaning() {
        document.getElementById("table").style.visibility = "hidden";
        document.getElementById("MemBox").style.visibility = "hidden";
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

