/**
 * TODO
 * @constructor - Represents a Set board
 * @author - Samuel Maddox
 * @author - Michael Hamill
 *
 * @property {number} setsFound - The ID of a card
 * @property {number} score - The color of the card
 */
function SetBoard() {
  /* @public */
  this.setsFound = 0;
  this.score = 0;
  this.timer = 0;

  /* @private */
  this.deck = new SetDeck();
  this.cardsOnBoard = [];
  this.cardsSelected = [];

  /* Shuffle the deck */
  this.deck.shuffleDeck();

  /**
   * @method - Draws a single card from the deck.
   * @author - Samuel Maddox
   * @precondition - deck.sizeOfDeck() > 0
   * @postcondition - deck.sizeOfDeck() -= 1
   * @return {SetCard}
   */
  this.drawCardFromDeck = function () {
    return this.deck.drawCard();
  };

  /**
   * @method - Returns the number of cards in the deck.
   * @author - Michael Hamill
   * @invariant - deck.sizeOfDeck() remains the same
   * @return {number}
   */
  this.sizeOfDeck = function () {
    return this.deck.size();
  };

  /**
   * @method - Add's a card to the board.
   * @author - Samuel Maddox
   * @param {SetCard} card - Card to be added to the board
   * @postcondition - The number of cards on the board increases by 1
   */
  this.addCardToBoard = function (card) {
    this.cardsOnBoard.push(card);    
  };

  /**
   * @method - Returns all the cards on the board.
   * @author - Samuel Maddox
   * @return {array<SetCard>}
   */
  this.getCardsOnBoard = function () {
    return this.cardsOnBoard;
  };

  /**
   * @method - Removes cards from the board.
   * @author - Michael Hamill
   * @param {array<SetCard>} cards - Cards to be removed from the board.
   */
  this.removeCardsFromBoard = function (cards /* array */) {
    for (var i = 0; i < cards.length; i++) {
      var pos = this.cardsOnBoard.indexOf(cards[i]);
      if(pos >= 0) {
        this.cardsOnBoard.splice(pos, 1);
      }
    }
  };

  /**
   * @method - Adds a card from the board to the selected set
   * @author - Samuel Maddox
   * @param {string} cardId - Card to be added the selected set
   * @precondition - cardId is a value of a card that is on the board
   * @postcondition - The number of cards selected increases by 1
   */
  this.addCardToSelectedFromBoard = function (cardId) {
    for (var i = 0; i < this.cardsOnBoard.length; i++) {
      if (this.cardsOnBoard[i].id == cardId) {
        this.cardsSelected.push(this.cardsOnBoard[i]);
      }
    }
  };

  /**
   * @method - Returns all the cards that are selected.
   * @author - Michael Hamill
   * @return {array<SetCard>}
   */
  this.getSelectedCards = function () {
    return this.cardsSelected;
  };

  /**
   * @method - Returns true if card with cardId is selected
   * @author - Samuel Maddox
   * @param {string} cardId - SetCard.id of card being searched for.
   * @return {SetCard}
   */
  this.cardInSelected = function (cardId) {
    for (var i = 0; i < this.cardsSelected.length; i++) {
      if (this.cardsSelected[i].id == cardId) {
        return true;
      }
    }
    return false;
  }

  /**
   * @method - Removes card from selected
   * @author - Samuel Maddox
   * @param {string} cardId - SetCard.id of card to be removed.
   */
  this.removeCardFromSelected = function (cardId) {
    for (var i = 0; i < this.cardsSelected.length; i++) {
      if (this.cardsSelected[i].id == cardId) {
        this.cardsSelected.splice(i, 1);
        break;
      }
    }
  }

  /**
   * @method - Returns number of selected cards
   * @author - Michael Hamill
   * @return {number}
   */
  this.numberOfSelectedCards = function () {
    return this.cardsSelected.length;
  }

  /**
   * @method - Clears all cards from the selected set
   * @author - Michael Hamill
   * @postcondition - The number of cards in the selected set is 0
   */
  this.clearSelectedCards = function () {
    this.cardsSelected = [];
  };
}
