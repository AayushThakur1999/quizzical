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
// this fn. handles the value of starter state variable and changes it based on the button click in starting page
  function handleQuizStart(data) {
    setStarter(data)
  }
  // function to get the questions from the trivia-api
  async function fetchData() {
    try {
      const resp = await axios(url)
      setApiData(resp.data)
      console.log(resp);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  // creating an array of question component of length equal to the no. of questions in API
  const array = apiData.map((item, index) => <Question key={index} item={item} id={index}/>)

  return (
    <>
    {/* the logic deciding which component to display based on the starter useState variable */}
      {
        starter ? 
        array : <Quizstart starter={starter} handleStarter={handleQuizStart}/>
      }
    </>
  )
}

export default App
