/* eslint-disable react/prop-types */

export const Quizstart = (props) => {
  const starter = props.starter
  const starterFn = props.handleStarter
  return (
    <div>
      <h1>Quizzical</h1>
      <p>Some Description</p>
      <button className="start-btn" onClick={() => starterFn(!starter)}>Start Quiz</button>
    </div>
  )
}
