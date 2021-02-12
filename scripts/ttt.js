const player = (name, move) =>{
    const getName = () => name;
    const getMove = () => move;
    return {getName, getMove};
}

const gameboard = (() =>{
    //initialize board values, get players
    let boardArray = ["","","","","","","","",""] ;
    let winCon = ["012", "345", "678", "036", "147", "258", "048", "246"];
    let playerOne = player("majed", "X");
    let playerTwo = player("computer", "O");

    //selectors &  events
    const squares = document.querySelectorAll("#squares");
    console.log(Array.from(squares));
    squares.forEach(square =>{
    square.addEventListener("click", function(e){
            playRound(e, playerOne.getMove(), playerTwo.getMove());
        });
    });

    //update
    const playRound = (e, p1Move, p2Move) => {
        e.target.textContent = `${p1Move}`;
        boardArray[e.target.getAttribute("data-num")] = p1Move;
        playerTwoTurn(p2Move, boardArray, e);
        // console.log(e.target.getAttribute("data-num"));
        // console.log(boardArray);
    }

    //move randomizer
    const playerTwoTurn = (p2move, board, squareDiv) => {
        let randomIndex = Math.floor(Math.random() * board.length);
        console.log(board);
        console.log(randomIndex);
        if(board[randomIndex] === "" && ((board[randomIndex]!== "X") || (board[randomIndex]!== "O"))){
            board[randomIndex] = p2move;
            console.log(board);
            squareDiv.target.parentElement.childNodes[randomIndex].textContent = `${p2move}`;
        }
        else playerTwoTurn(p2move, board, squareDiv);
    }
    

})();

const gameFlow = (() =>{
    
})();







