const Player = (name, mark) =>{
    return {name, mark};
}

//global lol
let playerOne = Player("P1", "X");
let playerTwo = Player("Computer", "O");

const gameboard = (() =>{
    //initialize board values
    let boardArray = ["","","","","","","","",""] ;
    let winCondition = [[0,1,2], [3,4,5], [6,7,8], [0,3,6,], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let p1Turn = true;
    return {boardArray, winCondition, p1Turn};
})();

const gameflow = (() =>{
    //selectors & events
    let xIsNext = gameboard.p1Turn;
    let board = gameboard.boardArray;
    const squares = document.querySelectorAll("#squares");
    const state = document.querySelector(".game-state");
    state.innerText = `It's ${playerOne.name}'s turn. ${playerOne.mark}`;
    squares.forEach(square =>{
    square.addEventListener("click", handleClick, {once: true}) //one click per square only
    });

    function handleClick(e){  
        if(xIsNext){
            e.target.classList.add("X");
            displayController.updateBoard(e, playerOne.mark,board);
            displayController.showCurrentPlayer(state, playerTwo.name, playerTwo.mark);
            xIsNext=false;
            checkWinner(board,state);

        }
        else if(!xIsNext){
            e.target.classList.add("O");
            displayController.updateBoard(e, playerTwo.mark,board);
            displayController.showCurrentPlayer(state, playerOne.name, playerOne.mark);
            xIsNext = true;
            checkWinner(board,state);
        }
    }

    const checkWinner = (board,state) =>{
        let win = gameboard.winCondition;
        return(win.forEach(element =>{
            let checker = "";
            for(let count= 0; count < 3; count++){
                checker += board[element[count]];
            }
                if(checker ==="XXX"){
                    return state.innerText = `${playerOne.name} wins`;
                }
                else if(checker === "OOO"){
                    return state.innerText = `${playerTwo.name} wins`;
                }
                else return;
        }));
    } 
})();

const displayController = (() => {
    const updateBoard = (e, mark , board) => {
        board[e.target.getAttribute("data-num")] = mark;
        e.target.innerText = `${mark}`;
        return board;
    }

    const showCurrentPlayer = (state, playerName, mark) => {
        state.innerText = `It's ${playerName}'s turn. ${mark}`;
    }

    return {updateBoard, showCurrentPlayer};
})();
