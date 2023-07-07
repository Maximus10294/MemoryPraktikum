class Visuals {
    constructor() {
        this.colors = ["#FFD400", "#D90368", "#970B78", "#541388", "#2E294E"];
    }

    generateScoreBoard(playerScore, numberOfPlayers) {
        const scoreboard = document.getElementById("Scoreboarddyn");
        scoreboard.innerHTML = '';

        for (let i = 0; i < numberOfPlayers; i++) {
            const node = document.createElement("li");
            const textnode = document.createTextNode(`SPIELER: ${i + 1} PUNKTE: ${playerScore[i]}`);
            node.appendChild(textnode);
            node.style.color = this.colors[i];
            scoreboard.appendChild(node);
        }
    }

    colorChangeIfPair(currentViewedCards, turn, numberOfPlayers) {
        document.getElementById(currentViewedCards[0]).style.borderColor = this.colors[turn % numberOfPlayers];
        document.getElementById(currentViewedCards[1]).style.borderColor = this.colors[turn % numberOfPlayers];
    }

    colorChangeBackground(currentViewedCards, turn, numberOfPlayers) {
        document.getElementById("MemBox").style.backgroundColor = this.colors[turn % numberOfPlayers];
    }
}

export default Visuals;