const cells = document.querySelectorAll(".block");
const main = document.querySelector("main");
// const header = document.querySelector("h1");
const whoPlay = document.querySelector("#turnIndicator");
const restart = document.querySelector("#restart");

const winConditions = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // col 1
  [1, 4, 7], // col 2
  [2, 5, 8], // col 3
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];
let flag = true;
const Xs = [];
const Os = [];

// 9th elements stores the wins count..
Xs[9] = 0;
Os[9] = 0;

const winnerChecker = (array, player) => {
  for (let winCondition of winConditions) {
    let [a, b, c] = winCondition;
    if (array[a] && array[b] && array[c]) {
      for (let cell of cells) {
        cell.classList.add("disabled");
      }
      restart.classList.toggle("disabled");
      array[9]++;
      whoPlay.innerText = `--------- ${player} won! ---------`;
    }
  }
};
const refresh = (array) => {
  for (let i = 0; i < 9; i++) {
    array[i] = undefined;
  }
};

const flipFlag = () => {
  flag = !flag;
};

main.addEventListener("click", (e) => {
  if (e.target.className === "block") {
    const block = e.target;
    console.log(`X:${Xs[9]}, O:${Os[9]}`);
    if (flag) {
      let player = "X";
      whoPlay.innerText = `O turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#003049";

      Xs[block.id] = true;
      winnerChecker(Xs, player);
    } else {
      let player = "O";
      whoPlay.innerText = `X turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#c1121f";

      Os[block.id] = true;
      winnerChecker(Os, player);
    }

    flipFlag();
  }
});
restart.addEventListener("click", () => {
  for (let cell of cells) {
    cell.classList.remove("disabled");
    cell.style.backgroundColor = "rgba(0,0,0,0)";
    cell.firstChild.innerText = "";
  }
  refresh(Xs);
  refresh(Os);
  flag = true;
  whoPlay.innerText = `X turn`;
  restart.classList.toggle("disabled");
});
