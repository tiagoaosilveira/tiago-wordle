import { useCallback, useEffect, useState } from 'react'
import './App.css'
import ResultModal from "./components/ResultModal.jsx";
import ErrorToast from "./components/ErrorToast.jsx";

const wordSize = 4;
const wordList = [
  'BAKE',
  'FOUR',
  'GOOD',
  'ZERO',
  'TREE',
  'HOPE',
  'HUGE',
  'FIVE',
  'RACE',
  'MARS',
  'STAY',
  'CAME'
];

function App() {
  const [solution, setSolution] = useState(wordList[Math.floor(Math.random() * wordList.length)]);
  const [currentTry, setCurrentTry] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [tries, setTries] = useState(new Map([
    ['try1', Array(4).fill(['',''])],
    ['try2', Array(4).fill(['',''])],
    ['try3', Array(4).fill(['',''])],
  ]))

  const resetGame = () => {
    setResult('');
    setTries(new Map([
      ['try1', Array(4).fill(['',''])],
      ['try2', Array(4).fill(['',''])],
      ['try3', Array(4).fill(['',''])],
    ]));
    setCurrentPos(0);
    setCurrentTry(1);
    setSolution(wordList[Math.floor(Math.random() * wordList.length)]);
  }

  const solve = useCallback(() => {
    setTries(prevState => {
      const newState = new Map(prevState);
      for (let i = 0; i < wordSize; i++) {
        for (let j = 0; j < wordSize; j++) {
          if (newState.get(`try${currentTry}`)[i][0] === solution[j]) {
            if (i === j) {
              const updatedTryData = newState.get(`try${currentTry}`);
              updatedTryData[i][1] = 'green';
              newState.set(`try${currentTry}`, updatedTryData);
              break;
            } else {
              const updatedTryData = newState.get(`try${currentTry}`);
              updatedTryData[i][1] = 'yellow';
              newState.set(`try${currentTry}`, updatedTryData);
            }
          }
          const updatedTryData = newState.get(`try${currentTry}`);
          if (j === wordSize - 1 && updatedTryData[i][1] === '') {
            updatedTryData[i][1] = 'gray';
            newState.set(`try${currentTry}`, updatedTryData);
          }
        }
      }

      if (tries.get(`try${currentTry}`).every(letter => letter[1] === 'green')) {
        setTimeout(() => setResult('WIN'), 700);
      } else {
        if (currentTry === 3) {
          setTimeout(() => setResult('LOSE'), 700);
        }
      }
      return newState;
    });

    setCurrentTry(currentTry + 1);
    setCurrentPos(0);
  }, [currentTry, solution, tries]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (result) {
        return;
      }
      if (event.key >= 'a' && event.key <= 'z') {
        if (currentPos === wordSize) {
          return;
        }
        setTries((prevState) => {
          const newState = new Map(prevState);
          const updatedTryData = newState.get(`try${currentTry}`);
          updatedTryData[currentPos] = [event.key.toUpperCase(), ''];
          return newState.set(`try${currentTry}`, updatedTryData);
        })
        setCurrentPos(currentPos + 1);
      }
      if (event.key === 'Backspace') {
        setTries((prevState) => {
          const newState = new Map(prevState);
          const updatedTryData = newState.get(`try${currentTry}`);
          updatedTryData[currentPos - 1] = ['', ''];
          return newState.set(`try${currentTry}`, updatedTryData);
        })
        setCurrentPos(currentPos > 0 ? currentPos - 1 : 0);
      }
      if (event.key === 'Enter') {
        if (currentPos !== wordSize) {
          setError('Not enough letters!');
          return setTimeout(() => setError(undefined), 1500);
        }
        solve();
      }
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [currentTry, currentPos, solve, result]);

  return (
    <>
      <div className='grid-container'>
        <div className='try-container'>
          {tries.get('try1').map(((try1, idx) => {
            return <div className={`box ${try1[1]}`} key={idx}>{try1[0]}</div>
          }))}
        </div>
        <div className='try-container'>
          {tries.get('try2').map(((try2, idx) => {
            return <div className={`box ${try2[1]}`} key={idx}>{try2[0]}</div>
          }))}
        </div>
        <div className='try-container'>
          {tries.get('try3').map(((try3, idx) => {
            return <div className={`box ${try3[1]}`} key={idx}>{try3[0]}</div>
          }))}
        </div>
      </div>
      {<ResultModal result={result} onClose={() => resetGame()}/>}
      {<ErrorToast error={error}/>}
    </>
  )
}

export default App
