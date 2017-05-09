/**
 * @constructor - Provides Set game logic
 * @author - Samuel Maddox
 * @author - Gabrielle Price
 */
function SetGameLogic() {

  /**
   * 
   * @method - Returns true if the given cards are a set.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Cards that are being checked if they 
   *    are in the same set.
   * @precondition - The number of cards in "cards" is exactly 3.
   * @invariant - "cards" will NOT be changed
   * @return {boolean}
   */
  this.isASet = function (cards) {
    if(checkColor(cards)) {
      if(checkSymbol(cards)) {
        if(checkShading(cards)) {
          if(checkNumber(cards)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * @method - Returns true if the given have all same or different colors.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Cards that are being checked if they 
   *    ahave the same color.
   * @precondition - The number of cards in "cards" is exactly 3.
   * @invariant - "cards" will NOT be changed
   * @return {boolean}
   */
  function checkColor(cards) {

    if (cards[0].color==cards[1].color && cards[0].color==cards[2].color && cards[1].color==cards[2].color) {
      return true;
    } else if (cards[0].color!=cards[1].color && cards[0].color!=cards[2].color && cards[1].color!=cards[2].color) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @method - Returns true if the given have all same or different symbols.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Cards that are being checked if they 
   *    have the same symbol.
   * @precondition - The number of cards in "cards" is exactly 3.
   * @invariant - "cards" will NOT be changed
   * @return {boolean}
   */
  function checkSymbol(cards) {
    if(cards[0].symbol==cards[1].symbol && cards[0].symbol==cards[2].symbol && cards[1].symbol==cards[2].symbol) {
      return true;
    } else if(cards[0].symbol!=cards[1].symbol && cards[0].symbol!=cards[2].symbol && cards[1].symbol!=cards[2].symbol) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @method - Returns true if the given have all same or different shading.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Cards that are being checked if they 
   *    have the same shading.
   * @precondition - The number of cards in "cards" is exactly 3.
   * @invariant - "cards" will NOT be changed
   * @return {boolean}
   */
  function checkShading(cards) {
    if(cards[0].shading==cards[1].shading && cards[0].shading==cards[2].shading && cards[1].shading==cards[2].shading) {
      return true;
    } else if(cards[0].shading!=cards[1].shading && cards[0].shading!=cards[2].shading && cards[1].shading!=cards[2].shading) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @method - Returns true if the given have all same or different number.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Cards that are being checked if they 
   *    have the same number.
   * @precondition - The number of cards in "cards" is exactly 3.
   * @invariant - "cards" will NOT be changed
   * @return {boolean}
   */
  function checkNumber(cards) {
    if(cards[0].number==cards[1].number && cards[0].number==cards[2].number && cards[1].number==cards[2].number) {
      return true;
    } else if(cards[0].number!=cards[1].number && cards[0].number!=cards[2].number && cards[1].number!=cards[2].number) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @method - Returns the number of sets in the given group of cards
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Group of cards to count the number of 
   *    sets in.
   * @invariant - "cards" will NOT be changed   
   * @return {number}
   */
  this.numberOfSets = function (cards) {
    count=0;
    q=0;
    while(cards.length-q >= 3) {
      card1=cards[q]; 
      for(i=q+1;i<cards.length-1;i++) {
        card2=cards[i];
        for(r=i+1;r<cards.length;r++) {
          card3=cards[r];
          if  (this.isASet([card1, card2, card3])) {
            count++;
          }
        } 
      }
      q+=1;
    }
    return(count);
  };

  /**
   * 
   * @method - Returns a set of cards if there is one or an empty array if 
   *    there isn't.
   * @author - Gabrielle Price
   * @param {array<SetCard>} cards - Group of cards to find a set in 
   * @invariant - "cards" will NOT be changed   
   * @return {array<SetCard>}
   */
  this.findASet = function (cards) {
    q=0;
    while(cards.length-q >= 3) {
      card1=cards[q]; 
      for(i=q+1;i<cards.length-1;i++) {
        card2=cards[i];
        for(r=i+1;r<cards.length;r++) {
          card3=cards[r];
          if  (this.isASet([card1, card2, card3])) {
            return [card1, card2, card3];
          }
        } 
      }
      q+=1;
    }
    return([]);
  };
}








