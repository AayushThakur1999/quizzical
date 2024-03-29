/* eslint-disable react/prop-types */

export const Quizstart = (props) => {
  const starter = props.starter
  const starterFn = props.handleStarter
  return (
    <div className="quizstart">
      <h1>Quizzical</h1>
      <p>A quiz game which contains questions from various field including geography, culture, music, general knowledge etc. </p>
      {/* this button sends the changed value of starter to App.jsx */}
      <button className="start-btn" onClick={() => starterFn(!starter)}>Start Quiz</button>
    </div>
  )
}
