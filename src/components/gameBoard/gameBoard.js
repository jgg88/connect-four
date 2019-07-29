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
    winningPieces: [],
  }

  componentDidMount() {
    this.createCells();
  }

  render () {
      const { columns, winningPieces } = this.state;

      return (
        <div>
          {winningPieces.length ? <Winner/> : <Players/>}
          <div className='boardFrame'>
              {columns.map((cols, i) => {
                return <div className='boardColumn' key={i}>
                  {cols.map(cell => {
                    return <div className={'boardCellBorder'} key={cell.id}>
                      <div
                        className={`cells ${cell.style} ${winningPieces.includes(cell.id) ? 'highlightWinner' : ''}`}
                        key={cell.id}
                        onClick={!winningPieces.length ? () => this.addChip(cell.id) : null}
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
      // TODO: Resolve bug that chips don't animate when color is same as below.
      // This is because the style has not updated to trigger the css animation a second time.
      let columnsCopy = columns;
      columnsCopy.forEach((column, i) => {
        column.forEach((cell, j) => {
          if (cell.id === cellID) {
            cell.style = `clear ${colorName}ToClear`;
          }
        });
      });
      cellID = cellID + 7;
      return this.addChip(cellID);
    } else {
      let columnsCopy = columns;
      columnsCopy.forEach(column => {
        column.forEach((cell, i) => {
          if (cell.id === cellID) {
            cell.style = colorName;
          }
          return cell;
        });
      });
      this.setState({playerOne: !playerOne, columns: columnsCopy, [colorName]: [...currentColorArr, cellID], occupiedSpaces: [...occupiedSpaces, cellID]});
      this.setState({winningPieces: this.checkWin([...currentColorArr, cellID])});
    }
  }

  checkWin = (currentColorArr) => {
    let backwardDiagonal = [];
    let forwardDiagonal = [];
    let horizontal = [];
    let vertical = [];

    for (let i = 1; i <= MAX_COLS; i++) {
      for (let j = 0; j < MAX_ROWS; j++) {
        for (let k = 0; k <= 3; k++) { 
          // Check for backward diagonal
          // ============================
          if (i + k <= MAX_COLS && currentColorArr.includes((j + k) * MAX_COLS + (i + k))) {
            backwardDiagonal.push((j + k) * MAX_COLS + (i + k));
            if (backwardDiagonal.length === 4) {
              return backwardDiagonal;
            }
            if (k === 3) {
              backwardDiagonal = [];
            }
          } else {
            backwardDiagonal = [];
          }

          // Check for forward diagonal
          // ============================
          if (i + k <= MAX_COLS && currentColorArr.includes((j - k) * MAX_COLS + (i + k))) {
            forwardDiagonal.push((j - k) * MAX_COLS + (i + k));
            if (forwardDiagonal.length === 4) {
              return forwardDiagonal;
            }
            if (k === 3) {
              forwardDiagonal = [];
            }
          } else {
            forwardDiagonal = [];
          }

          // Check for horizontal win
          // ============================
          if (currentColorArr.includes(j * MAX_COLS + (i + k))) {
            horizontal.push(j * MAX_COLS + (i + k));
            if (horizontal.length === 4) {
              return horizontal;
            }
            if (k === 3) {
              horizontal = [];
            }
          } else {
            horizontal = [];
          }

          // Check for vertical win
          // ============================
          if (currentColorArr.includes((j + k) * MAX_COLS + i)) {
            vertical.push((j + k) * MAX_COLS + i);
            if (vertical.length === 4) {
              return vertical;
            }
            if (k === 3) {
              vertical = [];
            }
          }
           else {
            vertical = [];
          }
        };
      };
    };
    return [];
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