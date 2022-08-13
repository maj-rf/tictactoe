const Player = (name, marker) => {
  let playerName = name;
  let playerMarker = marker;
  return {
    get name() {
      return playerName;
    },
    set name(name) {
      playerName = name;
    },
    get marker() {
      return playerMarker;
    },
  };
};

const Gameboard = (() => {
  let board = new Array(9).fill(null);
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function resetBoard() {
    return (board = new Array(9).fill(null));
  }
  return {
    get board() {
      return board;
    },
    winCondition,
    resetBoard,
  };
})();

const display = (() => {
  let grids = document.querySelectorAll('.grid');

  function render(gameboard) {
    for (let i = 0; i < 9; i++) {
      grids[i].textContent = gameboard[i];
    }
    return;
  }

  function showWinner(player) {
    let modal = document.getElementById('gameover-modal');
    let winner = document.querySelector('.winner');
    winner.textContent = !player ? 'Draw' : 'Winner: ' + player.name;
    modal.showModal();
    return;
  }

  return { render, showWinner, grids };
})();

const game = ((Gameboard, Player, display) => {
  let p1;
  let p2;
  let currentPlayer;
  let restartBtn = document.querySelector('.restart');
  let changeBtn = document.querySelector('.change');
  let startBtn = document.querySelector('.start');
  let game = document.querySelector('.game');
  let pregame = document.querySelector('.pre-game');
  let p1_element = document.querySelector('#player-1');
  let p2_element = document.querySelector('#player-2');

  function restartGame() {
    Gameboard.resetBoard();
    currentPlayer = p1;
    display.render(Gameboard.board);
  }

  function changeName() {
    restartGame();
    game.style.display = 'none';
    pregame.style.display = 'flex';
    return;
  }

  function changePlayer(player) {
    return player.marker === 'X' ? p2 : p1;
  }

  function nextMove(index, player) {
    if (Gameboard.board[index]) return;
    Gameboard.board[index] = player.marker;
    display.render(Gameboard.board);
    return;
  }

  function checkWinner(player) {
    let boardHasSpace = !Gameboard.board.every(
      (grid) => grid === 'X' || grid === 'O'
    );
    let hasWinner = Gameboard.winCondition.some((win) => {
      return win.every((index) => Gameboard.board[index] === player.marker)
        ? true
        : false;
    });

    if (hasWinner) return display.showWinner(player);
    else if (!hasWinner && !boardHasSpace) display.showWinner();
    else return;
  }

  function init() {
    restartGame();
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      game.style.display = 'flex';
      pregame.style.display = 'none';
      p1 = Player(p1_element.value, 'X');
      p2 = Player(p2_element.value, 'O');
      currentPlayer = p1;
    });

    restartBtn.addEventListener('click', restartGame);
    changeBtn.addEventListener('click', changeName);
    display.grids.forEach((grid, index) =>
      grid.addEventListener('click', () => {
        nextMove(index, currentPlayer);
        checkWinner(currentPlayer);
        currentPlayer = changePlayer(currentPlayer);
      })
    );
  }
  init();
})(Gameboard, Player, display);
