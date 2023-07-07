import GameLogic from './GameLogic.js';
import Visuals from './Visuals.js';
import Board from './Board.js';
import Utilities from './Utilities.js';

function startUpGame() {
  var gameLogic = new GameLogic();
  var visuals = new Visuals();
  var board = new Board();
  var utilities = new Utilities();



  gameLogic.setNumberOfPlayers();
  board.calculateSize();
  board.generateTable();
  utilities.startUp();
  gameLogic.generatePairs(board.getRows(), board.getColumns(), board.getCardArray(), board.getCards());

  gameLogic.addPicturesToCard();

  let playerCount = gameLogic.getNumberOfPlayers();
  let scores = gameLogic.getPlayerScore();
  let turns = gameLogic.getTurns();

  visuals.colorChangeBackground(gameLogic.getCurrentViewedCards(), turns, playerCount);
  visuals.generateScoreBoard(scores, playerCount);

}

function cleaning() {
    document.getElementById("table").style.visibility = "hidden";
    document.getElementById("MemBox").style.visibility = "hidden";
}

window.cleaning = cleaning;
window.startUpGame = startUpGame;

