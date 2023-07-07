import Card from './Cards.js';

class Board {
    constructor() {
        this.columns = 0;
        this.rows = 0;
        this.table = null;
        this.cards = 0;
        this.cardArray = [];
        this.coverNode = [];
    }

    getColumns() {
        return this.columns;
    }

    getRows() {
        return this.rows;
    }

    getCards() {
        return this.cards;
    }

    getCardArray() {
        return this.cardArray;
    }

    calculateSize() {
        this.cards = parseInt(document.getElementById("PaarAnzahl").value) * 2;
        this.table = document.getElementById("table");


                   this.rows = Math.round(Math.sqrt(this.cards));

                   while(this.cards % this.rows != 0) {
                           this.rows = this.rows - 1;
                   }
                   this.columns = this.cards / this.rows;
    }

    generateTable() {
        console.log(this.columns);
        console.log(this.rows);
        for (let i = 1; i <= this.columns; i++) {
            var row = this.table.insertRow(i - 1);

            for (let j = 1; j <= this.rows; j++) {
                this.coverNode[i + j] = document.createElement(`cover${i}`);
                this.coverNode[i + j].innerHTML = '<div class="cover"></div>';
                this.coverNode[i + j].id = `${i}${j}0`;

                var cell = row.insertCell(j - 1);
                this.cardArray.push(new Card(i, j));
                cell.id = `${i}${j}`;

                document.getElementById(cell.id).appendChild(this.coverNode[i + j]);
            }
        }


    }


}

export default Board;
