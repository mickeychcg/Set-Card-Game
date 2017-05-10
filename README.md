# Set Card Game

## Authors:
  Michael Hamill
  Gabrielle Price
  Samuel Maddox
  Tavish Wille

## How to Run the Program:

  This program is a web based game that is run a JavaScript enabled browser. There are two ways to run this program.

  **Option A:**
  Navigate to [samuelmaddox17.github.io/Set-Card-Game/](samuelmaddox17.github.io/Set-Card-Game/)

  **OptionB:**
  1. Navigate to [github.com/SamuelMaddox17/Set-Card-Game](github.com/SamuelMaddox17/Set-Card-Game)
  2. Click on the green "Clone or download" button
  3. Download as a zip file
  4. Unzip the downloaded file
  5. Navigate into the unziped directory
  6. Open "index.html"

## Notes on Scoring:
  - Each set earns three points
  - Hint loses one point
  - Showing a set loses three points  

## Documentation Style Used:

  We used our own custom version of JSDoc for function documentation

## Implemented Functionality:

  - Game deals the appropriate number of cards
  - Verifies the correctness of player-identified sets
  - Replaces the identified cards with new ones
  - Keeps track of score to identify a winner
  - Graphical front-end
  - Timer to race against
  - Hint geneartor
  - Clicking on hint will inform the user how many sets there are onthe board.
  - Clicking on find a set will highlight cards

## Things of note:

  - Circle and rectangle cards are generated using pure html and css. The only image used for them is for a stripes background. This left only 9 images for all the triangle variations.
  - Timer pauses when viewing rules
  - Button shadow shortens when button is clicked.
  - Implemented javascript pop up window for rules and pause screen.
  - Game was not designed specifically for mobile, but we made sure that 
    it doesn't break for mobile.
  - HTML and CSS pass validation

## Known Bugs:

  - There is no limit on the number of cards that are on the board. There is also no penalty for drawing cards when there is a set on the board. This makes it possible to get a perfect score simply by drawing all the cards at the beginning of the game and then find all the sets.

## What I (Samuel Maddox) Worked On:

  Almost all of the HTML and CSS was written by me. The architecture of our JavaScript was also designed by me and was my first attempt at trying to apply the model-view controller architecture to a project. I wrote nearly all the documentation for each function so when my group came back from spring break (this project was assigned over spring break, how cruel) all my team would have to do is fill out function bodies. In addition I implmented a significant portion of the functions in the JavaScript files. Looking at the documentation of files will show my name in the author field for many functions. I'd like to note that there are also many functions that I gave input/direction on that I did not bother attaching my name to since I felt I didn't contribute signifcantly to the implemention of that specfic funtion. Therefore I have or at least had a very thorough understanding of this project.

## Grade Recieved:

  The highest A out of the class.
