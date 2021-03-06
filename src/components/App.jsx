import React, {useState} from "react";
import PlayNumber from "./PlayNumber";
const App = () => {
  const [stars, setStars] = useState(utils.random(1,9))
  const [availableNum, setAvailableNums] = useState(utils.range(1,9))
  const [candidateNums, setcandidateNums] = useState([] );
  //candidateNums
  //availableNums
  const candidatesAreWrong = utils.sum(candidateNums) >stars;


  const numberStatus = number =>{
    if (!availableNum.includes(number)){
      return 'used'
    }if (candidateNums.includes(number)){
      return candidatesAreWrong ? 'wrong' : 'candidate';
    } 
    return 'available'
  }

  const onNumberClick = (number, currentStatus) => {

    console.log(number, currentStatus)
  }


  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {utils.range(1,stars).map(starId => 
             <img key={starId} className="star" count={stars} src="https://avatars.githubusercontent.com/u/33076303?v=4"/>)}
        </div>
        <div className="right">
          {utils.range(1,9).map(numId =>
            <PlayNumber onClick = {onNumberClick} key={numId} number={numId} status={numberStatus(numId)} />)}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};



// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // p ick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};


export default App;