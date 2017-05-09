/**
 * @constant {object}
 * @author - Samuel Maddox
 * @description - Every message has one of these types.
 */
var MESSAGE_TYPE = {
  NEUTRAL: "neutral",
  SUCCESS: "success",
  FAILURE: "failure"
}

/**
 * @constructor - Represents a Message to be displayed to the user
 * @author - Samuel Maddox
 * @param {string} message - The ID of a card
 * @param {string} type - The type of the message (precondition: value 
      matches one found in MESSAGE_TYPES.color)
 */
function Message(message, type) {
  this.message = message;
  this.type = type;
}

/**
 * @TODO
 * @constant {Message}
 * @author - Samuel Maddox
 * @author - 
 * @description - Messages to be displayed to the user
 */
NEW_GAME_MESSAGE = new Message("New Game! Click on a card to mark it as part of " +
                       "a set. Click on card again to unmark it", 
                       MESSAGE_TYPE.NEUTRAL);
SET_FOUND_MESSAGE = new Message("Set Found!", MESSAGE_TYPE.SUCCESS);
NOT_A_SET_MESSAGE = new Message("Not a set.", MESSAGE_TYPE.FAILURE);
NO_SETS_MESSAGE = new Message("There are 0 sets", MESSAGE_TYPE.NEUTRAL);
GAME_OVER_MESSAGE = new Message("Game Completed!", MESSAGE_TYPE.SUCCESS);