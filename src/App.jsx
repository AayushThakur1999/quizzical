import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Question from './Question'
import { Quizstart } from './Quizstart'

const url = 'https://the-trivia-api.com/v2/questions';

function App() {
  // helps with the API call
  const [initialCall, setInitialCall] = useState(true);
  // holds the data from the API
  const [apiData, setApiData] = useState([])
  // its value decides which page to show either starting page or questions page
  const [starter, setStarter] = useState(false)
  // keeps the count of number of correct answers
  const [answerCount, setAnswerCount] = useState(0)
  const [showReset, setShowReset] = useState(false)
  // helps with the final coloring of the correct and incorrect answers 
  const [answersOut, setAnswersOut] = useState(false)

  // this fn. handles the value of starter state variable and changes it based on the button click in starting page
  function handleQuizStart(value) {
    setStarter(value);
  }

  // keeps track of 
  function selectAnswer(event, index, answer, increment, setIncrement, setSelectedOption) {

    const selectedOptionText = event.target.innerText;

    // eslint-disable-next-line no-empty
    if (selectedOptionText === answer && increment) { }
    else if (selectedOptionText === answer && !increment) {
      answerCounter(1)
      setIncrement(true)
      setSelectedOption(index); // Set the selected option
    } else if (selectedOptionText !== answer && !increment) {
      setSelectedOption(index);
    } else if (selectedOptionText !== answer && increment) {
      answerCounter(-1)
      setIncrement(false)
      setSelectedOption(index); // Set the selected option
    }
  }

  // keeps the count of number of correct answers
  function answerCounter(data) {
    setAnswerCount(prevCount => prevCount + data);
  }

  function checkAnswers() {
    setShowReset(true);
    setAnswersOut(true) // experimental
  }

  function playAgain() {
    setAnswerCount(0); // Reset answer count
    setShowReset(false); // Hide the reset button
    setStarter(false); // Show the starting page
    setInitialCall(prevState => !prevState);
    setApiData([]); // 
    setAnswersOut(false);
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
      // destructured data property
      const { data } = await axios(url)
      const shuffledData = data.map(item => {
        const options = shuffle([...item.incorrectAnswers, item.correctAnswer]);
        return { ...item, options }; // Add shuffled options to each item
      });
      setApiData(shuffledData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [initialCall])

  // creating an array of question component of length equal to the no. of questions in API
  const array = apiData.map((item, index) =>
    <Question
      key={index}
      item={item}
      id={index}
      count={answerCount}
      countUpdate={answerCounter}
      answersOut={answersOut}
      selectAnswer={selectAnswer} />
  );

  return (
    <>
      {/* the logic deciding which component to display based on the starter useState variable */}
      {
        starter ?
          <div className='quiz-page'>
            {array}
            <button
              className={showReset || apiData.length === 0 ? 'hide' : 'show'}
              onClick={checkAnswers}
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

export default App;
