/**
 * @constant {number}
 * @author - Samuel Maddox
 * @description - Each feature of a card has the same number of variations.
 */
var NUMBER_OF_SET_VARIATIONS = 3;

/**
 * @constant {object}
 * @author - Samuel Maddox
 * @description - Each feature has three these and only these possible 
 *    values.
 */
var SET_CARD_VALUES = {
  color: ["red", "green", "blue"],
  symbol: ["oval", "rectangle", "triangle"],
  number: ["one", "two", "three"],
  shading: ["open", "striped", "solid"]
}

/**
 * @constructor - Represents a Set cards
 * @author - Samuel Maddox
 *
 * @property {string} id - The ID of a card
 * @property {string} color - The color of the card
 * @property {string} symbol - The symbol of the card
 * @property {string} number - The number value of the card 
 * @property {string} shading - The shading of the card
 *
 * @param {string} cardID - The ID of a card
 * @param {string} cardColor - The color of the card
 * @param {string} cardSymbol - The symbol of the card
 * @param {string} cardNumber - The number value of the card
 * @param {string} cardShading - The shading of the card

 * @precondition - Value of "cardColor" matches one found in 
 *    SET_CARD_VALUES.color
 * @precondition - Value of "cardSymbol" matches one found in 
 *    SET_CARD_VALUES.symbol
 * @precondition - Value of "cardNumber" matches one found in 
 *    SET_CARD_VALUES.number
 * @precondition - Value of "cardShading" matches one found in 
 *    SET_CARD_VALUES.shading
 */
function SetCard(cardID, cardColor, cardSymbol, cardNumber, cardShading) {
  /** @public */
  this.id = cardID;
  this.color = cardColor;
  this.symbol = cardSymbol;
  this.number = cardNumber;
  this.shading = cardShading;
}

/**
 * @constructor - Represents a deck of Set cards.
 * @author - Samuel Maddox
 * @invariant - All cards have a unique ID.
 */
function SetDeck() {
  /** @private */
  this.cards = [];

  /* Creat a complete deck of Set cards with a unique card ID */
  var id = 0;
  for (var i = 0; i < NUMBER_OF_SET_VARIATIONS; i++) {
    for (var j = 0; j < NUMBER_OF_SET_VARIATIONS; j++) {
      for (var k = 0; k < NUMBER_OF_SET_VARIATIONS; k++) {
        for (var l = 0; l < NUMBER_OF_SET_VARIATIONS; l++) {
          this.cards.push(new SetCard("card-" + id,
              SET_CARD_VALUES.color[i], SET_CARD_VALUES.symbol[j], 
              SET_CARD_VALUES.number[k], SET_CARD_VALUES.shading[l]));
          id++;
        }
      }
    }
  }

  /**
   * @method - Shuffles the deck using the Durstenfeld shuffle algorithm
   * @author - Samuel Maddox
   * @invariant - SetDeck.size() remains the same.
   */
  this.shuffleDeck = function() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var tmp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = tmp;
    }
  }

  /**
   * @method - Removes and returns a card from the deck.
   * @author - Samuel Maddox
   * @precondition - SetDeck.size() > 0;
   * @postcondition - SetDeck.size() -= 1;
   * @return {SetCard}
   */
  this.drawCard = function() {
    return this.cards.pop();
  }

  /**
   * @method - Returns the number of cards in the deck.
   * @author - Samuel Maddox
   * @invariant - SetDeck.size() remains the same
   * @return {number}
   */
  this.size = function() {
    return this.cards.length;
  }
}