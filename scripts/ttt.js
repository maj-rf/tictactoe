const squares = document.querySelectorAll("#squares");
squares.forEach(square =>{
    square.addEventListener("click", updateBoard);
});

function updateBoard(e){
    if(e.target.value === "") e.target.textContent = "X";
    else if(e.target.value === "" && e.target.value !== "X") e.target.textContent = "O";
    else return;
}