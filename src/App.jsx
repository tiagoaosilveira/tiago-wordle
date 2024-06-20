import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const wordSize = 4;

  const [currentTry, setCurrentTry] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [tries, setTries] = useState(new Map([
    ['try1', Array(4).fill(['',''])],
    ['try2', Array(4).fill(['',''])],
    ['try3', Array(4).fill(['',''])],
  ]))

  const solve = () => {

  }

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
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyUp]);

  return (
    <>
      <div className='try-container'>
        { tries.get('try1').map(((try1, idx) => {
          return <div className='box' key={idx}>{try1[0]}</div>
        }))}
      </div>
    </>
  )
}

export default App
