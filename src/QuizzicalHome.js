import React from "react"

function QuizzicalHome({handlePlayButtonClick})
{
    return(
        <main className="quiz-home-page">
            <h1>Quizzical</h1>
            <p>A quiz app which asks you some random questions.</p>
            <button className="start-quiz-btn" onClick={handlePlayButtonClick}>Start quiz</button>
        </main>
    )
}

export default QuizzicalHome