// Estado del juego
let board = ['', '', '', '', '', '', '', '', ''];  // El tablero es un array de 9 elementos (vacíos inicialmente)
let currentPlayer = 'X';  // El jugador que comienza es 'X'
let gameOver = false;  // Indica si el juego ha terminado

// Función para realizar la jugada
function makeMove(index) {
  // Si la casilla ya está marcada o el juego ha terminado, no hacer nada
  if (board[index] !== '' || gameOver) {
    return;
  }

  // Actualizar el tablero con la marca del jugador actual
  board[index] = currentPlayer;
  
  // Mostrar la marca (X o O) en la celda correspondiente7
  document.getElementById(`cell${index}`).textContent = currentPlayer;

  // Agregar la clase .marcada para cambiar el color de fondo a gris claro
  document.getElementById(`cell${index}`).classList.add('marcada');
  
  // Añadir la clase correspondiente (X o O) para mantener el estilo
  document.getElementById(`cell${index}`).classList.add(currentPlayer);

  // Comprobar si hay un ganador
  if (checkWinner()) {
    gameOver = true;
    document.getElementById('winnerMessage').textContent = `${currentPlayer} ha ganado! 🎉`;
    return;
  }

  // Comprobar si hay empate
  if (board.every(cell => cell !== '')) {
    gameOver = true;
    document.getElementById('winnerMessage').textContent = "¡Empate! 😓";
    return;
  }

  // Cambiar al siguiente jugador
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para verificar si hay un ganador
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], // Primera fila
    [3, 4, 5], // Segunda fila
    [6, 7, 8], // Tercera fila
    [0, 3, 6], // Primera columna
    [1, 4, 7], // Segunda columna
    [2, 5, 8], // Tercera columna
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  // Comprobar todas las combinaciones ganadoras
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true; // Hay un ganador
    }
  }
  
  return false; // No hay ganador aún
}

// Función para reiniciar el juego
function resetGame() {
  // Restablecer el estado del tablero
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  document.getElementById('winnerMessage').textContent = '';

  // Limpiar las celdas y eliminar las clases
  for (let i = 0; i < 9; i++) {
    let cell = document.getElementById(`cell${i}`);
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'marcada');
  }
}
