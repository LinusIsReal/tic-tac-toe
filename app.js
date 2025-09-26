const cells = document.querySelectorAll(".block");
const main = document.querySelector("main");
// const header = document.querySelector("h1");
const whoPlay = document.querySelector("#turnIndicator");
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
const winnerChecker = (array) => {
  for (let winCondition of winConditions) {
    let [a, b, c] = winCondition;
    if (array[a] && array[b] && array[c]) return true;
  }
  return false;
};

const flipFlag = () => {
  flag = !flag;
};

main.addEventListener("click", (e) => {
  if (e.target.className === "block") {
    const block = e.target;
    // console.dir(block);
    if (flag) {
      let player = "X";
      whoPlay.innerText = `O turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#003049";

      Xs[block.id] = true;
      if (winnerChecker(Xs)) {
        console.log("X won");
      } else {
        console.log("didn't win yet");
      }
    } else {
      let player = "O";
      whoPlay.innerText = `X turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#c1121f";

      Os[block.id] = true;
      if (winnerChecker(Os)) {
        console.log("O won");
      } else {
        console.log("didn't win yet!");
      }
    }
    flipFlag();
  }
});
