/* Event Listners for Set Card Game */
window.addEventListener("load", newGame);
window.addEventListener("load", setTimerThread);
document.getElementById("new-game").addEventListener("click", function() {updateGame(COMMAND.NEW_GAME)});
document.getElementById("draw-3-cards").addEventListener("click", function() {updateGame(COMMAND.DRAW_3_CARDS)});
document.getElementById("hint").addEventListener("click", function() {updateGame(COMMAND.HINT)});
document.getElementById("find-set").addEventListener("click", function() {updateGame(COMMAND.FIND_SET)});
document.getElementById("open-rules").addEventListener("click", function() {updateGame(COMMAND.OPEN_RULES)});
document.getElementById("close-rules").addEventListener("click", function() {updateGame(COMMAND.CLOSE_RULES)});
document.getElementById("rules-outer").addEventListener("click", function() {updateGame(COMMAND.CLOSE_RULES)});
document.getElementById("pause-toggle").addEventListener("click", function() {updateGame(COMMAND.PAUSE_TOGGLE)});
document.getElementById("close-pause").addEventListener("click", function(){updateGame(COMMAND.PAUSE_TOGGLE)});
document.getElementById("pause-outer").addEventListener("click", function(){updateGame(COMMAND.PAUSE_TOGGLE)});