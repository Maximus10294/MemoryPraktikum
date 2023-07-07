class Mapping{


    constructor(){
        this.player = null;
    }

    createPlayer(turn) {
        console.log(document.getElementById("PaarAnzahl").value);
        var rating = (Math.pow((document.getElementById("PaarAnzahl").value), 2)) / (turn + 1);
        this.player = {username : prompt('Name:'), score:{points: rating,turns: (turn + 1)}};
        return this.player;
    }

    returnPlayerData(player) {
        console.log(JSON.stringify(player));
        fetch('http://localhost/saveUser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player)
        });
    }

    async loadHighscores() {

                  var playerResponse = await this.getAllPlayers();
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






    async getAllPlayers() {
       const res = await fetch('http://localhost/getAllPlayers');
       getAllPlayersJson = await res.json();
       console.log(getAllPlayersJson.length);
       return getAllPlayersJson;
    }



}

export default Mapping;