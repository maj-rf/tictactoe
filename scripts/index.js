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
  const board = new Array(9).fill(null);
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

  return {
    get board() {
      return board;
    },
    winCondition,
  };
})();

const display = (() => {
  let grids = document.querySelectorAll('.grid');

  function render() {
    for (let i = 0; i < 9; i++) {
      grids[i].textContent = Gameboard.board[i];
    }
    return;
  }
  return { grids, render };
})();

const game = (() => {
  const p1 = Player('Maj', 'X');
  const p2 = Player('CPU', 'O');
  let currentPlayer = p1;

  function changePlayer(player) {
    return player.marker === 'X' ? p2 : p1;
  }

  function nextMove(index, player) {
    Gameboard.board[index] = player.marker;
    display.render();
    return;
  }

  function checkWinner(player) {
    let mark = player.marker;
    let board = Gameboard.board;
    return Gameboard.winCondition.forEach((checker) => {
      if (checker.every((index) => board[index] === mark))
        return console.log(`${player.name}`);
    });
  }

  display.grids.forEach((grid, index) =>
    grid.addEventListener(
      'click',
      () => {
        nextMove(index, currentPlayer);
        checkWinner(currentPlayer);
        currentPlayer = changePlayer(currentPlayer);
      },
      { once: true }
    )
  );
})();
