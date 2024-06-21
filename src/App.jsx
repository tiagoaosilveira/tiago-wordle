import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
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

  const [solution, setSolution] = useState(wordList[Math.floor(Math.random() * wordList.length)]);
  const [currentTry, setCurrentTry] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [error, setError] = useState('');
  const [tries, setTries] = useState(new Map([
    ['try1', Array(4).fill(['',''])],
    ['try2', Array(4).fill(['',''])],
    ['try3', Array(4).fill(['',''])],
  ]))

  const solve = useCallback(() => {
    for (let i = 0; i < wordSize; i++) {
      for (let j = 0; j < wordSize; j++) {
        if (tries.get(`try${currentTry}`)[i][0] === solution[i]) {
          setTries(prevState => {
            const newState = new Map(prevState);
            const updatedTryData = newState.get(`try${currentTry}`);
            updatedTryData[i][1] = 'green-square';
            return newState.set(`try${currentTry}`, updatedTryData);
          })
        }
      }
    }
  }, [currentTry, solution, tries]);

  useEffect(() => {
    const handleKeyUp = (event) => {
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
          return setError('Not enough letters!');
        }
        solve();
      }
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [currentTry, currentPos, solve]);

  return (
    <>
      <div className='try-container'>
        { tries.get('try1').map(((try1, idx) => {
          return <div className={`box ${try1[1]}`} key={idx}>{try1[0]}</div>
        }))}
      </div>
      { error && <span>{error}</span> }
    </>
  )
}

export default App
