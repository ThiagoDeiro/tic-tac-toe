let firstRow = [0, 1, 2];
let secondRow = [3, 4, 5];
let thirdRow = [6, 7, 8];

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
let xArray = [];
let oArray = [];

let firstPLayer;

let pickSide;

let whoTurnIs;

const renderData = () => {
  let firstR = document.getElementById("divFirstRow");
  let secondR = document.getElementById("divSecondRow");
  let thirdR = document.getElementById("divThirdRow");

  let first;
  let second;
  let third;

  for (let i = 0; i < firstRow.length; i++) {
    first = firstRow[i];
    second = secondRow[i];
    third = thirdRow[i];

    let a1 = document.createElement("a");
    a1.setAttribute("id", `${first}`);
    a1.setAttribute("class", `${i}`);
    a1.setAttribute("class", "boxEl");
    a1.setAttribute("onclick", `getPositionValue(${i}, id)`);
    // a1.innerHTML = first;

    let a2 = document.createElement("a");
    a2.setAttribute("id", `${second}`);
    a2.setAttribute("class", "boxEl");
    a2.setAttribute("onclick", `getPositionValue(${i}, id)`);
    // a2.innerHTML = second;

    let a3 = document.createElement("a");
    a3.setAttribute("id", `${third}`);
    a3.setAttribute("class", "boxEl");
    a3.setAttribute("onclick", `getPositionValue(${i}, id)`);
    // a3.innerHTML = third;

    firstR.appendChild(a1);
    secondR.appendChild(a2);
    thirdR.appendChild(a3);
  }
};
renderData();

const pickASide = (id) => {
  let span = document.getElementById("whoIsPlaying");
  let turn = document.getElementById("whoTurn");

  let choseA = id;

  let xSelector = "Xplayer";
  firstPLayer = xSelector;
  firstPLayer = "X";

  let oSelector = "0player";

  if (choseA === xSelector) {
    pickSide = firstPLayer;
  } else if (choseA === oSelector) {
    pickSide = "O";
  }

  whoTurnIs = pickSide;
  span.innerHTML = pickSide;
  turn.innerHTML = whoTurnIs === "X" ? "O" : "X";
};

const getPositionValue = (i, id) => {
  let el = document.getElementById(`${id}`);
  whoTurnIs = whoTurnIs !== "X" ? firstPLayer : "O";
  el.innerHTML = whoTurnIs;
  // turn.innerHTML = whoTurnIs || whoTurnIs;
  if (whoTurnIs === "X") {
    xArray.push(id);
    console.log(xArray);
  } else if (whoTurnIs === "O") {
    oArray.push(id);
  }
  checkWinner();
};

const checkWinner = () => {
  let resultSpan = document.getElementById("resultsSpan");
  let items = [];
  items = winningPoss;
  let results;

  console.log(xArray);
  let numericArrx = xArray.map((i) => Number(i));
  let numericArro = oArray.map((i) => Number(i));

  for (let y = 0; y < items.length; y++) {
    if (xArray.length >= 3 && items[y].every((i) => numericArrx.includes(i))) {
      results = `X is the winner`;
      console.log(xArray);
    } else if (
      oArray.length >= 3 &&
      items[y].every((r) => numericArro.includes(r))
    ) {
      results = `O is the winner`;
      console.log(oArray);
    } else if (
      xArray.length >= 5 &&
      !items[y].every(
        (r) =>
          numericArrx.includes(r) ||
          (oArray.length >= 3 && items[y].every((r) => numericArro.includes(r)))
      )
    ) {
      results = `it's a tie`;
      console.log(`it's a tie`);
    } else if (
      oArray.length >= 5 &&
      !items[y].every(
        (r) =>
          numericArro.includes(r) ||
          (xArray.length >= 3 && items[y].every((r) => numericArrx.includes(r)))
      )
    ) {
      results = `it's a tie`;
      console.log(`it's a tie`);
    }
  }

  if (results !== undefined) {
    resultSpan.innerHTML = results;
  }
};
