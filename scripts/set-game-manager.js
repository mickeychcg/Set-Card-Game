/**
 * @constant {number}
 * @author - Samuel Maddox
 * @description - Minimum number of cards required on the board while
 * there are still cards in the deck
 */
var BOARD_CARD_MINIMUM = 12;
var SET_FOUND_POINTS = 3;
var FIND_SET_PENALTY = -3;
var HINT_PENALTY = -1;
var GAME_OVER = false;
/**
 * @constant {object}
 * @author - Tavish Wille
 * @author - Samuel Maddox
 * @description - List of commands.
 */
var COMMAND = {
  NEW_GAME: "new game",
  DRAW_3_CARDS: "draw 3 cards",
  HINT: "hint",
  FIND_SET: "find set",
  OPEN_RULES: "open rules",
  CLOSE_RULES: "close rules",
  SELECT: "select",
  PAUSE_TOGGLE: "pause unpause"
}

//Global Variables
var BOARD = new SetBoard();
var UI = new SetUserInterface();
var GAME_LOGIC = new SetGameLogic();
var PAUSED = true;
var SELECTED = 0;

/**
 * @method - Starts a new game of Set
 * @author - Samuel Maddox
 * @author - Tavish Wille
 */
function newGame() {
  /* Write the default UI "message" */
  UI.writeMessage(NEW_GAME_MESSAGE);

  /* Redraw UI elements. */
  UI.outputCardsInDeck(0);
  UI.outputTimer(0);

  /* Clear cards from screen */
  UI.removeCards(cardIdsArray(BOARD.getCardsOnBoard()));

  /* Reset Game state. */
  GAME_OVER = false;
  PAUSED = false;
  SELECTED = 0;
  BOARD.score = 0;
  UI.outputScore(BOARD.score);
  BOARD.setsFound = 0;
  UI.outputSetsFound(BOARD.setsFound);

  /* New board */
  BOARD = new SetBoard();


  /* Draw cards from deck and move to the board */
  for (var i = 0; i < BOARD_CARD_MINIMUM; i++) {
    BOARD.addCardToBoard(BOARD.drawCardFromDeck());
  }

  /* Output board */
  UI.outputCards(BOARD.getCardsOnBoard());

  /* Add Card Event Listners */
  UI.addCardEventListener(BOARD.getCardsOnBoard());


  /* Update card counter */
  UI.outputCardsInDeck(BOARD.sizeOfDeck());

};

/**
 * @method - Adds three new cards from the deck to the table and updates accordingly.
 * @author - Tavish Wille
 */
function drawThree(){
  if(BOARD.sizeOfDeck() > 0){
    cards = [];
    for(i = 0; i < NUMBER_OF_SET_VARIATIONS; i++){
      card = BOARD.drawCardFromDeck();
      BOARD.addCardToBoard(card);
      cards.push(card);
    }
    UI.outputCards(cards);
    UI.addCardEventListener(BOARD.getCardsOnBoard());
    UI.outputCardsInDeck(BOARD.sizeOfDeck());
  }
}

/**
 * @method - Removes cards from the board.
 * @author - Tavish Wille
 */
function removeCards(cards){
  BOARD.removeCardsFromBoard(cards);
  UI.removeCards(cardIdsArray(cards));
  if(BOARD.getCardsOnBoard().length < BOARD_CARD_MINIMUM && BOARD.sizeOfDeck != 0){
    drawThree();
  }
}

/**
 * @method - Check if a set is valid.
 * @author - Tavish Wille
 */
function checkValidSet(){
  cards = BOARD.getSelectedCards();
  isSet = GAME_LOGIC.isASet(cards);
  if(isSet){
    UI.writeMessage(SET_FOUND_MESSAGE);
    BOARD.clearSelectedCards();
    SELECTED = 0;
    removeCards(cards);
    BOARD.setsFound ++;
    UI.outputSetsFound(BOARD.setsFound);
    BOARD.score += SET_FOUND_POINTS;
    UI.outputScore(BOARD.score);

    /* Check for game over */
    if (BOARD.sizeOfDeck() == 0 && GAME_LOGIC.numberOfSets(BOARD.getCardsOnBoard()) == 0) {
      GAME_OVER = true;
      PAUSED = true;
      UI.writeMessage(GAME_OVER_MESSAGE);
    }
  }
  else{
    UI.clearSelected(cardIdsArray(cards));
    BOARD.clearSelectedCards();
    SELECTED = 0;
    UI.writeMessage(NOT_A_SET_MESSAGE);
  }
}

