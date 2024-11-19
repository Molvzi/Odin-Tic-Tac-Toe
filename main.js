//Gameboard对象
const Gameboard = {
    board: ['', '', '', '', '', '', '', '', ''],
    //显示游戏棋盘
    displayBoard: function () {
        renderBoard();
    },
    //重置游戏棋盘
    resetBoard: function () {
        this.board = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
    }
}

//Player对象
const Player = (name, marker) => {
    return { name, marker }
}

//渲染游戏棋盘
function renderBoard(){
    const gameBoardContainer = document.getElementById('game-board');
    gameBoardContainer.innerHTML = '';

    Gameboard.board.forEach((marker,index)=>{
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${index}`;
        cell.textContent = marker;

        cell.addEventListener('click',()=>{
            GameController.makeMove(index);
        })

        gameBoardContainer.appendChild(cell);
    })
}

//控制游戏流程对象
const GameController = {
    player1: Player('player1', 'X'),
    player2: Player('player2', 'O'),
    currentPlayer: null,
    gameOver: false,

    //初始化游戏
    init: function () {
        this.currentPlayer = this.player1;
        this.gameOver = false;
        Gameboard.resetBoard();
        Gameboard.displayBoard();
    },

    //切换玩家
    switchPlayer: function () {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    },

    //判断游戏是否结束
    checkWinner: function () {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition =>
            condition.every(index => Gameboard.board[index] === this.currentPlayer.marker)
        );
    },

    //落子
    makeMove: function (position) {
        if (this.gameOver) return;
        if (Gameboard.board[position] === '') {
            Gameboard.board[position] = this.currentPlayer.marker;
            Gameboard.displayBoard();
            if (this.checkWinner()) {
                alert(`${this.currentPlayer.name}获胜`);
                this.gameOver = true;
                return;
            }
            this.switchPlayer();
        } else {
            alert('此位置已有棋子，请重新选择');
        }
    }
}

GameController.init();