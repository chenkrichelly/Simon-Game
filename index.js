
let order = [];
let playerOrder = [];
let flash;
let turn;
let success;
let computer;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

function playSound(name) {
  var audio = new Audio("sounds/simonSound" + name + ".mp3");
  audio.play();
}

const turnCounter = $("#turn").get(0);
const green = $("#green").get(0);
const red = $("#red").get(0);
const yellow = $("#yellow").get(0);
const blue = $("#blue").get(0);
const strictButton = $("#strict").get(0);
const onButton = $("#on").get(0);
const startButton = $("#start").get(0);

strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('change', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  success = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  computer = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    computer = false;
    clearColor();
    on = true;
  }

  if (computer) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) press("green");
      if (order[flash] == 2) press("red");
      if (order[flash] == 3) press("yellow");
      if (order[flash] == 4) press("blue");
      flash++;
    }, 200);
  }
}

function press(color) {
  if (noise) {
    playSound(color);
  }
  noise=true;
  choose(color);
}

function clearColor() {
  green.style.backgroundColor = "darkgreen";
  red.style.backgroundColor = "darkred";
  yellow.style.backgroundColor = "goldenrod";
  blue.style.backgroundColor = "darkblue";
}

function flashColor() {
  green.style.backgroundColor = "lightgreen";
  red.style.backgroundColor = "tomato";
  yellow.style.backgroundColor = "yellow";
  blue.style.backgroundColor = "lightskyblue";
}

function choose(color) {
  if (color == "green")
      green.style.backgroundColor = "lightgreen";
  else if (color =="red")
      red.style.backgroundColor = "tomato";
  else if (color =="yellow")
      yellow.style.backgroundColor = "yellow";
  else if (color =="blue")
      blue.style.backgroundColor = "lightskyblue";
}

green.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    press("green");
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

red.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    press("red");
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

yellow.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    press("yellow");
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

blue.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    press("blue");
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    success = false;
  if (playerOrder.length == 20 && success) {
    winGame();
  }

  if (success == false) {
    flashColor();
    playSound("wrong");
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        computer = true;
        flash = 0;
        playerOrder = [];
        success = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && success && !win) {
    turn++;
    playerOrder = [];
    computer = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
