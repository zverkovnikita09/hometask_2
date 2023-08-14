export default function initGame(players) {
  const battleground = document.querySelector(".battleground");
  const playSections = battleground.querySelectorAll(".battle-section");
  const winLine = document.querySelector(".win-line");
  const current_player = document.querySelector(".current-player");
  const endGamePopup = document.querySelector(".end-popup");
  const reloadButton = endGamePopup.querySelector(".reload-game");

  const changeCurrentPlayer = (current) => {
    current_player.className = `current-player turn-${current}`;
    current_player.innerHTML = `Ход игрока <span class="player">${players[current]}</span>`;
  };

  changeCurrentPlayer("x");

  let currentTurn = "x";

  const changeBattlegroundTurn = () => {
    battleground.className = `battleground turn-${currentTurn}`;
  };

  const winCombinations = [
    { condition: [0, 1, 2], transformLine: [0, -120, 0] },
    { condition: [3, 4, 5], transformLine: [0, 0, 0] },
    { condition: [6, 7, 8], transformLine: [0, 120, 0] },
    { condition: [0, 3, 6], transformLine: [-120, 0, 90] },
    { condition: [1, 4, 7], transformLine: [0, 0, 90] },
    { condition: [2, 5, 8], transformLine: [120, 0, 90] },
    { condition: [0, 4, 8], transformLine: [0, 0, 45] },
    { condition: [2, 4, 6], transformLine: [0, 0, -45] },
  ];

  let wonCombination;

  let battlegroundValues = Array(9).fill(null);

  changeBattlegroundTurn();

  const reloadGame = () => {
    endGamePopup.classList.remove("active");
    changeCurrentPlayer("x");
    battleground.classList.remove("unclickable");
    playSections.forEach((item) => (item.className = "battle-section"));
    wonCombination = undefined;
    battlegroundValues = battlegroundValues.map((item) => null);
    winLine.className = "win-line";
    currentTurn = "x";
    changeBattlegroundTurn()
  };

  const nextTurn = () => {
    if (currentTurn === "x") {
      currentTurn = "o";
      changeBattlegroundTurn();
      changeCurrentPlayer("o");
    } else {
      currentTurn = "x";
      changeBattlegroundTurn();
      changeCurrentPlayer("x");
    }
  };

  const checkGameOver = () => {
    let result;

    result = winCombinations.some((item) => {
      if (
        item.condition.every((index) => {
          if (!battlegroundValues[index]) return false;
          if (battlegroundValues[index] === currentTurn) return true;
        })
      ) {
        wonCombination = item;
        return true;
      }
      return false;
    });

    if (battlegroundValues.every((item) => item !== null) && !wonCombination) {
      result = true;
    }

    return result;
  };

  battleground.addEventListener("click", (e) => {
    const element = e.target.closest(".battle-section");

    if (battlegroundValues[element.dataset.index]) return;

    element.classList.add("filled", `fill-${currentTurn}`);
    battlegroundValues[element.dataset.index] = currentTurn;

    if (checkGameOver()) {
      battleground.classList.add("unclickable");
      playSections.forEach((item) => {
        if (!wonCombination?.condition.includes(Number(item.dataset.index))) {
          item.classList.add("gray");
        }
      });

      endGamePopup.classList.add("active");

      reloadButton.addEventListener("click", reloadGame);

      if (wonCombination) {
        winLine.classList.add("visible", `color-${currentTurn}`);
        winLine.style.transform = `translate(${wonCombination.transformLine[0]}px, ${wonCombination.transformLine[1]}px) rotate(${wonCombination.transformLine[2]}deg)`;
        endGamePopup.querySelector(
          ".winner"
        ).innerHTML = `Победил игрок <span class="name win-${currentTurn}">${players[currentTurn]}</span>`;
      } else {
        endGamePopup.querySelector(
          ".winner"
        ).innerHTML = "Ничья";
      }
      return;
    }

    nextTurn();
  });
}
