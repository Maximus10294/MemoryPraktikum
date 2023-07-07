import Visuals from './Visuals.js';
import Result from './Result.js';
import Card from './Cards.js';
import Board from './Board.js';

class GameLogic {
    constructor() {
        this.result = new Result();
        this.visuals = new Visuals();
        this.board = new Board();
        this.shownCardsInCurrentMove = 0;
        this.turns = 0;
        this.cards = 0;
        this.numberOfPlayers = 0;
        this.currentViewedCards = [];
        this.playerScore = [];
        this.pairs = [];
    }

    getTurns() {
        return this.turns;
    }

    getShownCardsInCurrentMove() {
        return this.shownCardsInCurrentMove;
    }

    getCards() {
        return this.cards;
    }

    getPlayerScore() {
        return this.playerScore;
    }

    getNumberOfPlayers() {
        return this.numberOfPlayers;
    }

    getCurrentViewedCards() {
        return this.currentViewedCards;
    }

    setNumberOfPlayers() {
        this.numberOfPlayers = parseInt(document.getElementById("SpielerAnzahl").value);
        for(let i = 0; i < this.numberOfPlayers; i++) {
            this.playerScore[i] = 0;
        }
    }

    compareSelectedCardsWithPairs() {
        console.log("CurrentViewedCards. " + this.currentViewedCards);
        for (let i = 0; i < this.pairs.length; i++) {
            console.log("PairIds: " + (this.pairs[i][0].getId() + "," +  (this.pairs[i][1].getId() + " Viewedcards: " + this.currentViewedCards)));
            if (((this.pairs[i][0].getId() == this.currentViewedCards[0]) && (this.pairs[i][1].getId() == this.currentViewedCards[1])) ||((this.pairs[i][1].getId() == this.currentViewedCards[0]) && (this.pairs[i][0].getId() == this.currentViewedCards[1]))
            ) {
                console.log("CardsAreAPair");
                this.playerScore[this.turns % this.numberOfPlayers]++;
                this.visuals.colorChangeIfPair(this.currentViewedCards, this.turns, this.numberOfPlayers);
                this.visuals.colorChangeBackground(this.currentViewedCards, this.turns, this.numberOfPlayers);
                this.visuals.generateScoreBoard(this.playerScore, this.numberOfPlayers);
                document.getElementById("Body").style.pointerEvents = "auto";
                this.board.calculateSize();
                this.result.checkIfFinished(this.playerScore, this.board.getColumns(), this.board.getRows(), this.numberOfPlayers, this.turns);
                return this.playerScore;
            }
        }

        console.log("CardsAreNoPair");

        this.turns = this.hideCardsAgain();

        this.visuals.colorChangeBackground(this.currentViewedCards, this.turns, this.numberOfPlayers);
        document.getElementById("Body").style.pointerEvents = "auto";
        return this.playerScore;
    }

    addPicturesToCard() {
        for (let i = 0; i < this.pairs.length; i++) {
            for (let j = 0; j < 2; j++) {
                console.log("Pair: " + i);
                console.log(this.pairs[i][0]);
                console.log(this.pairs[i][1]);
                let card = document.getElementById(this.pairs[i][j].getId());
                card.style.padding = 0;
                card.style.backgroundImage = `url('https://picsum.photos/100/100?random=${i}')`;
                card.style.width = "100px";
                card.style.height = "75px";
                card.childNodes[0].onclick = () => {
                 this.showCard(card.childNodes[0].id);
               };
            }
        }
    }

    showCard(input) {
        this.shownCardsInCurrentMove++;
        document.getElementById(input).style.visibility = "hidden";
        this.currentViewedCards[this.shownCardsInCurrentMove - 1] = input / 10;

        if (this.shownCardsInCurrentMove === 2) {
            this.shownCardsInCurrentMove = 0;
            document.getElementById("Body").style.pointerEvents = "none";
            setTimeout(() => this.compareSelectedCardsWithPairs(), 1000);
        }
    }

    hideCardsAgain() {
        this.turns++;
        document.getElementById(this.currentViewedCards[0] * 10).style.visibility = "visible";
        document.getElementById(this.currentViewedCards[1] * 10).style.visibility = "visible";
        return this.turns;
    }

    generatePairs(rows, columns, cardArray, cards) {
        console.log("PairsGen reached");
        let ids = [];

        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= columns; j++) {
                let row = i < 10 ? "" + i : i;
                let col = j < 10 ? "" + j : j;
                ids.push(col + row);
            }
        }



        if (ids.length % 2 !== 0) {
            throw new Error("Cannot create pairs because the number of IDs is odd.");
        }



        while (ids.length > 0) {
            let index1 = Math.floor(Math.random() * ids.length);
            let id1 = ids.splice(index1, 1)[0];



            let index2 = Math.floor(Math.random() * ids.length);
            let id2 = ids.splice(index2, 1)[0];


            let cardOfPair1, cardOfPair2;


            for (let i = 0; i < parseInt(document.getElementById("PaarAnzahl").value) * 2; i++) {

                if (cardArray[i].getId() === id1) {
                    cardOfPair1 = cardArray[i];

                } else if (cardArray[i].getId() === id2) {
                    cardOfPair2 = cardArray[i];
                }
            }

            this.pairs.push([cardOfPair1, cardOfPair2]);
        }

        console.log(this.pairs);
        return this.pairs;
    }
}


export default GameLogic;