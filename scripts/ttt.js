const Player = (name, mark) => { //player factory
    return { name, mark };
  }
  
const gameboard = (() => { //initialize board values
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  let winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let p1Turn = true;
  return { boardArray, winCondition, p1Turn };
})();
  
const displayController = (() => {
  const updateBoard = (e, mark, board) => {
    board[e.target.getAttribute("data-num")] = mark;
    e.target.innerText = `${mark}`;
    e.target.classList.remove("grid-hover");
    return board;
  }

  const showCurrentPlayer = (state, playerName, mark) => {
    state.innerText = `It's ${playerName}'s turn. ${mark}`;
  }

  function refreshPage() {
    window.location.reload();
  }

  const isGameOver = (winMsg) => {
    gameflow.secondPage.style.display = "none";
    gameflow.gameoverEl.style.display = "flex";
    gameflow.gameoverEl.appendChild(gameflow.state);
    gameflow.gameoverEl.appendChild(gameflow.reset);
  }

  return { updateBoard, showCurrentPlayer, refreshPage, isGameOver };
})();
  
const gameflow = (() => {
  //vars & selectors &
  let xIsNext = gameboard.p1Turn;
  let board = gameboard.boardArray;
  const squares = document.querySelectorAll("#squares");
  const state = document.querySelector(".game-state");
  const reset = document.querySelector("#reset");
  const play = document.querySelector(".play-btn");
  const firstPage = document.querySelector(".start-game");
  const secondPage = document.querySelector(".play-game");
  const gameoverEl = document.querySelector(".game-over");
  const p1El = document.getElementById("p1-name").value;
  const p2El = document.getElementById("p2-name").value;
  const playerOne = Player(p1El, "X");
  const playerTwo = Player(p2El, "O");

  state.innerText = `It's ${playerOne.name}'s turn. ${playerOne.mark}`; //initial gamestate

  //events
  squares.forEach(square => {
    square.addEventListener("click", (e) => { handleClick(e) }, { once: true }); //one click per square only
  });
  reset.addEventListener("click", displayController.refreshPage);
  play.addEventListener("click", () => {
    startGame();
  });
  
  //func()
  const startGame = () => {
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
  }

  const handleClick = (e) => {
    if (xIsNext) {
      e.target.classList.add("X");
      displayController.updateBoard(e, playerOne.mark, board);
      displayController.showCurrentPlayer(state, playerTwo.name, playerTwo.mark);
      xIsNext = false;
      checkWinner(board, state);
    }
    else if (!xIsNext) {
      e.target.classList.add("O");
      displayController.updateBoard(e, playerTwo.mark, board);
      displayController.showCurrentPlayer(state, playerOne.name, playerOne.mark);
      xIsNext = true;
      checkWinner(board, state);
    }
  }

  const checkWinner = (board, state) => {
    let win = gameboard.winCondition;
    let fullBoardCheck = board.filter(element => element === "X" || element ==="O");
    return (win.forEach(element => {
      let checker = "";
      for (let index = 0; index < 3; index++) {
        checker += board[element[index]];
      }
      if (checker === "XXX") {
        state.innerText = `${playerOne.name} wins! ${playerOne.mark}`;
        return displayController.isGameOver(state);
      }
      else if (checker === "OOO") {
        state.innerText = `${playerTwo.name} wins! ${playerOne.mark}`;
        return displayController.isGameOver(state);
      }
      else if (fullBoardCheck.length === 9 && (checker !== "XXX" && checker !== "OOO")){
        state.innerText = "It's a tie! Reset to play again.";
        return displayController.isGameOver(state);
      }
      else return;
    }));
  }
  return {gameoverEl, secondPage, state, reset};
})();