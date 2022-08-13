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
  let restart = document.querySelector('.restart');
  let changeName = document.querySelector('.change');
  let start = document.querySelector('.start');
  let game = document.querySelector('.game');
  let pregame = document.querySelector('.pre-game');
  let p1 = document.querySelector('#player-1');
  let p2 = document.querySelector('#player-2');

  function render() {
    for (let i = 0; i < 9; i++) {
      grids[i].textContent = Gameboard.board[i];
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

  return {
    grids,
    render,
    showWinner,
    restart,
    start,
    game,
    pregame,
    p1,
    p2,
    changeName,
  };
})();

const game = (() => {
  let p1;
  let p2;
  let currentPlayer;

  function restartGame() {
    Gameboard.resetBoard();
    currentPlayer = p1;
    display.render();
  }

  function changeName() {
    Gameboard.resetBoard();
    currentPlayer = p1;
    display.render();
    display.game.style.display = 'none';
    display.pregame.style.display = 'block';
    return;
  }

  function changePlayer(player) {
    return player.marker === 'X' ? p2 : p1;
  }

  function nextMove(index, player) {
    if (Gameboard.board[index]) return;
    Gameboard.board[index] = player.marker;
    display.render();
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

  //Events
  display.start.addEventListener('click', (e) => {
    e.preventDefault();
    display.game.style.display = 'block';
    display.pregame.style.display = 'none';
    p1 = Player(display.p1.value, 'X');
    p2 = Player(display.p2.value, 'O');
    currentPlayer = p1;
  });

  display.restart.addEventListener('click', restartGame);
  display.changeName.addEventListener('click', changeName);
  display.grids.forEach((grid, index) =>
    grid.addEventListener('click', () => {
      nextMove(index, currentPlayer);
      checkWinner(currentPlayer);
      currentPlayer = changePlayer(currentPlayer);
    })
  );
})();
