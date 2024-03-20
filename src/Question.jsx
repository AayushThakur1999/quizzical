/* eslint-disable react/prop-types */
// import React from 'react'

const Question = (props) => {

  const item = props.item
  const options = item.incorrectAnswers
  options.push(item.correctAnswer)
  console.log(item);
  console.log(options)
  return (
    <>
      <h3>{item.question.text}</h3>
      <div className="options">
        <span>{options[0]}</span>
        <span>{options[1]}</span>
        <span>{options[3]}</span>
        <span>{options[2]}</span>
      </div>
      <hr />
    </>
  )
}

export default Question;