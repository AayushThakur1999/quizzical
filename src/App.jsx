import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Question from './Question'
import { Quizstart } from './Quizstart'

const url = 'https://the-trivia-api.com/v2/questions'

function App() {
  // holds the data from the API
  const [apiData, setApiData] = useState([])
  // its value decides which page to show either starting page or questions page
  const [starter, setStarter] = useState(false)
  // keeps the count of number of correct answers
  const [answerCount, setAnswerCount] = useState(0)
  const [showReset, setShowReset] = useState(false)
  
  // this fn. handles the value of starter state variable and changes it based on the button click in starting page
  function handleQuizStart(data) {
    setStarter(data)
  }
  // keeps the count of number of correct answers
  function answerCounter(data) {
    setAnswerCount(prevCount => prevCount + data)
    console.log("correct answers", answerCount);
  }

  function playAgain() {
    setAnswerCount(0); // Reset answer count
    setShowReset(false); // Hide the reset button
    setStarter(false); // Show the starting page
    setApiData([]);
  }

  // Here Fisher-Yates sorting algorithm is used to shuffle an array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // function to get the questions from the trivia-api
  async function fetchData() {
    try {
      if (starter) {
        const resp = await axios(url)
        const shuffledData = resp.data.map(item => {
          const options = shuffle([...item.incorrectAnswers, item.correctAnswer]);
          return { ...item, options }; // Add shuffled options to each item
        });
        // console.log(shuffledData);
        setApiData(shuffledData);
        console.log(apiData);
        // console.log(resp);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    console.log('fetching again!!')
  }, [starter])

  // creating an array of question component of length equal to the no. of questions in API
  const array = apiData.map((item, index) =>
    <Question
      key={index}
      item={item}
      id={index}
      count={answerCount}
      countUpdate={answerCounter} />)

  return (
    <>
      {/* the logic deciding which component to display based on the starter useState variable */}
      {
        starter ?
          <div className='quiz-page'>
            {array}
            <button
              className={showReset || apiData.length === 0 ? 'hide' : 'show'}
              onClick={() => setShowReset(true)}
            >Check Answers</button>
          </div> : <Quizstart starter={starter} handleStarter={handleQuizStart} />
      }

      {
        showReset ?
          <div>
            <p>{`You scored ${answerCount}/${apiData.length} correct answers`}</p>
            <button onClick={() => playAgain()}>Play Again</button>
          </div> : ""
      }
    </>
  )
}

export default App
