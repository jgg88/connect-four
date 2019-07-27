import React, {Component} from 'react';
import './gameBoard.css';
import Players from '../players/players';
import Winner from '../winner/winner';
import { MAX_COLS, MAX_ROWS } from '../../constants';

class GameBoard extends Component {
  state = {
    columns: [],
    occupiedSpaces: [],
    playerOne: true,
    black: [],
    red: [],
    isWinner: false,
  }

  componentDidMount() {
    this.createCells();
  }

  render () {
      const { columns, isWinner } = this.state;
      return (
        <div>
          {isWinner ? <Winner/> : <Players/>}
          <div className='boardFrame'>
              {columns.map((cols, i) => {
                return <div className='boardColumn' key={i}>
                  {cols.map(cell => {
                    return <div className={'boardCellBorder'} key={cell.id}>
                      <div 
                        className={`cells ${cell.style}`}
                        key={cell.id}
                        onClick={() => this.addChip(cell.id)}
                        value={cell.id}
                      />
                    </div>
                  })}
                </div>
              })}
            </div>
          </div>
      )
  }

  addChip = cellID => {
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
      if (this.checkWin([...currentColorArr, cellID])) {
        this.setState({isWinner: true})
      }
    }
  }

  checkWin = (currentColorArr) => {
    let backwardDiagonal = 0;
    let forwardDiagonal = 0;
    let horizontal = 0;
    let vertical = 0;

    for (let i = 1; i <= MAX_COLS; i++) {
      for (let j = 0; j < MAX_ROWS; j++) {
        for (let k = 0; k <= 3; k++) {  
          // Check for backward diagonal
          // ============================
          if (i + k <= MAX_COLS && currentColorArr.includes((j + k) * MAX_COLS + (i + k))) {
            backwardDiagonal++;
            if (backwardDiagonal === 4) {
              return true;
            }
            if (k === 3) {
              backwardDiagonal = 0;
            }
          } else {
            backwardDiagonal = 0;
          }

          // Check for forward diagonal
          // ============================
          if (i + k <= MAX_COLS && currentColorArr.includes((j - k) * MAX_COLS + (i + k))) {
            forwardDiagonal++;
            if (forwardDiagonal === 4) {
              return true;
            }
            if (k === 3) {
              forwardDiagonal = 0;
            }
          } else {
            forwardDiagonal = 0;
          }

          // Check for horizontal win
          // ============================
          if (currentColorArr.includes(j * MAX_COLS + (i + k))) {
            horizontal++;
            if (horizontal === 4) {
              return true;
            }
            if (k === 3) {
              horizontal = 0;
            }
          } else {
            horizontal = 0;
          }

          // Check for vertical win
          // ============================
          if (currentColorArr.includes((j + k) * MAX_COLS + i)) {
            vertical++;
            if (vertical === 4) {
              return true;
            }
            if (k === 3) {
              vertical = 0;
            }
          }
           else {
            vertical = 0;
          }
        };
      };
    };
    return false;
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