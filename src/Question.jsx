/* eslint-disable react/prop-types */

const Question = (props) => {

  const item = props.item
  const array = [...item.incorrectAnswers]
  array.push(item.correctAnswer)
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const options = shuffle(array)

  return (
    <>
      <h3>{item.question.text}</h3>
      <div className="options">
        <span>{options[0]}</span>
        <span>{options[1]}</span>
        <span>{options[2]}</span>
        <span>{options[3]}</span>
      </div>
      <hr />
    </>
  )
}

export default Question;