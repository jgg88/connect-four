import React, {Component} from 'react';
import './gameBoard.css';

class GameBoard extends Component {
  state = {
    columns: [],
  }

  componentDidMount() {
    let cols = 7;
    let rows = 6;
    this.createCells(cols, rows);
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
    // 1. check each cell in column for chip, stop at last unoccupied cell, update state with player's chip.
    // 2. check for win.
    // 3. return result of win.
  }

  createCells = (cols, rows) => {
    let columns = new Array(cols);
    for (let i = 0; i < columns.length; i++) {
      columns[i] = new Array(rows);
    }

    for (let i = 1; i <= cols; i++) {
      for (let j = 1; j <= rows; j++) {
        columns[i - 1][j - 1] = {
          id: (j - 1) * cols + i,
          style: 'clear',
        };
      }
    }
    this.setState({columns});
  }

  checkWin = num => {
    // How to do this? Same as previous, or possiblly:
    // For loop to iterate through grid, create separate arrays for each type of win (horiz, vert, diag)
    // then check each array and return arr.length >= 4.
  };

  newGame = () => {
    // will run / reset game.
  }
};

export default GameBoard;