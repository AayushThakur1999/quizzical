/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { useState } from 'react'

const Question = (props) => {

  // keeps track of increment for correct answer
  const [increment, setIncrement] = useState(false)
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState(null)

  const checked = props.answersOut;
  const item = props.item;
  const answer = item.correctAnswer;

  const options = item.options

  // Determine the index of the correct option
  const correctOptionIndex = options.findIndex(option => option === answer);

  const checkAnswer = (event, index) => {

    const selectedOptionText = event.target.innerText;

    if (selectedOptionText === answer && increment) {} 
    else if (selectedOptionText === answer && !increment) {
      props.countUpdate(1)
      setIncrement(true)
      setSelectedOption(index); // Set the selected option
    } else if (selectedOptionText !== answer && !increment) {
      setSelectedOption(index);
    } else if (selectedOptionText !== answer && increment) {
      props.countUpdate(-1)
      setIncrement(false)
      setSelectedOption(index); // Set the selected option
    }
  }

  return (
    <div className='question'>
      <h3>{item.question.text}</h3>
      <div className="options">
        {options.map((option, index) => (
          <span
            key={index}
            onClick={(event) => checkAnswer(event, index)}
            className={
              checked ?
                (selectedOption === index ?
                  (increment ?
                    'option correct' : 'option incorrect') :
                  (correctOptionIndex === index ? 'option correct' : 'option')) :
                (selectedOption === index ? "option selected" : "option")
            }
          >
            {option}
          </span>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default Question;