import React, { useContext } from 'react'
import { AppContext } from '../App'
import "../styles/Results.css"
import questions from "../questions.json";
import { Box } from '@mui/system';
import { TOTAL_QUESTIONS } from './Questions';

let correctAnswers = 0

// take all questions
// assign isAnswered to each
// display the remaining questions

const Results = () => {

  const [appData] = useContext(AppContext)
  // console.log("inside results ===", appData.answers)

  return (
    <div>
      <h2>Results:</h2>
      {Object.entries(appData.answers).map(
        ([currentIndex, answer]: any) => {
          if (answer.type === "checkbox") {

            // get number of correct answers
            let NumCheckBoxAnswers = 0
            questions[currentIndex - 1].answerOptions.map((answer,index) => {
              console.log(answer);
              if (answer.isCorrect)
                NumCheckBoxAnswers = NumCheckBoxAnswers + 1
            })

            // console.log("Answers in checkbox == ",NumCheckBoxAnswers);
            
            return (
              <Box>
                <h3>{questions[currentIndex - 1].question}</h3>
                {answer.value.map(
                  (tempArray: any) => {
                    // console.log("tempArray", tempArray)
                    // console.log("typeof tempArray ==", typeof (tempArray))
                    let ansArray = tempArray.split(" ")
                    let noFalseAnswers = true
                    let checkboxAnswered = 0
                    if (ansArray[1] === "true") {
                      checkboxAnswered = checkboxAnswered + 1
                    } else {
                      noFalseAnswers = false
                    }
                    if (noFalseAnswers && NumCheckBoxAnswers === checkboxAnswered) {
                      correctAnswers = correctAnswers + 1
                    }
                    // console.log("Number of correct answers =", correctAnswers)
                    // console.log("ansArray ==", ansArray)
                    return (
                      <p key={currentIndex} className={ansArray[1]}>{ansArray[0]}</p>
                    )
                  }
                )}
              </Box>
            )
          }
          else if (answer.type === "radio") {
            let radioAns = answer.value.split(",")
            if (radioAns[1] === "true") {
              correctAnswers = correctAnswers + 1
            }
            // console.log("Number of correct answers =", correctAnswers)
            return (
              <Box>
                <h3>{questions[currentIndex - 1].question}</h3>
                <p key={currentIndex} className={radioAns[1]}>{radioAns[0]}</p>
              </Box>
            )
          } else if (answer.type === "textInput") {
            let textIsCorrect = false
            // console.log("answer.value == ",answer.value)
            if (answer.value.toLowerCase() === questions[currentIndex - 1].answerOptions[0]["option"].toLowerCase()) {
              textIsCorrect = true
            }
            if (textIsCorrect) {
              correctAnswers = correctAnswers + 1
            }
            // console.log("Number of correct answers =", correctAnswers)
            return (
              <Box>
                <h3>{questions[currentIndex - 1].question}</h3>
                <p key={currentIndex} className={textIsCorrect ? "true" : "false"}>{answer.value}</p>
              </Box>
            )
          } else {
            return (
              <Box>
                <h3>{questions[currentIndex - 1].question}</h3>
                <p key={currentIndex}>{answer.value}</p>
              </Box>
            )
          }
        }
      )}
      <div
        id="pieChart"
        style={{
          backgroundImage:
            `conic-gradient(green 0deg, green ${correctAnswers * 360 / TOTAL_QUESTIONS}deg, 
          red ${correctAnswers * 360 / TOTAL_QUESTIONS}deg)`
        }}
      >
      </div>
      <p>Correct Answers: {correctAnswers * 100 / TOTAL_QUESTIONS}%</p>
      <p>InCorrect Answers: {100 - correctAnswers * 100 / TOTAL_QUESTIONS}%</p>
    </div>
  )
}

export default Results