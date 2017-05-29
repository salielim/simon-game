// Initialise variables
var game = {
  count: 0,
  boxes: ['#green','#pink', '#yellow', '#blue'],
  currentGame: [],
  playerBox: [],
  sound:{
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    pink: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

// Sound for error
var errorSound = new Audio('https://freesound.org/data/previews/142/142608_1840739-lq.mp3');
errorSound.volume = 0.3;

// Sounds for the boxes
function sound(name) {
  switch(name) {
    case'#green':
      game.sound.green.play();
      break;
    case '#pink':
      game.sound.pink.play();
      break;
    case '#yellow':
      game.sound.yellow.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
  };
}

// Starting a new game
document.getElementById("start").onclick = newGame;
function newGame() {
  resetGame();
}

// Reset the game
document.getElementById("reset").onclick = resetGame;
function resetGame() {
  game.currentGame = [];
  game.count = 0;
  nextRound();
  $('#status').html("You're on round 1");
}

// Reset boxes sequence
function resetBoxes() {
  game.playerBox = [];
}

// Start next round, add count
function nextRound() {
  game.count++;
  $('#count').html("Round: " + game.count);
  
  game.currentGame.push(game.boxes[(Math.floor(Math.random()*4))]);
  flashBoxes();
}

// Strict mode or not strict mode
document.getElementById("strict").onclick = strict;
function strict() {
  if (game.strict == false) {
    game.strict = true;
    $('#strict').html('<i class="fa fa-bomb" aria-hidden="true"></i>	&nbsp;Strict: On');
  } else {
    game.strict = false;
    $('#strict').html('<i class="fa fa-bomb" aria-hidden="true"></i>	&nbsp;Strict: Off');
  }
  newGame();
}

// Flash each box
function flashABox(box) {
  $(box).addClass('fadebox');
  sound(box);
  setTimeout(function(){
      $(box).removeClass('fadebox');
  }, 300);
}

// Flash series of boxes
function flashBoxes() {
  var i = 0;
  var moves = setInterval(function(){
    flashABox(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)
  resetBoxes();
}

// Push box sequence into array
function addBox(id) {
  var box = "#"+id
  game.playerBox.push(box);
  playersMove(box);
} 

// Player's move & check if moves are right
function playersMove(x) {
  if (game.playerBox[game.playerBox.length - 1] !== game.currentGame[game.playerBox.length - 1]) {
    if(game.strict){
      $('#status').html("Wrong move, back to round 1");
      errorSound.play();
      newGame();
    } else {
      $('#status').html("Wrong move, try again!");
      errorSound.play();
      flashBoxes();
    }
   } else {
      sound(x);
      var check = game.playerBox.length === game.currentGame.length;
      if (check) {
        if(game.count == 20){
          $('#status').html("Congrats, you've won!");
        } else {
          alert('Next round no. ' + (game.count+1));
          $('#status').html("You're on round " + (game.count+1));
          nextRound();
        }
      }
    }
}