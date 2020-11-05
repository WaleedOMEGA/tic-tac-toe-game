document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const playerDisplay = document.querySelector('#player');
    let currentPlayer = 'player X';
    const winningMessage = () => `${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const handlePlayerChange = (index) => {
    if (currentPlayer === 'player X') {
      squares[index].classList.add('playerX');
      gameState[index] = currentPlayer;
      currentPlayer = 'player O';
      playerDisplay.innerHTML = currentPlayer;
    } else {
      squares[index].classList.add('playerO');
      gameState[index] = currentPlayer;
      currentPlayer = 'player X';
      playerDisplay.innerHTML = currentPlayer;
    }
  }
  const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
      const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          console.log('won');
          break;
      }
      
    }
    if (roundWon) {
        playerDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        playerDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
  };
  const clickOutCome = (e) => {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);
    // playerDisplay.innerHTML = currentPlayer;
    if (gameState[index] !== "" || !gameActive) {
      return;
    }
    handlePlayerChange(index);
    handleResultValidation();
  };
  const handleRestartGame = () => {
  gameActive = true;
    currentPlayer = "player X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    playerDisplay.innerHTML = currentPlayer;
    squares.forEach(cell => { 
      cell.innerHTML = "";
      cell.className = '';
    });
}
  squares.forEach(square => square.addEventListener('click', clickOutCome));
  document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
});