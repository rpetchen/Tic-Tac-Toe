const startButton = document.querySelector('header .button')
const start = document.getElementById('start')
const boxes = document.querySelector('.boxes')
const box = boxes.children
const win = document.getElementById('finish')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

start.addEventListener('click', function() {
start.style.display = 'none'
player2.classList.add('active')
})



var player = function (name, src, background, pClass) {
	this.name = name
	this.src = src
	this.background = background
	this.class = pClass
}

Xplayer = new player('X', "img/x.svg", "url('img/x.svg')", "box-filled-2")
Oplayer = new player('O', "img/o.svg", "url('img/o.svg')", "box-filled-1")

var game = {
board: ['', '', '', '', '', '', '', '', ''],
player: Xplayer,
iteratePlayer: function() {
if (this.player === Xplayer) {
	this.player = Oplayer
	player2.classList.remove('active')
	player1.classList.add('active')
	
}
else if (this.player === Oplayer) {
	this.player = Xplayer
	player1.classList.remove('active')
	player2.classList.add('active')	
}
},
validMove: function (i) {
		if (this.board[i] == '' ) {
			return true
		}
	else {return false}
},
listener: function () {
for (let i = 0; i < box.length; i ++) {
box[i].addEventListener('click', function (e) {
var validmove =  this.validMove(i)
if (validmove){
e.target.classList.add(this.player.class)
console.log(this.player.class)
this.board[i] = this.player.name
this.winner()
game.iteratePlayer()
}
}.bind(this), false)
}
},
winner: function() {
	if (this.board[0] === this.player.name && this.board[1] === this.player.name && this.board[2] === this.player.name) {
		console.log(this.player.name + ' ' + 'wins')
		win.style.display = ''
	}
	if (this.board[3] === this.player.name && this.board[4] === this.player.name && this.board[5] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
     }
	if (this.board[6] === this.player.name && this.board[7] === this.player.name && this.board[8] === this.player.name) {	
	console.log(this.player.name + ' ' + 'wins')
	}
	if (this.board[0] === this.player.name && this.board[3] === this.player.name && this.board[6] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
	}
	if (this.board[1] === this.player.name && this.board[4] === this.player.name && this.board[7] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
	}
	if (this.board[2] === this.player.name && this.board[5] === this.player.name && this.board[8] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
	}
	if (this.board[6] === this.player.name && this.board[4] === this.player.name && this.board[2] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
	}
	if (this.board[0] === this.player.name && this.board[4] === this.player.name && this.board[8] === this.player.name) {
	console.log(this.player.name + ' ' + 'wins')
	}
},
hover: function(){
for (let i = 0; i < box.length; i ++) {
box[i].addEventListener('mouseover', function (e) {
var validmove =  this.validMove(i)
if (validmove){
	box[i].style.backgroundImage =  this.player.background
}



}.bind(this), false)
}
},
hoverOut: function() {
for (let i = 0; i < box.length; i ++) {
box[i].addEventListener('mouseout', function (e) {

	box[i].style.backgroundImage = ""

})
}
}
}
game.hover()
game.hoverOut()
game.listener()



function reset () {
game.board.fill('') 
for (i = 0; i < box.length; i++) {
	// if (box[i].classList.contains (Xplayer.class) || box[i].classList.contains (Oplayer.class)) {
	box[i].classList.remove(Xplayer.class) 
	box[i].classList.remove(Oplayer.class) 
// }
}
}