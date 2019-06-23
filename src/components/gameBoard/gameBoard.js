import React, {Component} from 'react';
import './gameBoard.css';

class GameBoard extends Component {
  state = {
    directions: [],
    slots: [],
    playerOne: true,
    occupiedSpaces: [],
    black: [],
    red: []
  }

  componentDidMount() {
    const numberArr = Array.apply(null, {length: 42}).map(Number.call, Number);

    numberArr.forEach(num => {
      const numObj = {
        id: num,
        style: 'clear',
      }
      this.setState(prevState => ({slots: [...prevState.slots, numObj]}));
    });
    
  }

  render () {
      const { slots } = this.state;
      return(
          <>
            <div className='boardFrame'>
              {slots.map(n => (
                <div 
                  className={`boardHoles ${n.style}`}
                  key={n.id}
                  onClick={() => this.columnHandler(n.id)}
                  value={n.id}
                >{n.id}
                </div>
              ))}
            </div>
          </>
      )
  }

  columnHandler = num => {
    const {occupiedSpaces, slots, playerOne, black, red} = this.state;
    let currentRow = num;
    const colorName = playerOne ? 'black' : 'red';
    const currentColorArr = playerOne ? black : red;

    if (occupiedSpaces.includes(currentRow)) {
      return;
    } else if (currentRow + 7 <= 41 && !occupiedSpaces.includes(currentRow + 7)) {
      currentRow = currentRow + 7;
      return this.columnHandler(currentRow);
    } else {
      const slotCopy = slots;
      slotCopy[currentRow].style = colorName;
      this.setState({playerOne: !playerOne, slots: slotCopy, [colorName]: [...currentColorArr, currentRow], occupiedSpaces: [...occupiedSpaces, currentRow]});
      if (this.checkDownwardSlope(currentRow) || this.checkUpwardSlope(currentRow) || this.checkHorizontal(currentRow) || this.checkVertical(currentRow)) {
        console.log('YOU WOOOOON!!');
      }
    };
  };

  checkDownwardSlope = num => {
    const {red, black, playerOne} = this.state;
    const currentColorArr = playerOne ? black : red;
    const slope = [];
    const unacceptableSlotNumbers = [4, 5, 6, 12, 13, 20, 21, 28, 29, 35, 36, 37]

    slope.push(num)
    if (currentColorArr.length) {
      if (currentColorArr.includes(num + 8) && !unacceptableSlotNumbers.includes(num + 8)) {
        slope.push(num + 8);
        if (currentColorArr.includes(num + 16) && !unacceptableSlotNumbers.includes(num + 16)) {
          slope.push(num + 16);
          if (currentColorArr.includes(num + 24) && !unacceptableSlotNumbers.includes(num + 24)) {
            slope.push(num + 24);
          }
        }
      }
      if (currentColorArr.includes(num - 8) && !unacceptableSlotNumbers.includes(num - 8)) {
        slope.push(num - 8);
        if (currentColorArr.includes(num - 16) && !unacceptableSlotNumbers.includes(num - 16)) {
          slope.push(num - 16);
          if (currentColorArr.includes(num - 24) && !unacceptableSlotNumbers.includes(num - 24)) {
            slope.push(num - 24);
          }
        }
      }
      return slope.length >= 4;
    }
  };

  checkUpwardSlope = num => {
    const {red, black, playerOne} = this.state;
    const currentColorArr = playerOne ? black : red;
    const slope = [];
    const unacceptableSlotNumbers = [0, 1, 2, 7, 8, 14, 27, 33, 34, 39, 40, 41];

    slope.push(num)
    if (currentColorArr.length) {
      if (currentColorArr.includes(num + 6) && !unacceptableSlotNumbers.includes(num + 6)) {
        slope.push(num + 6);
        if (currentColorArr.includes(num + 12) && !unacceptableSlotNumbers.includes(num + 12)) {
          slope.push(num + 12);
          if (currentColorArr.includes(num + 18) && !unacceptableSlotNumbers.includes(num + 18)) {
            slope.push(num + 18);
          }
        }
      }
      if (currentColorArr.includes(num - 6) && !unacceptableSlotNumbers.includes(num - 6)) {
        slope.push(num - 6);
        if (currentColorArr.includes(num - 12) && !unacceptableSlotNumbers.includes(num - 12)) {
          slope.push(num - 12);
          if (currentColorArr.includes(num - 18) && !unacceptableSlotNumbers.includes(num - 18)) {
            slope.push(num - 18);
          }
        }
      }
      return slope.length >= 4;
    }
  }

  checkHorizontal = num => {
    const {red, black, playerOne} = this.state;
    const currentColorArr = playerOne ? black : red;
    const row = [];
    const unacceptableLeftNumbers = [0, 7, 14, 21, 28, 35];
    const unacceptableRightNumbers = [6, 13, 20, 27, 34, 41];

    row.push(num);
    if (currentColorArr.length) {
      if (currentColorArr.includes(num + 1) && !unacceptableLeftNumbers.includes(num + 1)) {
        row.push(num + 1);
        if (currentColorArr.includes(num + 2)) {
          row.push(num + 2);
          if (currentColorArr.includes(num + 3)) {
            row.push(num + 3);
          }
        }
      }
      if (currentColorArr.includes(num - 1) && !unacceptableRightNumbers.includes(num - 1)) {
        row.push(num - 1);
        if (currentColorArr.includes(num - 2)) {
          row.push(num - 2);
          if (currentColorArr.includes(num - 3)) {
            row.push(num - 3);
          }
        }
      }
      return row.length >= 4;
    }
  };

  checkVertical = num => {
    const {red, black, playerOne} = this.state;
    const currentColorArr = playerOne ? black : red;
    if (currentColorArr.includes(num + 7)) {
      if (currentColorArr.includes(num + 14)) {
        if (currentColorArr.includes(num + 21)) {
          return true;
        }
      }
    }
    return false;
  }
};

export default GameBoard;