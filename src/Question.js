import React from "react"

function Question({data, numOptions, handleOptionClick, ind, correctPos, showStatus})
{
    let correctOptionPosition = correctPos
        
    const optionElements = []
    
    const questionText = decodeURIComponent(data.question)
    const correctAnswer = decodeURIComponent(data.correct_answer)
    const incorrectAnswers = [...data.incorrect_answers].map(str => decodeURIComponent(str))
    
    //Do'nt care about correctPos if question is true or false
    if(data.type === "boolean")
    {
        if(correctAnswer === "True")
        correctOptionPosition = 1
        else
        correctOptionPosition = 2
    }
    
    const [optionStates, setOptionStates] = React.useState([false, false, false, false])
    
    React.useEffect(() => {
        if(!showStatus)
        setOptionStates(numOptions === 4 ? [false, false, false, false] : [false, false])
    }, [showStatus])
    
    function determineStyles(optionNumber)
    {
        let styles = null
        
        if(!showStatus)
        {
            if(optionStates[optionNumber - 1])
            {
                styles={backgroundColor: "black", color: "white"}
            }
            else
            {
                styles={backgroundColor: "white", color: "black"}
            }
        }
        else
        {
            if(optionNumber === correctOptionPosition && optionStates[optionNumber-1])
            {
                styles={backgroundColor: "green", border: "1px solid green", color: "white"}
            }
            else if(optionNumber !== correctOptionPosition && optionStates[optionNumber-1])
            {
                styles={backgroundColor: "red", border: "1px solid red", opacity: "0.7", color: "white"}
            }
            else if(optionNumber === correctOptionPosition && !optionStates[optionNumber-1])
            {
                styles={backgroundColor: "blue", border: "1px solid blue", opacity: "0.8", color: "white"}
            }
        }
        
        return styles
    }
    
    function changeQuestionState(optionNumber)
    {
        if(!showStatus)
        setOptionStates(prevState => prevState.map((opts, index) => index === optionNumber - 1 ? !prevState[index] : false))
    }
    
    if(numOptions === 4)
    {   
        for(let i = 1; i <= 4; i++)
        {
            if(i === correctOptionPosition)
            {   
                optionElements.push(<span key={`opt-${i}`} style={determineStyles(i)} className="option" onClick={(evt) => {if(!showStatus)handleOptionClick(evt, ind, encodeURIComponent(correctAnswer));changeQuestionState(i)}}>{correctAnswer}</span>)
            }
            else
            {
                const optionValue = incorrectAnswers.pop()
                optionElements.push(<span key={`opt-${i}`} style={determineStyles(i)} className="option" onClick={(evt) => {if(!showStatus)handleOptionClick(evt, ind, encodeURIComponent(optionValue));changeQuestionState(i)}}>{optionValue}</span>)
            }
        }
    }
    else
    {
        const allOptions = ["True", "False"]
        
        for(let i = 1; i <= 2; i++)
        {
            const optionValue = allOptions[i - 1]
            
            optionElements.push(<span key={`opt-${i}`} style={determineStyles(i)} className="option" onClick={(evt) => {if(!showStatus)handleOptionClick(evt, ind, encodeURIComponent(optionValue));changeQuestionState(i)}}>{optionValue}</span>)
        }
    }

    return (<div className="quiz-question">
        <strong className="q-head">{questionText}</strong>
        <div className="options-container">
                {optionElements}
        </div>
        <hr/>
    </div>)
}

export default Question