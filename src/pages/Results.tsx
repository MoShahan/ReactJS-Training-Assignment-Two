import React, { useContext } from 'react'
import { AppContext, UserContext } from '../App'
import "../styles/Results.css"
import questions from "../questions.json";
import { Box } from '@mui/system';
import { TOTAL_QUESTIONS } from './Questions';
import { Paper } from '@mui/material';
import correct from "../images/accept.png"
import wrong from "../images/decline.png"

// number of TOTAL answers that the user has answered correctly
let correctAnswers = 0

// number of CheckBox answers that the user has answered correctly
let checkboxAnswered = 0

//colors
const myRed = "#F41434"
const myGreen = "#518959"

let radioCorrectAnswer = ""

let checkboxCorrectlyAnswered = false

const Results = () => {

  const [userDetails] = useContext(UserContext)

  const [appData] = useContext(AppContext)

  let allQuestions = [["Questions", "isAnswered"]]
  questions.map((data, index) => {
    allQuestions.push([data.question, "false"])
  })

  return (
    <div>

      <h2
        style={{ textAlign: "left", marginLeft: "20px" }}
      >
        Results:
      </h2>

      {Object.entries(appData.answers).map(
        ([currentIndex, answer]: any) => {

          //to bypass testing
          if (allQuestions[currentIndex]) {
            allQuestions[currentIndex][1] = "true"
          }

          if (answer.type === "checkbox") {

            checkboxCorrectlyAnswered = false
            // get number of correct answers
            let NumCheckBoxAnswers = 0

            checkboxAnswered = 0
            questions[currentIndex - 1].answerOptions.map((answer, index) => {
              if (answer.isCorrect)
                NumCheckBoxAnswers = NumCheckBoxAnswers + 1
            })

            let noFalseAnswers = true
            return (
              <Paper
                elevation={10}
                sx={{
                  width: "500px",
                  margin: "auto",
                  padding: "10px",
                  marginTop: "20px"
                }}
              >
                <h3>{questions[currentIndex - 1].id}. {questions[currentIndex - 1].question}</h3>
                {answer.value.map(
                  (tempArray: any) => {
                    let ansArray = tempArray.split(" ")

                    if (ansArray[1] === "true") {
                      checkboxAnswered = checkboxAnswered + 1
                    } else {
                      noFalseAnswers = false
                    }
                    if (noFalseAnswers && NumCheckBoxAnswers === checkboxAnswered) {
                      correctAnswers = correctAnswers + 1
                      checkboxCorrectlyAnswered = true
                    }
                    
                    return (
                      <Paper
                        elevation={10}
                        sx={{
                          bgcolor: ansArray[1] === "true" ? myGreen : myRed,
                          margin: "auto",
                          width: "200px",
                          fontWeight: "bolder",
                          fontSize: "1.2rem",
                          display: "flex",
                          padding: "5px 0",
                          paddingLeft: "20px",
                          marginTop: "10px",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {ansArray[0]}
                        {
                          ansArray[1] === "true" ?
                            (<img src={correct} alt="" className="icons" />) :
                            (<img src={wrong} alt="" className="icons" />)
                        }
                      </Paper>
                    )
                  }
                )}
                {checkboxCorrectlyAnswered ? "" : (
                  <Paper
                    elevation={15}
                    sx={{
                      width: "400px",
                      margin: "auto",
                      marginTop: "20px",
                      textAlign: "left",
                      padding: "10px"
                    }}
                  >
                    {checkboxCorrectlyAnswered ? "" : "Correct Answers: "}
                    {checkboxCorrectlyAnswered ? "" :
                      questions[currentIndex - 1].answerOptions.map((answer, index) => {
                        if (answer.isCorrect)
                          return (
                            <Paper
                              elevation={5}
                              sx={{
                                bgcolor: myGreen,
                                margin: "auto",
                                width: "350px",
                                fontWeight: "bolder",
                                fontSize: "1.1rem",
                                marginTop: "10px",
                                textAlign: "center",
                              }}>
                              {answer.option}
                            </Paper>
                          )
                      })
                    }
                  </Paper>
                )}
              </Paper>
            )

          } else if (answer.type === "radio") {
            let radioAns = answer.value.split(",")
            if (radioAns[1] === "true") {
              correctAnswers = correctAnswers + 1
            } else {
              questions[currentIndex - 1].answerOptions.map((answer, index) => {
                if (answer.isCorrect)
                  radioCorrectAnswer = answer.option
              })
            }
            return (
              <Paper
                elevation={10}
                sx={{
                  width: "500px",
                  margin: "auto",
                  padding: "10px",
                  marginTop: "20px"
                }}
              >
                <h3>{questions[currentIndex - 1].id}. {questions[currentIndex - 1].question}</h3>
                <Paper
                  elevation={10}
                  sx={{
                    bgcolor: radioAns[1] === "true" ? myGreen : myRed,
                    margin: "auto",
                    width: "200px",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                    display: "flex",
                    paddingLeft: "20px"
                  }}
                >
                  {radioAns[0]}
                  {
                    radioAns[1] === "true" ?
                      (<img src={correct} alt="" className="icons" />) :
                      (<img src={wrong} alt="" className="icons" />)
                  }
                </Paper>
                <Paper
                  elevation={10}
                  sx={{
                    bgcolor: myGreen,
                    margin: "auto",
                    width: "350px",
                    fontWeight: "bolder",
                    fontSize: "1.1rem",
                    marginTop: "10px"
                  }}
                >
                  {
                    radioAns[1] === "true" ? "" :
                      "Correct Answer: " + radioCorrectAnswer
                  }
                </Paper>
              </Paper>
            )

          } else if (answer.type === "textInput") {
            let textIsCorrect = false

            //bypassing testing
            if (questions[currentIndex - 1]) {
              if (answer.value.toLowerCase() === questions[currentIndex - 1].answerOptions[0]["option"].toLowerCase()) {
                textIsCorrect = true
              }
            }

            if (textIsCorrect) {
              correctAnswers = correctAnswers + 1

            }
            return (
              <Paper
                elevation={10}
                sx={{
                  width: "500px",
                  margin: "auto",
                  padding: "10px",
                  marginTop: "20px"
                }}
              >
                {questions[currentIndex - 1] ? (
                  <h3>{questions[currentIndex - 1].id}. {questions[currentIndex - 1].question}</h3>
                ) : ""}
                <Paper
                  elevation={10}
                  sx={{
                    bgcolor: textIsCorrect ? myGreen : myRed,
                    margin: "auto",
                    width: "200px",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                    display: "flex",
                    paddingLeft: "20px"
                  }}
                >
                  {answer.value}
                  {
                    textIsCorrect ?
                      (<img src={correct} alt="" className="icons" />) :
                      (<img src={wrong} alt="" className="icons" />)
                  }
                </Paper>

                <Paper
                  elevation={10}
                  sx={{
                    bgcolor: myGreen,
                    margin: "auto",
                    width: "350px",
                    fontWeight: "bolder",
                    fontSize: "1.1rem",
                    marginTop: "10px"
                  }}
                >
                  {
                    textIsCorrect ? "" : ("Correct Answer: " + questions[currentIndex - 1].answerOptions[0]["option"])
                  }
                </Paper>
              </Paper>
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

      <Paper
        elevation={10}
        sx={{
          width: "500px",
          margin: "auto",
          padding: "5px 15px",
          marginTop: "20px"
        }}
      >
        <h2
          style={{ color: "darkgray" }}
        >
          Unanswered Questions:
        </h2>
        {
          allQuestions.map((question, index) => {
            if (question[1] == "false") {
              return (
                <Paper
                  elevation={5}
                  sx={{
                    padding: "5px 0",
                    margin: "10px 0",
                    textAlign: "left",
                    paddingLeft: "80px",
                    color: "gray",
                    width: "auto"
                  }}
                >
                  {index}. {question[0]}
                </Paper>
              )
            }
          })
        }
      </Paper>

      <Paper
        elevation={10}
        sx={{
          width: "500px",
          margin: "auto",
          padding: "10px 0",
          marginTop: "20px"
        }}
      >
        <div
          id="pieChart"
          style={{
            backgroundImage:
              `conic-gradient(${myGreen} 0deg, ${myGreen} ${correctAnswers * 360 / TOTAL_QUESTIONS}deg, 
          ${myRed} ${correctAnswers * 360 / TOTAL_QUESTIONS}deg)`
          }}
        >
        </div>
        <p>
          Correct Answers:
          <span style={{ color: myGreen, fontWeight: "bolder", marginLeft: "10px" }}>
            {(correctAnswers * 100 / TOTAL_QUESTIONS).toFixed(2)}%
          </span>
        </p>
        <p>
          InCorrect Answers:
          <span style={{ color: myRed, fontWeight: "bolder", marginLeft: "10px" }}>
            {(100 - correctAnswers * 100 / TOTAL_QUESTIONS).toFixed(2)}%
          </span>
        </p>
      </Paper>

      <Paper
        elevation={10}
        sx={{
          textAlign: "left",
          width: "500px",
          margin: "auto",
          marginTop: "20px",
          padding: "10px 20px"
        }}
      >
        <p style={{ textDecoration: "underline" }}>Submitted by:</p>
        <p className='submissionDetails'>Name    : <span>{userDetails.name}</span></p>
        <p className='submissionDetails'>Age     : <span>{userDetails.age}</span></p>
        <p className='submissionDetails'>Gender  : <span>{userDetails.gender}</span></p>
      </Paper>

    </div >
  )
}

export default Results