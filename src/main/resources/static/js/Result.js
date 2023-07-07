import Mapping from './Mapping.js';

class Result{



    constructor() {
        this.playersInDraw = null;
        this.winner = 0;
        this.mapping = new Mapping();
    }




    checkIfFinished(playerscore, columns, rows, numberOfPlayers, turns) {
            console.log("columns: "+ columns + " rows: " + rows);
            for(let i = 1; i <= columns; i++)
            {
                console.log("checkingforfinish");
                for(let j = 1; j <= rows; j++)
                {

                    console.log(`${i}${j}0`);
                    if(document.getElementById(`${i}${j}0`).style.visibility != "hidden")
                    {
                    console.log(i + j + '0');
                    return;
                    }
                }
            }

            console.log("game Finished");

            if(this.isWin(playerscore, numberOfPlayers)) {
                console.log(playerscore);
                this.findWinner(playerscore, numberOfPlayers);
                alert("SPIELER: " + ((this.winner) + 1) + " GEWINNT!!!! PUNKTE: " + playerscore[this.winner]);
            }
            else
            {
                alert("UNENTSCHIEDEN ZWISCHEN: " + this.findPlayersInDraw(numberOfPlayers) + " PUNKTE: " + playerscore[this.winner]);
            }

            this.mapping.returnPlayerData(this.mapping.createPlayer(turns));




    }


     isWin(playerscore, numberOfPlayers) {

            for(let i = 0; i < numberOfPlayers; i++)
            {
                if(playerscore[i] > playerscore[this.winner])
                {
                    this.winner = i;
                }
            }

            for(let i = 0; i < numberOfPlayers; i++)
            {
                if(playerscore[i] == playerscore[this.winner] && this.winner != i)
                {
                    return false;
            }
            }

            return true;
    }

    findWinner(playerscore, numberOfPlayers) {
        for(let i = 0; i < numberOfPlayers; i++)
        {
            if(playerscore[i] > playerscore[this.winner])
            {
                this.winner = i;
                return this.winner;
            }
        }
    }

    findPlayersInDraw(numberOfPlayers){
        for(let i = 0; i < numberOfPlayers; i++) {
            if(playerscore[i] == playerscore[this.winner]) {
                playersInDraw.push(i);
            }
        }
        return playersInDraw;
}
}

export default Result;