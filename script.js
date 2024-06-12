const playCells = document.getElementsByClassName('playCell');
const newGame = document.getElementById('newGame');
let turn = 1;
let numOfTurns = 0;
let xBoard = [];
let oBoard = [];

let wlx1 = ['1X', '2X', '3X']; 
let wlx2 = ['1X', '4X', '7X']; 
let wlx3 = ['1X', '5X', '9X'];
let wlx4 = ['2X', '5X', '8X'];
let wlx5 = ['3X', '6X', '9X'];
let wlx6 = ['3X', '5X', '7X'];
let wlx7 = ['4X', '5X', '6X'];
let wlx8 = ['7X', '8X', '9X'];

let wlo1 = ['1O', '2O', '3O']; 
let wlo2 = ['1O', '4O', '7O']; 
let wlo3 = ['1O', '5O', '9O'];
let wlo4 = ['2O', '5O', '8O'];
let wlo5 = ['3O', '6O', '9O'];
let wlo6 = ['3O', '5O', '7O'];
let wlo7 = ['4O', '5O', '6O'];
let wlo8 = ['7O', '8O', '9O'];

function checkStatus() {
    if( wlx1.every(i => xBoard.includes(i)) === true || 
        wlx2.every(i => xBoard.includes(i)) === true || 
        wlx3.every(i => xBoard.includes(i)) === true ||
        wlx4.every(i => xBoard.includes(i)) === true ||
        wlx5.every(i => xBoard.includes(i)) === true ||
        wlx6.every(i => xBoard.includes(i)) === true ||
        wlx7.every(i => xBoard.includes(i)) === true ||
        wlx8.every(i => xBoard.includes(i)) === true ){

        if (confirm('Player 1 wins, would you like to play again?') == true) {
            location.reload();
        } else {
            window.close();
        }
    
}   else if(
        wlo1.every(i => oBoard.includes(i)) === true || 
        wlo2.every(i => oBoard.includes(i)) === true || 
        wlo3.every(i => oBoard.includes(i)) === true ||
        wlo4.every(i => oBoard.includes(i)) === true ||
        wlo5.every(i => oBoard.includes(i)) === true ||
        wlo6.every(i => oBoard.includes(i)) === true ||
        wlo7.every(i => oBoard.includes(i)) === true ||
        wlo8.every(i => oBoard.includes(i)) === true ){
        
        if (confirm('Player 2 wins, would you like to play again?') == true) {
            location.reload();
        } else {
            window.close();
        }
    } 

    else if(numOfTurns == 9){
        if (confirm('Game tied, would you like to play again?') == true) {
            location.reload();
        } else {
            window.close();
        }
    }
}

// addEventListener to all cells
for (const cell of playCells) {
  cell.addEventListener('click', function onClick() {

    if (cell.innerHTML === '' && turn === 1) { 
        cell.setAttribute("id", cell.id + 'X');
        cell.innerHTML = 'X';
        turn = 2;
        numOfTurns++;
        xBoard.push(cell.id); 
        setTimeout(checkStatus, 900);
}   
    else if (cell.innerHTML === '' && turn === 2){
        cell.setAttribute("id", cell.id + 'O');
        cell.innerHTML = 'O';
        turn = 1;
        numOfTurns++;
        oBoard.push(cell.id);
        setTimeout(checkStatus, 900);
}})};

// addEventListener to new game button
newGame.addEventListener('click',() => {
    for (const cell of playCells) {
        location.reload();
}});





