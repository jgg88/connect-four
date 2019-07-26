import React, {Component} from 'react';
import './gameBoard.css';
import { MAX_COLS, MAX_ROWS } from '../../constants';

class GameBoard extends Component {
  state = {
    columns: [],
    occupiedSpaces: [],
    playerOne: true,
    black: [],
    red: [],
  }

  componentDidMount() {
    this.createCells();
  }

  render () {
      const { columns } = this.state;
      return (
          <div className='boardFrame'>
            {columns.map((cols, i) => {
              return <div className='boardColumn' key={i}>
                {cols.map(cell => {
                  return <div 
                    className={`cells ${cell.style}`}
                    key={cell.id}
                    onClick={() => this.addChip(cell.id)}
                    value={cell.id}
                  > {cell.id}
                  </div>
                })}
              </div>
            })}
          </div>
      )
  }

  addChip = cellID => {
    // TODOs:
    // 1. *DONE* check each cell in column for chip, stop at last unoccupied cell, update state with player's chip.
    // 2. check for win.
    // 3. handle result of win.

    const { occupiedSpaces, columns, playerOne, black, red } = this.state;
    const colorName = playerOne ? 'black' : 'red';
    const currentColorArr = playerOne ? black : red;

    if (occupiedSpaces.includes(cellID)) {
      return;
    } else if (cellID + 7 <= 42 && !occupiedSpaces.includes(cellID + 7)) {
      cellID = cellID + 7;
      return this.addChip(cellID);
    } else {
      let columnsCopy = columns;
      columnsCopy.forEach(column => {
        column.forEach(cell => {
          if (cell.id === cellID) {
              cell.style = colorName;
            }
            return cell;
        });
      });
      this.setState({playerOne: !playerOne, columns: columnsCopy, [colorName]: [...currentColorArr, cellID], occupiedSpaces: [...occupiedSpaces, cellID]});
      this.checkWin([...currentColorArr, cellID]);
    }
  }

  checkWin = (currentColorArr) => {
    // How to do this? Same as previous, or possiblly:
    // For loop to iterate through grid, create separate arrays for each type of win (horiz, vert, diag)
    // then check each array and return arr.length >= 4.

    const { occupiedSpaces, columns } = this.state;
    let diagonalForward = 0;
    for (let i = 0; i < MAX_COLS; i++) {
      for (let j = 0; j < MAX_ROWS; j++) {
        for (let k = 0; k <= 3; k++) {
          if (i + k <= MAX_COLS && currentColorArr.includes(((j + k) - 1) * MAX_COLS + (i + k))) {
            diagonalForward++;
            if (diagonalForward === 4) {
              console.log('YOU WIN!!!');
              return true;
            }
            if (k === 3) {
              diagonalForward = 0;
            }
          } 
          else {
            diagonalForward = 0;
          }

        }
      };
    };

    // Check diagonalBackward

    //vertical

    //horizontal
  }

  createCells = () => {
    let columns = new Array(MAX_COLS);
    for (let i = 0; i < columns.length; i++) {
      columns[i] = new Array(MAX_ROWS);
    }

    for (let i = 1; i <= MAX_COLS; i++) {
      for (let j = 1; j <= MAX_ROWS; j++) {
        columns[i - 1][j - 1] = {
          id: (j - 1) * MAX_COLS + i,
          style: 'clear',
        };
      }
    }
    this.setState({columns});
  }

  newGame = () => {
    // will run / reset game.
  }
};

export default GameBoard;