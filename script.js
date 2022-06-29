let ticGrid = ["", "", "", 
                "", "", "", 
                "", "", ""];

let currentTurn = "X";
let gameRunning = true;

//message to display depending on the current status of the game
    const playerTurn = () => `Turn: Player ${currentTurn}`;
    const winner = () => `Winner: Player ${currentTurn} !`;
    const draw = () => `Draw!`;

const currentStatus = document.querySelector('h2');

const toWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];




//reflect the played move with an internal game state update
function boxChecked(boxFilled, boxNumber) {
    ticGrid[boxNumber] = currentTurn;
    boxFilled.innerHTML = currentTurn;
}

// status update afters players change turns


function nextTurn() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    currentStatus.innerHTML = playerTurn();
}



//check if game is still active or if there is a winner/draw
function checkResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = toWin[i];
        let a = ticGrid[winCondition[0]];
        let b = ticGrid[winCondition[1]];
        let c = ticGrid[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        else if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        currentStatus.innerHTML = winner();
        gameRunning = false;
        return;
    }

    let roundDraw = !ticGrid.includes("");
    if (roundDraw) {
        currentStatus.innerHTML = draw();
        gameRunning = false;
        return;
    }

    nextTurn();
}


//check if specific grid box has been clicked, continue game flow if it hasnt
//ignore the click if the game isnt being played or if the grid box has been clicked on already
function gridClick(gridClickedEvent) {
    const boxFilled = gridClickedEvent.target;
    const boxNumber = parseInt(boxFilled.getAttribute('box'));

    if (ticGrid[boxNumber] !== "" || !gameRunning) {
        return;
    }

    boxChecked(boxFilled, boxNumber);
    checkResult();
}


//to reset the game
function gameReset() {
    gameRunning = true;
    currentTurn = "X";
    ticGrid = ["", "", "", "", "", "", "", "", ""];
    currentStatus.innerHTML = playerTurn();
    document.querySelectorAll('.grid').forEach(cell => cell.innerHTML = "");
}

document.querySelector('.reset').addEventListener('click', gameReset);
document.querySelectorAll('.grid').forEach(cell => cell.addEventListener('click', gridClick));

 
