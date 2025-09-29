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

// unified board for both players..
const board = [];
board[9] = 0; //X win count
board[10] = 0; //O win count

//X moves value:1, O moves valus:2
//prevents contradicion from occuring
const checkSelectedTile = (block, moveValue) => {
  if (board[block.id] === undefined) {
    // assign the move value..
    board[block.id] = moveValue;
    //X code..
    if (flag) {
      let player = "X";
      whoPlay.innerText = `O turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#003049";
      console.log("X move");
    }
    // O code..
    else {
      let player = "O";
      whoPlay.innerText = `X turn`;
      block.firstChild.innerText = player;
      block.style.backgroundColor = "#c1121f";
      console.log("O move");
    }
    winnerChecker(board);
    flipFlag();
  } else {
    console.log("wrong move!");
  }
};
const draw= () =>{
  for(let element of board){
    if(element===undefined){
      return false;
    }
  }
  return true;
}
const disable=()=>{
  for (let cell of cells) {
    cell.classList.toggle("disabled");
    }
  restart.classList.toggle("disabled");
}

const winnerChecker = (board) => {
  for (let winCondition of winConditions) {
    let [a, b, c] = winCondition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      disable();

      // win message..
      if (flag) {
        board[9]++;
        console.log(`X:${board[9]}, O:${board[10]}`);
        whoPlay.innerText = `--------- X won! ---------`;
      } else {
        board[10]++;
        console.log(`X:${board[9]}, O:${board[10]}`);
        whoPlay.innerText = `--------- O won! ---------`;
      }
      return;
    }
  }
  if(draw()){
      whoPlay.innerText= `--------- tie! ---------`;
      disable();
    }
};
const refresh = () => {
  for (let i = 0; i < 9; i++) {
    board[i] = undefined;
  }
};

const flipFlag = () => {
  flag = !flag;
};

main.addEventListener("click", (e) => {
  if (e.target.className === "block") {
    const block = e.target;
    // result..
    // console.log(`X:${Xs[9]}, O:${Os[9]}`);

    if (flag) {
      checkSelectedTile(block, 1);
    } else {
      checkSelectedTile(block, 2);
    }
  }
});
restart.addEventListener("click", () => {
  for (let cell of cells) {
    cell.classList.toggle("disabled");
    cell.style.backgroundColor = "rgba(0,0,0,0)";
    cell.firstChild.innerText = "";
  }
  refresh();
  flag = true;
  whoPlay.innerText = `X turn`;
  restart.classList.toggle("disabled");
});
