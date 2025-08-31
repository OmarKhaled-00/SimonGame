/* 1. Start game will be by clicking on ready button
   2. The game should produce random numbers from 1 to 4
   3. When the random number is being produced , the square should flash by using
      - display:none
      - fadeIn(100).fadeOut(100)
    4. The game should wait until user click on the right square
    5. The game should check if the user is clicked on the right square and choose the right
    sequence.
    6. If the user chose right , the level will be incremented and the game should start 
    again
    7. else the game will be over and display game over on the screen and the body is red*/

// Function for start game , it should include the random number do the actions required

// An array that holds the game pattern
const gamePattern = [];
// An array that holds the colors red , green , blue , yellow : which is used as an id
const buttonClick = ["green", "red", "yellow", "blue"];
// An array to store user clicked
const userClickedPattern = [];
// a "level" Variable fro the game is level
let level = 0;
// Complexity for the game
let speed = 500;

function startGame() {
  if (level === 10) {
    console.log("complexity is done");
    // Make userClickedButton is empty at the beginning
    userClickedPattern.length = 0;
    //increment level
    level++;
    // Display level at the top of the body
    $("#level-title").text("Level " + level);
    for (let i = 0; i < 2; i++) {
      // Create a variable that holds the random numbers from 0 to 3
      let randNum = Math.floor(Math.random() * 4); // 0 , 1 , 2 , 3 that can be used to choose colours from buttonClick
      // Store the result in a new variable but not with a number with a color string then store it in gamePattern
      let randomChosenColour = buttonClick[randNum];
      // Store the result in game Pattern
      gamePattern.push(randomChosenColour);
      // Flash this color to make user know which color is flashed
      flashButton(randomChosenColour);
      // play the colour sound
      playSound(randomChosenColour);
    }
  } else {
    // Make userClickedButton is empty at the beginning
    userClickedPattern.length = 0;
    //increment level
    level++;
    // Display level at the top of the body
    $("#level-title").text("Level " + level);
    // Create an array that holds the random numbers from 0 to 3
    let randNum = Math.floor(Math.random() * 4); // 0 , 1 , 2 , 3 that can be used to choose colours from buttonClick
    // Store the result in a new variable but not with a number with a color string then store it in gamePattern
    let randomChosenColour = buttonClick[randNum];
    // Store the result in game Pattern
    gamePattern.push(randomChosenColour);
    // Flash this color to make user know which color is flashed
    flashButton(randomChosenColour);
    // play the colour sound
    playSound(randomChosenColour);
  }
  console.log(gamePattern);
}

// Start game will be by clicking on ready button

$(".ready").click(function () {
  $(".ready").css("display", "none");
  startGame();
});

// user Clicked
$(".btn").click(function () {
  // Create a variable that holds the id of the button
  let userChosenColour = $(this).attr("id");
  // Store the result in userClickedPattern
  userClickedPattern.push(userChosenColour);
  // Flash the button
  flashButton(userChosenColour);
  // play the sound
  playSound(userChosenColour);
  // if length is 1 so, it will check index 0 , if length =2 , index=1
  /* becauser we reset userClickedPattern every sequence , so every index will be checked
  with index of gamePattern that is already store the right pattern */
  checkAnswer(userClickedPattern.length - 1);
});

// Function to play the music
function playSound(soundType) {
  let audio = new Audio("sounds/" + soundType + ".mp3");
  audio.currentTime = 0;
  audio.play();
}

// Function to flash the button
function flashButton(buttonType) {
  $("#" + buttonType).addClass("boxEffect");
  setTimeout(() => {
    $("#" + buttonType).removeClass("boxEffect");
  }, 100);
}

// Function to check answer

function checkAnswer(index) {
  // Check the equality between two patterns for every index
  if (gamePattern[index] === userClickedPattern[index]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        startGame();
      }, speed);
    }
  } else {
    userIsFailed();
  }
}

function userIsFailed() {
  gamePattern.length = 0;
  level = 0;
  $("#level-title").text("Game Over");
  $("body").css("backgroundColor", "red");
  playSound("wrong");
  setTimeout(() => {
    $("body").css("backgroundColor", "#011f3f");
  }, 100);
  $(".ready").css("display", "flex");
}
