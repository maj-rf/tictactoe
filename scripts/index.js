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

  function render() {
    for (let i = 0; i < 9; i++) {
      grids[i].textContent = Gameboard.board[i];
    }
    return;
  }

  function showWinner(player) {
    let modal = document.getElementById('gameover-modal');
    let winner = document.querySelector('.winner');
    winner.textContent = 'Winner: ' + player.name;
    modal.showModal();
    return;
  }

  return { grids, render, showWinner, restart };
})();

const game = (() => {
  let p1 = Player('Maj', 'X');
  let p2 = Player('CPU', 'O');
  let currentPlayer = p1;

  function restartGame() {
    Gameboard.resetBoard();
    p1 = Player('Trial', 'X');
    p2 = Player('Bot', 'O');
    currentPlayer = p1;
    display.render();
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
    return Gameboard.winCondition.forEach((checker) => {
      if (checker.every((index) => Gameboard.board[index] === player.marker))
        return display.showWinner(player);
    });
  }

  display.restart.addEventListener('click', restartGame);
  display.grids.forEach((grid, index) =>
    grid.addEventListener('click', () => {
      nextMove(index, currentPlayer);
      checkWinner(currentPlayer);
      currentPlayer = changePlayer(currentPlayer);
    })
  );
})();
