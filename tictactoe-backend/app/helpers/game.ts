/** Game helper class. */
class Game {
  winCombinations: number[][]
  player: string
  ai: string

  constructor() {
    this.winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ]
    this.player = 'O'
    this.ai = 'X'
  }

  makeAiTurn(board: Array<string | number>) {
    board[this.bestSpot(board)] = this.ai
    return board
  }

  checkWinner(board: Array<string | number>) {
    return (
      this.checkTie(board) ||
      this.checkWin(board, this.ai) ||
      this.checkWin(board, this.player)
    )
  }

  checkTie(board: Array<string | number>) {
    return !this.emptySquares(board).length ? 'Tie' : null
  }

  emptySquares(board: Array<string | number>): Array<any> {
    return board.filter(s => typeof s == 'number')
  }

  checkWin(board: Array<string | number>, player: string) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), [])

    let gameWon = null
    for (let [index, win] of this.winCombinations.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = player
        break
      }
    }
    return gameWon
  }

  bestSpot(board: Array<string | number>) {
    return this.minimax(board, this.ai).index
  }

  minimax(newBoard: Array<string | number>, player: string): any {
    var availSpots = this.emptySquares(newBoard)

    if (this.checkWin(newBoard, player)) {
      return { score: -10 }
    } else if (this.checkWin(newBoard, this.ai)) {
      return { score: 20 }
    } else if (availSpots.length === 0) {
      return { score: 0 }
    }

    var moves = []
    for (var i = 0; i < availSpots.length; i++) {
      var move = {} as any
      move.index = newBoard[availSpots[i]]
      newBoard[availSpots[i]] = player

      if (player == this.ai) {
        var result = this.minimax(newBoard, this.player)
        move.score = result.score
      } else {
        var result = this.minimax(newBoard, this.ai)
        move.score = result.score
      }

      newBoard[availSpots[i]] = move.index

      moves.push(move)
    }

    var bestMove
    if (player === this.ai) {
      var bestScore = -10000
      for (i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } 
    else {
      var bestScore = 10000
      for (i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }
    return moves[bestMove]
  }
}

export default new Game()
