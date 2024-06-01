document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('#reset');
    const message = document.querySelector('#message');

    let boardState = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (player) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === player;
            });
        });
    };

    const checkDraw = () => {
        return boardState.every(cell => cell !== null);
    };

    const botMove = () => {
        let availableCells = boardState.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null);
        let move = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[move] = 'O';
        cells[move].textContent = 'O';
        cells[move].classList.add('disabled');
        if (checkWin('O')) {
            message.textContent = 'Бот виграв!';
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = 'Нічия!';
            gameActive = false;
        }
        currentPlayer = 'X';
    };

    const handleCellClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (boardState[index] || !gameActive) return;

        boardState[index] = 'X';
        e.target.textContent = 'X';
        e.target.classList.add('disabled');
        if (checkWin('X')) {
            message.textContent = 'Ти виграв!';
            gameActive = false;
            return;
        } else if (checkDraw()) {
            message.textContent = 'Нічия!';
            gameActive = false;
            return;
        }

        currentPlayer = 'O';
        setTimeout(botMove, 500); // Затримка перед ходом бота
    };

    const resetGame = () => {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
        });
        message.textContent = '';
        currentPlayer = 'X';
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
