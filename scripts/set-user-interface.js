/**
 * @constant {number}
 * @author - Michael Hamill
 * @description - Constant for seconds.
 */
var ONE_MINUTE= 60;

/**
 * @constructor - Provides user interface methods for the Set Card Game
 * @author - Samuel Maddox
 * @author - Michael Hamill
 */
function SetUserInterface() {


  /**
   * @method - Opens the rules window.
   * @author - Michael Hamill
   * @precondition - Rules window is NOT open.   
   * @postcondition - Rules window is open.
   */
  this.openRules = function () {
    document.getElementById("rules-outer").style.display = "block";
    document.getElementById("rules-inner").style.display = "block";
  };

  /**
   * @method - Closes the rules window.
   * @author - Michael Hamill
   * @precondition - Rules window is open.
   * @postcondition - Rules window is NOT open
   */
  this.closeRules = function () {
    document.getElementById("rules-outer").style.display = "none";
    document.getElementById("rules-inner").style.display = "none";
  };

  /**
   * @method - Opens the pause window.
   * @author - Michael Hamill
   * @precondition - Pause window is NOT open.   
   * @postcondition - Pause window is open.
   */
  this.openPause = function () {
    document.getElementById("pause-outer").style.display = "block";
    document.getElementById("pause-inner").style.display = "block";
  };

  /**
   * @method - Pause the rules window.
   * @author - Michael Hamill
   * @precondition - Pause window is open.
   * @postcondition - Pause window is NOT open
   */
  this.closePause = function () {
    document.getElementById("pause-outer").style.display = "none";
    document.getElementById("pause-inner").style.display = "none";
  };

  /**
   * @method - Outputs the the value for the number of cards in the deck
   *    displayed to the user.
   * @author - Michael Hamill
   * @param {number} value - The number of cards in the deck.
   */
  this.outputCardsInDeck = function (value) {
    document.getElementById("deck-count").innerHTML = value;
  };

  /**
   * @method - Outputs the the value for the number of sets found displayed
   *    to the user.
   * @author - Michael Hamill
   * @param {number} value - The number of sets found.
   */
  this.outputSetsFound = function (value) {
    document.getElementById("found-sets").innerHTML = value;
  };

  /**
   * @method - Outputs the the value for the score displayed to the user.
   * @author - Michael Hamill
   * @param {number} value - The score.
   */
  this.outputScore = function (value) {
    document.getElementById("score").innerHTML = value;
  };

  /**
   * @method - Outputs the the value for the timer displayed to the user.
   * @author - Michael Hamill
   * @param {number} value - The number of seconds since the start of the
   *    the game.
   */
  this.outputTimer = function (value) {
    
    /* convert seconds into minutes and seconds */

    var minutes = Math.floor(value / ONE_MINUTE);
    var seconds = value - minutes * ONE_MINUTE;
    document.getElementById("timer").innerHTML = minutes + " min " + seconds + " sec";

  };

  /**
   * @method - Writes a message to the user providing neutral helpful 
   *    information, success message, or failure message.
   * @author - Michael Hamill
   * @param {Message} message - A message to be displayed to the user.
   */
  this.writeMessage = function (message) {
    document.getElementById("message").className =  message.type;
    document.getElementById("message").innerHTML = "<p>" + message.message + "</p>";
  };

  /**
   * @method - Outputs given cards to the screen.
   * @author - Samuel Maddox
   * @param {array<SetCard>} cards - An array of cards to be printed to 
   *    the screen.
   * @postcondition - element ids will match SetCard.id
   * @invariant - "cards" unchanged.
   */
  this.outputCards = function (cards) {
    for (var i = 0; i < cards.length; i++) {
      var tmp = "<li id=\"" + cards[i].id + "\" class=\"" + 
                cards[i].number + " " + cards[i].shading + " " + 
                cards[i].color + " " + cards[i].symbol + "\">\n";
      tmp += "<div class=\"first slot\"></div>\n";
      tmp += "<div class=\"second slot\"></div>\n";
      tmp += "<div class=\"third slot\"></div>\n";
      tmp += "</li>\n";
      document.getElementById("cards").innerHTML += tmp;
    }
  };

  /**
   * @method
   * @author - Samuel Maddox
   * @param {array<SetCard>} cards - An array of cards to add event 
   *    listeners to.
   * @precondition - outputCards(cards) has been called.
   * @invariant - "cards" unchanged.
   */
  this.addCardEventListener = function (cards) {
    for (var i = 0; i < cards.length; i++) {
      document.getElementById(cards[i].id).addEventListener("click", function () {updateGame(COMMAND.SELECT, this.id)});
    }
  };

  /**
   * @method - Removes cards from the screen.
   * @author - Michael Hamill
   * @param {array<string>} cardIds - An array of card IDs to removed from 
   *    the screen.
   * @precondition - element ids match SetCard.id
   * @invariant - "cardIds" unchanged.
   */
  this.removeCards = function (cardIds) {
    for (var i = 0; i < cardIds.length; i++) {
      document.getElementById(cardIds[i]).outerHTML = "";
    }
  };

  /**
   * @method - Marks a card on the screen that has been selected.
   * @author - Samuel Maddox
   * @param {string} cardId - The ID of a card to be marked on the screen.
   * @precondition - element ids match SetCard.id
   * @invariant - "cardId" unchanged.
   */
  this.markSelectedCard = function (cardId) {
    document.getElementById(cardId).className += " selected";
  };

  /**
   * @method - Unmarks a card on the screen that has been selected.
   * @author - Samuel Maddox
   * @param {string} cardId - The ID of a card to be unmarked.
   * @precondition - element ids match SetCard.id
   * @invariant - "cardId" unchanged.
   */
  this.unmarkSelectedCard = function (cardId) {
    document.getElementById(cardId).classList.remove("selected");
  };

  /**
   * @method - Unmarks all selected cards on the screen.
   * @author - Michael Hamill
   * @param {array<string>} cardIds - An array of card IDs to be unmarked.
   */
  this.clearSelected = function (cardIds /* array */) {
    for(var i = 0; i < cardIds.length; i++) {
      document.getElementById(cardIds[i]).classList.remove("selected");
    }
  };

  /**
   * @method - Marks the cards on the screen that are part of a hint.
   * @author - Michael Hamill
   * @param {array<string>} cardIds - An array of card IDs to be marked as
   *    hint cards.
   * @precondition - element ids match SetCard.id
   * @invariant - "cardIds" unchanged.
   */
  this.markHint = function (cardIds /* array */) {
    for(var i = 0; i < cardIds.length; i++) {
      document.getElementById(cardIds[i]).className += " hint";
    }
  };

  /**
   * @method - Unmarks all hint cards on the screen.
   * @author - Michael Hamill
   * @param {array<string>} cardIds - An array of card IDs to be unmarked.
   */
  this.clearHint = function (cardIds /* array */) {
    for(var i = 0; i < cardIds.length; i++) {
      document.getElementById(cardIds[i]).classList.remove("hint");
    }
  };
}