/**
 * @method - Starts the clock seperate from the rest of the game.
 * @author - Tavish Wille
 */
function setTimerThread(){
  //Iterate timer
  setInterval(function(){
      if(!PAUSED){
        UI.outputTimer(BOARD.timer);
        BOARD.timer++;
      }
  }, 1000);
}

/**
 * @method - Determines if there is a set of the board.
 * @author - Tavish Wille
 */
function findSet(){
  BOARD.score += FIND_SET_PENALTY;
  UI.outputScore(BOARD.score);
  UI.clearSelected(cardIdsArray(BOARD.getSelectedCards()));
  BOARD.clearSelectedCards();
  SELECTED = 0;
  var cards = BOARD.getCardsOnBoard();
  var set = GAME_LOGIC.findASet(cards);
  if(set.length != 0){
    UI.markHint(cardIdsArray(set));
  } else {
    UI.writeMessage(NO_SETS_MESSAGE);
  }
}

/**
 * @method - Returns an array of card IDs given an array of cards.
 * @author - Samuel Maddox
 * @param {array<SetCard>} cards - Array of cards to get IDs from
 * @return {array<String>}
 */
function cardIdsArray(cards) {
  var ids = [];
  for (var i = 0; i < cards.length; i++) {
    ids.push(cards[i].id);
  }
  return ids;
}

/**
 * @method - Updates the game based on the given command.
 * @author - Samuel Maddox
 * @author - Michael Hamill
 * @author - Tavish Wille
 * @param {string} command - Command for next action. 
 * @param {string} [elementId] - ID of calling element.
 * @precondition - elementId required for following commands: ...TODO...
 */
function updateGame(command, elementId = null) {
  if (GAME_OVER) {
    switch(command) {
      case COMMAND.NEW_GAME:
        newGame();
        break;
      case COMMAND.OPEN_RULES:
        UI.openRules();
        break;
      case COMMAND.CLOSE_RULES:
        UI.closeRules();
    }
  } else if(!PAUSED) {
    switch(command) {
      case COMMAND.NEW_GAME:
        newGame();
        break;
      case COMMAND.DRAW_3_CARDS:
        drawThree();
        break;
      case COMMAND.SELECT:
        if (BOARD.cardInSelected(elementId)) {
          BOARD.removeCardFromSelected(elementId);
          UI.unmarkSelectedCard(elementId);
          SELECTED --;
        } else if (SELECTED < NUMBER_OF_SET_VARIATIONS) {
          BOARD.addCardToSelectedFromBoard(elementId);
          UI.markSelectedCard(elementId);
          SELECTED ++;
          if (SELECTED == NUMBER_OF_SET_VARIATIONS) {
            checkValidSet();
          }
        }
        break;
      case COMMAND.OPEN_RULES:
        PAUSED = true;
        UI.openRules();
        break;
      case COMMAND.CLOSE_RULES:
        PAUSED = !PAUSED;
        UI.closeRules();
        break;
      case COMMAND.FIND_SET:
        findSet();
        break;
      case COMMAND.HINT:
        var ans = GAME_LOGIC.numberOfSets(BOARD.getCardsOnBoard());
        var msg = new Message("There are " + ans + " sets", MESSAGE_TYPE.NEUTRAL);
        UI.writeMessage(msg);
        BOARD.score += HINT_PENALTY;
        UI.outputScore(BOARD.score);
        break;
      case COMMAND.PAUSE_TOGGLE:
        PAUSED = true;
        UI.openPause();
        break;
    }
  }
  else if(PAUSED){
    switch(command) {
      case COMMAND.CLOSE_RULES:
        if (!GAME_OVER) {
          PAUSED = false;
        }
        UI.closeRules();
        break;
      case COMMAND.PAUSE_TOGGLE:
        PAUSED = false;
        UI.closePause();
        break;
    }
  }

};