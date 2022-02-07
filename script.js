let allCells = document.querySelectorAll("[data-cell]");
let xElement = document.getElementById("xTurn");
let oElement = document.getElementById("oTurn");
let restartButton = document.getElementById("restartTheGameButton");

let myModal = document.getElementById("myModal");
let modalSpan = document.getElementById("closeMyModal", [0]);
let modalText = document.getElementById("modalText");

let allWinningPossibility = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

allCells.forEach((cell) => {
  cell.addEventListener("click", cellPosition);
});

xElement.addEventListener("click", pickASide);
oElement.addEventListener("click", pickASide);

let hasAWinner = false;

let player;
let secondPlayer;

let whoIsTheWinner;

let xArray = [];
let oArray = [];

function pickASide(e) {
  let picked = e.target.textContent;
  console.log(picked);
  player = picked;

  if (player === "X") {
    secondPlayer = "O";
  } else if (player === "O") {
    secondPlayer = "X";
  }
  turnUpdate();
}

function turnUpdate() {
  let xTurn = document.getElementById("ifElementIsXStyle");
  let oTurn = document.getElementById("ifElementIsOStyle");

  if (player === "X") {
    xTurn.style.textDecoration = "underline";
    oTurn.style.textDecoration = "none";
  } else if (player === "O") {
    oTurn.style.textDecoration = "underline";
    xTurn.style.textDecoration = "none";
  }
}

function cellPosition(e) {
  const cell = e.target;
  console.log(cell);
  cell.removeEventListener("click", cellPosition);
  if (hasAWinner == true) {
    allCells.removeEventListener("click", cellPosition);
  } else if (player === "" || player === undefined) {
    winnerModalAppear("Please choose a side");
    allCells.removeEventListener("click", cellPosition);
  }
  cell.innerHTML = player;

  if (player === "X") {
    xArray.push(cell.id);
  } else if (player === "O") {
    oArray.push(cell.id);
  }

  if (hasAWinner !== true) {
    findAWinner();
    setTimeout(() => {
      machineTurn();
    }, 300);
  } else if (hasAWinner == true) {
    return hasAWinner;
  }
}

function findAWinner() {
  let textForTheWinner = document.getElementById("winnerText");
  if (xArray.length >= 2 || oArray.length >= 2) {
    let numberArrX = xArray.map((i) => Number(i));
    let numberArrO = oArray.map((i) => Number(i));

    for (let j = 0; j < allWinningPossibility.length; j++) {
      if (allWinningPossibility[j].every((i) => numberArrX.includes(i))) {
        hasAWinner = true;
        whoIsTheWinner = "X is the winner";
        setTimeout(() => {
          console.log(whoIsTheWinner);
          textForTheWinner.innerHTML = whoIsTheWinner;
          return winnerModalAppear(whoIsTheWinner);
        }, 300);
      } else if (
        allWinningPossibility[j].every((i) => numberArrO.includes(i))
      ) {
        hasAWinner = true;
        whoIsTheWinner = "O is the winner";
        setTimeout(() => {
          console.log(whoIsTheWinner);
          textForTheWinner.innerHTML = whoIsTheWinner;
          return winnerModalAppear(whoIsTheWinner);
        }, 300);
      } else if (
        numberArrX.length >= 5 &&
        !allWinningPossibility[j].every((i) => !numberArrX.includes(i)) &&
        numberArrO.length >= 3 &&
        !allWinningPossibility[j].every((i) => !numberArrO.includes(i))
      ) {
        hasAWinner = true;
        whoIsTheWinner = "it's a tie";
        setTimeout(() => {
          console.log(whoIsTheWinner);
          textForTheWinner.innerHTML = whoIsTheWinner;
          return winnerModalAppear(whoIsTheWinner);
        }, 500);
      } else if (
        numberArrO.length >= 5 &&
        !allWinningPossibility[j].every((i) => !numberArrO.includes(i)) &&
        numberArrX.length >= 3 &&
        !allWinningPossibility[j].every((i) => !numberArrX.includes(i))
      ) {
        hasAWinner = true;
        whoIsTheWinner = "it's a tie";
        setTimeout(() => {
          console.log(whoIsTheWinner);
          textForTheWinner.innerHTML = whoIsTheWinner;
          return winnerModalAppear(whoIsTheWinner);
        }, 500);
      }
    }
  }
}

function machineTurn() {
  var item = allCells[Math.floor(Math.random() * allCells.length)];
  console.log(item);
  if (item.textContent === "" && hasAWinner !== true) {
    item.innerHTML = secondPlayer;
    if (secondPlayer === "X") {
      xArray.push(item.id);
      findAWinner();
    } else if (secondPlayer === "O") {
      oArray.push(item.id);
      findAWinner();
    }
  } else if (item.textContent !== "" && hasAWinner !== true) {
    setTimeout(() => {
      machineTurn();
    }, 500);
  } else if (hasAWinner === true) {
    item.removeEventListener("click", machineTurn);
    item.removeEventListener("change", machineTurn);
  }
  if (item.textContent === secondPlayer) {
    console.log(item);
    item.removeEventListener("click", cellPosition);
  }
}

function winnerModalAppear(text) {
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
