/* eslint-disable react/prop-types */
import { useState } from 'react'

const Question = (props) => {

  const [selection, setSelection] = useState(false)
  const [increment, setIncrement] = useState(false)
  const [checked, setChecked] = useState(false);
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState(null)

  const item = props.item
  const answer = item.correctAnswer
  console.log("ANS:-", answer);
  // console.log(item)
  const options = item.options
  // console.log(options);

  const checkAnswer = (event, index) => {
    const selectedOptionText = event.target.innerText;
    if (selectedOptionText === answer && increment) {
      console.log('Already checked right answer!!');
      console.log(props.count);
    } else if (selectedOptionText === answer && !increment) {
      props.countUpdate(1)
      setIncrement(true)
      setSelection(true)
      setSelectedOption(index); // Set the selected option
      console.log(props.count);
    } else if (selectedOptionText !== answer && !increment) {
      setSelection(true)
      setSelectedOption(index);
      console.warn('Wrong Selection!');
      console.log(props.count);
    } else if (selectedOptionText !== answer && increment) {
      props.countUpdate(-1)
      setIncrement(false)
      setSelection(true)
      setSelectedOption(index); // Set the selected option
      console.log(props.count);
    }
    // console.log(event);
  }
  
  return (
    <div className='question'>
      <h3>{item.question.text}</h3>
      <div className="options">
        {options.map((option, index) => (
          <span
            key={index}
            onClick={(event) => checkAnswer(event, index)}
            className={selectedOption === index ? 'option selected' : 'option'}
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