
        const cells = document.querySelectorAll('.cell');
        const restartButton = document.getElementById('restart-button');
        let currentPlayer = 'X';
        let board = Array(9).fill(null);
        let gameOver = false;

        const winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function checkWin() {
            for (let combination of winningCombination) {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return true;
                }
            }
            return false;
        }

        function checkDraw() {
            return board.every(cell => cell !== null);
        }

        function handleClick(event) {
            const index = event.target.getAttribute('data-cell-index');
            
            if (board[index] || gameOver) {
                return;
            }

            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWin()) {
                gameOver = true;
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            } else if (checkDraw()) {
                gameOver = true;
                setTimeout(() => alert("It's a draw!"), 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function restartGame() {
            board = Array(9).fill(null);
            gameOver = false;
            currentPlayer = 'X';
            cells.forEach(cell => cell.textContent = '');
        }

        cells.forEach(cell => cell.addEventListener('click', handleClick));
        restartButton.addEventListener('click', restartGame);
    