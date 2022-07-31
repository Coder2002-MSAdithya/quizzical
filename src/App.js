import React from "react"
import QuizzicalHome from "./QuizzicalHome"
import Question from './Question'

function App()
{
    const numQuestions = 6
    const onesArray = Array.from(Array(numQuestions).keys()).map(e => 1)
    const [yetToPlayQuiz, setYetToPlayQuiz] = React.useState(true)
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizEvaluated, setQuizEvaluated] = React.useState(false)
    const [correctAnsPositions, setCorrectAnsPositions] = React.useState(onesArray.map(one => Math.ceil(Math.random() * 4)))
    
    function changeSelectedOption(evt, index, val)
    {
        setQuizQuestions(prevQues => prevQues.map((q, i) => i === index ? {...q, selectedOption: val} : {...q}))    
    }
    
    function countCorrectAnswers()
    {
        let marks = 0
        
        for(let i = 0; i < quizQuestions.length; i++)
        {
            if(quizQuestions[i].correct_answer === quizQuestions[i].selectedOption)
            {
                marks++
            }
        }
        
        return marks
    }
    
    function resetQuiz()
    {
        setQuizEvaluated(false)
        setQuizQuestions(prevQues => prevQues.map(q => ({...q, selectedOption: ""})))
    }
    
        const checkScoresJSX = <button className="quiz-check" onClick={(evt) => setQuizEvaluated(true)}>Check Answers</button>
        
        const playAgainJSX = <div className="quiz-result">
            <span>You have scored {countCorrectAnswers()} out of {numQuestions}</span> 
            <button className="quiz-play-again" onClick={resetQuiz}>Play Again</button></div>
    
    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=19&encode=url3986`).then(data => data.json()).then(res => setQuizQuestions(res.results.map(q => ({...q, selectedOption: ""}))))
    }, [])
    
    const questionElements = quizQuestions.map((ques, index) => <Question key={`q-${index+1}`} data={ques} numOptions={ques.type === "multiple" ? 4 : 2} handleOptionClick={changeSelectedOption} ind={index} correctPos={correctAnsPositions[index]} showStatus={quizEvaluated}/>)
    
    return(
    yetToPlayQuiz ? <QuizzicalHome handlePlayButtonClick={() => setYetToPlayQuiz(false)}/> :
        <main className="quiz-questions-page">
            {questionElements}
            {quizEvaluated ? playAgainJSX : checkScoresJSX}
        </main>
    )
}

export default App