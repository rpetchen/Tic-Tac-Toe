(function ticTactoe(){

const startButton = document.querySelector("header .button");
const start = document.getElementById("start");
const startBparent = document.querySelector("#start header")
const boxes = document.querySelector(".boxes");
const box = boxes.children;
const win = document.getElementById("finish");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const newGame = document.querySelector("#finish");
var newBoard = [];
var move = null;
const aiButton = document.createElement("A");
aiButton.classList.add("button");
aiButton.textContent = "Start - Play Computer";
startBparent.appendChild(aiButton);
startButton.textContent = "Start - Multiplayer";
const buttons = document.querySelectorAll("a");
buttons[0].setAttribute("name", "multiplayer");
buttons[1].setAttribute("href", "#");
buttons[2].setAttribute("name", "multiplayer");

const resetAi = document.createElement("A");
resetAi.classList.add("button");
resetAi.textContent = "New Game - Play Computer";
newGame.querySelector("header").appendChild(resetAi);
var winner = "";

//event listener for start buttons; allows user to select to play against another player or the comptuer
start.addEventListener("click", function(e) {
    start.style.display = "none";
    player2.classList.add("active");
    var nameTarget = e.target.getAttribute("name");
    if (nameTarget === "multiplayer") {
        game.ai = 0;
    } else {
        game.ai = 1;
    }
    console.log(nameTarget);

})


//player constructor object
var player = function(name, src, background, pClass, winClass) {
    this.name = name;
    this.src = src;
    this.background = background;
    this.class = pClass;
    this.winClass = winClass;
};

//set the player classes as well as declare min and max players fo rAI
var Xplayer = new player("X", "img/x.svg", "url('img/x.svg')", "box-filled-2", "screen-win-two");
var Oplayer = new player("O", "img/o.svg", "url('img/o.svg')", "box-filled-1", "screen-win-one");
var minPlayer = "O";
var maxPlayer = "X";

//game object which holds board positions as well as methods to alternate between players, modify the UI, and check for wins and ties
var game = {
    board: ["", "", "", "", "", "", "", "", ""],
    player: Xplayer,
    ai: "",
    iteratePlayer: function() {
        if (this.player === Xplayer) {
            this.player = Oplayer;
            player2.classList.remove("active");
            player1.classList.add("active");
            if (this.ai === 1) {

                aiMove();
            }
        } else if (this.player === Oplayer) {
            this.player = Xplayer;
            player1.classList.remove("active");
            player2.classList.add("active");
        }
    },
    validMove: function(i) {
        if (this.board[i] === "") {
            return true;
        } else {
            return false;
        }
    },

    makeMove: function() {

        // if ( this.ai = true && this.player.name === "O") {
        //     aiMove()
        // } else 

        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener("click", function(e) {
                var validmove = this.validMove(i);
                if (validmove) {
                    e.target.classList.add(this.player.class);
                    console.log(this.player.class);
                    this.board[i] = this.player.name;
                    this.winner();
                    game.iteratePlayer();
                }
            }.bind(game), false);
        }
    },

    winner: function() {
        if (Winner(this.board, this.player.name)) {
            win.style.display = "";
            win.classList.add(this.player.winClass);
            const winText = win.querySelector("p").textContent = "Winner";
            winner = this.player.name
        } else if (aiTie(game.board)) {
            win.style.display = "";
            win.classList.add("screen-win-tie");
            const tieText = win.querySelector("p").textContent = "Tie";
            winner = "tie";

        }

    },
    hover: function() {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener("mouseover", function(e) {
                var validmove = game.validMove(i);
                if (validmove) {
                    box[i].style.backgroundImage = game.player.background;
                }
            })
        }
    }(),
    hoverOut: function() {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener("mouseout", function(e) {

                box[i].style.backgroundImage = "";

            })
        }
    }()
}
//initialize the make move function in order to allow users to click on boxes and initialize the cascade of addiitonal functions
game.makeMove();

//helper function for AI to make copies of board so computer can evaluate moves
var copyBoard = function(board) {
    return board.slice(0);
}

var newBoard = [];
//helper function for AI so the computer can check for valid moves against the copy of the board created in copyBoard()
function aiValidmove(move, player, board) {
    newBoard = copyBoard(board);
    if (newBoard[move] === "") {
        newBoard[move] = player;

        return newBoard;
    } else {
        return null;
    }

}

var bestMove = "null";
//MINIMAX Begins Here
var aiMove = function() {
    var bestMoveScore = 100;

    if (Winner(game.board, "X") || Winner(game.board, "O") || aiTie(game.board)) {
        return null;
    } else {
        for (var i = 0; i < game.board.length; i++) {
            let newB = aiValidmove(i, minPlayer, game.board);

            if (newB) {

                var moveScore = maxScore(newB);

                if (moveScore < bestMoveScore) {
                    bestMoveScore = moveScore;
                    move = i;

                }

            }
        }
        game.board[move] = minPlayer;
        box[move].classList.add(Oplayer.class);
        this.winner();
        game.iteratePlayer();
    }
}.bind(game)


//calls maxScore function from the perspective of the minimizing player in order to check for winning moves for 'O'
function minScore(board) {
    if (Winner(board, "X")) {
        return 10;
    } else if (Winner(board, "O")) {
        return -10;
    } else if (aiTie(board)) {
        return 0;
    } else {
        var bestMoveScore = 100;
        let move = 0;
        for (var i = 0; i < game.board.length; i++) {
            let newB = aiValidmove(i, minPlayer, board);
            if (newB) {
                var predictedMoveScore = maxScore(newB);
                if (predictedMoveScore < bestMoveScore) {
                    bestMoveScore = predictedMoveScore;
                    move = i;
                }
            }

        }

        return bestMoveScore;
    }
}


//calls minScore function from the perspective of the maximizing player in order to check for winning moves for 'X'
function maxScore(board) {
    if (Winner(board, "X")) {
        return 10;
    } else if (Winner(board, "O")) {
        return -10;
    } else if (aiTie(board)) {
        return 0;
    } else {
        var bestMoveScore = -100
        let move = 0;
        for (var i = 0; i < game.board.length; i++) {
            let newB = aiValidmove(i, maxPlayer, board);

            if (newB) {

                var predictedMoveScore = minScore(newB);
                if (predictedMoveScore > bestMoveScore) {
                    bestMoveScore = predictedMoveScore;
                    move = i;
                }

            }

        }

        return bestMoveScore;
    }
}
//function to determine winner, used for calculating both game winner and tentative game winner for all possible AI board states
function Winner(board, player) {
    if ((board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)) {
        return true;
    } else {
        return false;
    }

}
//function to determine if game ends in tie, used for calculating both real game situations tentative ties for all possible AI board states
function aiTie(board) {
if (!board.includes("")){
        return true;
    }
    return false;
}

//event listener to restart game and allow user to play against another player or computer once an end state has been reached
newGame.addEventListener("click", function(e) {
    game.board.fill("");
    win.classList.remove(Xplayer.winClass);
    win.classList.remove(Oplayer.winClass);
    win.style.display = "none";
    game.player = Xplayer;
    newBoard = [];
    winner = "";
    var nameTarget = e.target.getAttribute("name");
    for (var i = 0; i < box.length; i++) {
        box[i].classList.remove(Xplayer.class);
        box[i].classList.remove(Oplayer.class);
    }
    if (nameTarget === "multiplayer") {
        game.ai = 0;
    } else {
        game.ai = 1;
    }
});
})()