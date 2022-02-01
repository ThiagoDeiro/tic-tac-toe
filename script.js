let allCell = document.querySelectorAll("[data-cell]");
let xPlay = document.getElementById("xTurn");
let oPlay = document.getElementById("oTurn");
let turnText = document.getElementById("whosTurn");
let spanTurn = document.getElementById("whosTurn");
const winner = document.getElementById("winner");
let xUnderline = document.getElementById("ifElementIsXStyle");
let oUnderline = document.getElementById("ifElementIsOStyle");
let restartButton = document.getElementById("restartTheGameButton");
// Modal elements!!!
let myModal = document.getElementById("myModal");
let modalSpan = document.getElementById("closeMyModal", [0]);
let modalText = document.getElementById("modalText");

let spanX = document.createElement("span");
let spanO = document.createElement("span");

let player;
let playerX;
let playerO;

let playerThatWasPicked;

let xPosition = [];
let oPosition = [];

let hasAWinner;

let winningPoss = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

xPlay.addEventListener("click", pickASide);
oPlay.addEventListener("click", pickASide);

allCell.forEach((cell) => {
  cell.addEventListener("click", gamePlay);
});

function pickASide(e) {
  const side = e.target.textContent;
  if (side === "X") {
    playerX = side;
    player = playerX;
    playerThatWasPicked = "X";
  } else if (side === "O") {
    playerO = side;
    player = playerO;
    playerThatWasPicked = "O";
  }
  turnText.innerHTML = player === "X" ? "O" : "X";

  if (playerThatWasPicked === "X") {
    xUnderline.style.textDecoration = "none";
    oUnderline.style.textDecoration = "underline";
  } else if (playerThatWasPicked === "O") {
    xUnderline.style.textDecoration = "underline";
    oUnderline.style.textDecoration = "none";
  }
}

function gamePlay(e) {
  e.preventDefault();
  e.stopPropagation();
  const cell = e.target;
  cell.removeEventListener("click", gamePlay);

  const textX = "X is the winner";
  const textO = "O is the winner";
  const itsATie = "It's a tie";

  player = player === "X" ? "O" : "X";
  turnText.innerHTML = player === "X" ? "O" : "X";
  cell.innerHTML = player;

  if (turnText.textContent === "X") {
    xUnderline.style.textDecoration = "underline";
    oUnderline.style.textDecoration = "none";
  } else if (turnText.textContent === "O") {
    xUnderline.style.textDecoration = "none";
    oUnderline.style.textDecoration = "underline";
  }

  if (cell.textContent === "X") {
    xPosition.push(cell.id);
    console.log(xPosition);
  } else if (cell.textContent === "O") {
    oPosition.push(cell.id);
    console.log(oPosition);
  }

  if (xPosition.length >= 3 || oPosition.length >= 3) {
    let numberArrX = xPosition.map((i) => Number(i));
    let numberArrO = oPosition.map((i) => Number(i));
    for (let j = 0; j < winningPoss.length; j++) {
      if (winningPoss[j].every((i) => numberArrX.includes(i))) {
        hasAWinner = true;
        setTimeout(() => {
          checkWinner(textX);
        }, 500);
      } else if (winningPoss[j].every((i) => numberArrO.includes(i))) {
        hasAWinner = true;
        setTimeout(() => {
          checkWinner(textO);
        }, 500);
      } else if (
        numberArrX.length >= 5 &&
        !winningPoss[j].every(
          (r) =>
            numberArrX.includes(r) ||
            (oPosition.length >= 3 &&
              winningPoss[j].every((r) => numberArrO.includes(r)))
        )
      ) {
        hasAWinner = true;
        setTimeout(() => {
          checkWinner(itsATie);
        }, 500);
      } else if (
        numberArrO.length >= 5 &&
        !winningPoss[j].every(
          (r) =>
            numberArrO.includes(r) ||
            (numberArrX.length >= 3 &&
              winningPoss[j].every((r) => numberArrX.includes(r)))
        )
      ) {
        hasAWinner = true;
        setTimeout(() => {
          checkWinner(itsATie);
        }, 500);
      }
    }
  }
  // this if statement is to check if we have a winner and if we do remove onclick event from all cells!
  if (hasAWinner === true) {
    allCell.forEach((cell) => {
      cell.removeEventListener("click", gamePlay);
    });
  }
}

function checkWinner(text) {
  modalText.innerHTML = text;
  return (myModal.style.display = "block");
}
modalSpan.onclick = function () {
  myModal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target == myModal) {
    myModal.style.display = "none";
  }
};

function restartTheGame() {
  myModal.style.display = "none";
  console.log(restartButton.href);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
