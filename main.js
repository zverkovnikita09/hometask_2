import "./src/css/style.scss";
import initGame from "./src/js/initGame";

const startPopup = document.querySelector(".start-popup");

const firstPlayerForm = startPopup.querySelector(".step-1");
const secondPlayerForm = startPopup.querySelector(".step-2");

const firstTurnBlock = startPopup.querySelector(".first-turn");

let firstPlayer;
let secondPlayer;

firstPlayerForm.addEventListener("submit", (e) => {
  const input = firstPlayerForm.querySelector("input");
  e.preventDefault();
  if (!input.value) return;
  firstPlayer = input.value;
  toSecondScreen();
});

function toSecondScreen() {
  firstPlayerForm.classList.remove("active");
  secondPlayerForm.classList.add("active");
  const input = secondPlayerForm.querySelector("input");
  input.value = "";
  input.focus();
  secondPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value) return;
    secondPlayer = input.value;
    toThirdScreen();
  });
}

function toThirdScreen() {
  secondPlayerForm.classList.remove("active");
  firstTurnBlock.classList.add("active");
  const player1_button = firstTurnBlock.querySelector(".player-button.is--1");
  const player2_button = firstTurnBlock.querySelector(".player-button.is--2");

  player1_button.innerText = firstPlayer;
  player1_button.addEventListener("click", () => {
    startPopup.classList.remove("active");
    firstTurnBlock.classList.remove("active");
    initGame({ x: firstPlayer, o: secondPlayer });
  });

  player2_button.innerText = secondPlayer;
  player2_button.addEventListener("click", () => {
    startPopup.classList.remove("active");
    firstTurnBlock.classList.remove("active");
    initGame({ x: secondPlayer, o: firstPlayer });
  });
}