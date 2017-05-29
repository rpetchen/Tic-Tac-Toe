
const startButton = document.querySelector('header .button');
const start = document.getElementById('start');
const boxes = document.querySelector('.boxes');
const box = boxes.children;
const win = document.getElementById('finish');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const newGame = document.querySelector('#finish');
var newBoard =[]
var move = null

start.addEventListener('click', function() {
    start.style.display = 'none'
    player2.classList.add('active')
})


var winner = ''
var player = function(name, src, background, pClass, winClass) {
    this.name = name
    this.src = src
    this.background = background
    this.class = pClass
    this.winClass = winClass
}

Xplayer = new player('X', "img/x.svg", "url('img/x.svg')", "box-filled-2", "screen-win-two")
Oplayer = new player('O', "img/o.svg", "url('img/o.svg')", "box-filled-1", "screen-win-one")
var minPlayer = 'O'
var maxPlayer = 'X'
var game = {
    board: ['', '', '', '', '', '', '', '', ''],
    player: Xplayer,
    ai: '1',
    iteratePlayer: function() {
        if (this.player === Xplayer) {
            this.player = Oplayer
            player2.classList.remove('active')
            player1.classList.add('active')
          if (this.ai = '1'){

             aiMove()
         }
        } else if (this.player === Oplayer) {
            this.player = Xplayer
            player1.classList.remove('active')
            player2.classList.add('active')
        }
    },
    validMove: function(i) {
        if (this.board[i] == '') {
            return true
        } else {
            return false
        }
    },

    makeMove: function() {

        // if ( this.ai = true && this.player.name === "O") {
        //     aiMove()
        // } else 

        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener('click', function(e) {
                var validmove = this.validMove(i)
                if (validmove) {
                    e.target.classList.add(this.player.class)
                    console.log(this.player.class)
                    this.board[i] = this.player.name
                    this.winner()
                    game.iteratePlayer()
                }
            }.bind(game), false)
        }
    },

    winner: function() {
        if ((this.board[0] === this.player.name && this.board[1] === this.player.name && this.board[2] === this.player.name) ||
            (this.board[3] === this.player.name && this.board[4] === this.player.name && this.board[5] === this.player.name) ||
            (this.board[6] === this.player.name && this.board[7] === this.player.name && this.board[8] === this.player.name) ||
            (this.board[0] === this.player.name && this.board[3] === this.player.name && this.board[6] === this.player.name) ||
            (this.board[1] === this.player.name && this.board[4] === this.player.name && this.board[7] === this.player.name) ||
            (this.board[2] === this.player.name && this.board[5] === this.player.name && this.board[8] === this.player.name) ||
            (this.board[6] === this.player.name && this.board[4] === this.player.name && this.board[2] === this.player.name) ||
            (this.board[0] === this.player.name && this.board[4] === this.player.name && this.board[8] === this.player.name)) {
            win.style.display = ''
            win.classList.add(this.player.winClass)
            const winText = win.querySelector('p').textContent = 'Winner'
            winner = this.player.name
           
        } else if (!game.board.includes('')) {
            win.style.display = ''
            win.classList.add('screen-win-tie')
            const tieText = win.querySelector('p').textContent = 'Tie'
            winner = 'tie'
            
        }
        console.log(winner)
        return winner
    },
    hover: function() {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener('mouseover', function(e) {
                var validmove = game.validMove(i)
                if (validmove) {
                    box[i].style.backgroundImage = game.player.background
                }
            })
        }
    }(),
    hoverOut: function() {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener('mouseout', function(e) {

                box[i].style.backgroundImage = ""

            })
        }
    }()
}

game.makeMove()
// game.hover()
// game.hoverOut()


 var copyBoard = function(board) {
    return board.slice(0) 
 }


var newBoard =[]

function aiValidmove (move, player, board) {
newBoard = copyBoard(board);
if (newBoard[move] === ''){
    newBoard[move] = player 

    return newBoard
} else {
    return null
}

}



aiMove = function () {
     var bestMoveScore = 100
     
     if ((winner === minPlayer) || (winner == maxPlayer) || (winner === 'tie')) {
         return null;
     }
     else {
         for (var i = 0; i < game.board.length; i++) {
            let newB = aiValidmove(i, minPlayer, game.board)
     
             if (newB) {
            
                 var moveScore = maxScore(newB)
              
                 if (moveScore < bestMoveScore) {
                     bestMoveScore = moveScore
                     move = i
                    
                 }

             }
         }
         game.board[move] = minPlayer
         box[move].classList.add(Oplayer.class)
         this.winner()
         game.iteratePlayer()
     }
     }.bind(game)

 

     function minScore(board) {
         if (aiWinner(board, 'X')) {
             return 10
         } else if (aiWinner(board, 'O')) {
             return -10;
         } else if (aiTie(board)) {
             return 0;
         }
      else {
         var bestMoveScore = 100
         var move = null;
         for (let i = 0; i < game.board.length; i++) {
             var newB = aiValidmove(i, minPlayer, newBoard)
             if (newB) {
                console.log('mim move valid' + newB)
                 var predictedMoveScore = maxScore(newB)
                 if (predictedMoveScore < bestMoveScore) {
                     bestMoveScore = predictedMoveScore;
                     move = i;
                 }
             }

         }
         console.log("MIN  " + bestMoveScore)
         return bestMoveScore
     }
 }

 

 function maxScore(board) {
        if (aiWinner(board, 'X')) {
             return 10
         } else if (aiWinner(board, 'O')) {
             return -10;
         } else if (aiTie(board)) {
             return 0;
         }
  else {
     var bestMoveScore = -100
     var move = null;
     for (let i = 0; i < game.board.length; i++) {
         var newB = aiValidmove(i, maxPlayer, newBoard)
         if (newB) {
            console.log('max move valid' + newB)
             var predictedMoveScore = minScore(newB)
             if (predictedMoveScore > bestMoveScore) {
                 bestMoveScore = predictedMoveScore;
                 move = i;
             }

         }

     } 
     console.log("MAX" + bestMoveScore)
     return bestMoveScore
 }
 }

newGame.addEventListener('click', function() {
    game.board.fill('')
    win.classList.remove(Xplayer.winClass)
    win.classList.remove(Oplayer.winClass)
    win.style.display = 'none'
    game.player = Xplayer
    newBoard = []
    winner = ''
    for (i = 0; i < box.length; i++) {
        box[i].classList.remove(Xplayer.class)
        box[i].classList.remove(Oplayer.class)
    }
})




function aiWinner(board, player) {
        if ((board[0] === player && board[1] === player && board[2] ===  player) ||
            (board[3] === player&& board[4] === player && board[5] ===  player) ||
            (board[6] === player && board[7] === player && board[8] ===  player) ||
            (board[0] === player && board[3] === player && board[6] ===  player) ||
            (board[1] === player && board[4] === player && board[7] ===  player) ||
            (board[2] === player && board[5] === player && board[8] ===  player) ||
            (board[6] === player && board[4] === player && board[2] ===  player) ||
            (board[0] === player&& board[4] === player && board[8] ===  player)) {
        return true;
    }else {
        return false;
    }

}

function aiTie(board) {
  var moves = board.join('').replace(/ /g, '');
  if (moves.length === 9) {
    return true;
  }
  return false;
}