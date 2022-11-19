
const image = document.getElementById("img");
const password_field = document.getElementById("field");
const keys = document.getElementsByClassName("letter");
const replay_button = document.getElementById("replay-btn");
const game_Over_Panel = document.getElementById("gameover-panel");
const game_result_label = document.getElementById("game-result");
const attempts = document.getElementById("attempts");

const MAX_FAILS = 5;
var password = "";
var hashedPassword = "";
var failures = 0;
var passwordLength = 0;
var gameOver = false;

Array.prototype.forEach.call(keys, function (el) {
  el.addEventListener("click", () => {
    check(el);
  });
});

replay_button.addEventListener("click", () => {
  window.location.reload();
});

function hidePassword(password) {
  for (let index = 0; index < password.length; index++) {
    hashedPassword += "-";
  }
}

function check(element) {
  var match = false;
  var key = element.innerHTML;
  for (let index = 0; index < password.length; index++) {
    if (password.charAt(index) == key) {
      match = true;
      hashedPassword = setCharAt(hashedPassword, index, key);
    }
  }
  password_field.innerHTML = hashedPassword;
  if (match == false) {
    failures += 1;
    attempts.textContent = `Attempts: ${MAX_FAILS - failures}`
    element.classList.add("fail");
    element.disabled = true;
    updateImg(failures);
  }

  checkIfPasswordWasFound();

  if (gameOver == true) {
    game_Over_Panel.classList.add("gameOver");
  }
}

function getRandomWord(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var index = Math.floor(Math.random() * (max - min)) + min;

  return passwords[index].toUpperCase();
}

function startUp() {
  password = getRandomWord(0, passwords.length);
  hidePassword(password);

  password_field.innerHTML = hashedPassword;

  var passwordSubstrings = password.split(" ");

  passwordSubstrings.forEach((el) => {
    passwordLength += el.length;
  });
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  else return str.substr(0, index) + chr + str.substr(index + 1);
}

function updateImg(fails) {
  image.src = "./img/gallows-" + fails + ".png";
}

function checkIfPasswordWasFound() {
  var discoveredLettersCount = 0;

  for (let index = 0; index < password.length; index++) {
    if (hashedPassword.charAt(index) == "-") continue;
    discoveredLettersCount += 1;
  }

  if (discoveredLettersCount == passwordLength) {
    gameOver = true;
    game_result_label.innerHTML = "You Won !!!!";
  } else if (failures == MAX_FAILS) {
    gameOver = true;
    game_result_label.innerHTML = "You Lost :(";
    game_result_label.style.color = "red";
  }
}

window.onload = startUp;