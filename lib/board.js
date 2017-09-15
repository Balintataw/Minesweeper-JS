

export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  } //end of constructor

  get playerBoard() {
    return this._playerBoard;
  }

  //flips selected tile
  flipTile(rowIndex, columnIndex) {
    //remove arrow function?
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--; //return?
  } //ends flipTile

  //numbers and locates nearby bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; //other variables need append this._?
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    this._numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          return this._numberOfBombs++;
        }
      }
    });
    return this._numberOfBombs;
  } //end getNumberOfNeighborBombs

  hasSafeTiles(numberOfTiles, numberOfBombs) {
    //(any parameters in here?)
    return this._numberOfTiles !== this._numberOfBombs; //!== or ===
  } //ends hasSafeTiles

  print() {
    //what belongs in ()??
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n')); // supposed to be this._playerBoard?
  } //ends printBoard

  //generate player board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    this._board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      this._board.push(row);
    }
    return this._board;
  } //ends generatePlayerBoard

  //generate the bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      this._board.push(row);
    };

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (this._board[randomRowIndex][randomColumnIndex] !== 'B') {

        this._board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    };
    return this._board;
  }
} //ends generateBombBoard

; //end of board class

export default Board;