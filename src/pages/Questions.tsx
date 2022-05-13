import { Button, CircularProgress, Pagination, PaginationItem, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, AuthContext, UserContext } from "../App";
import QuestionCard from "../components/QuestionCard";
import questions from "../questions.json";
import { QuestionType } from "../types";

export const TOTAL_QUESTIONS = questions.length

// let firstTime = true

const Questions = () => {

  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // function handleNextButtonClick(index: number) {
  //   if (index === TOTAL_QUESTIONS - 1) {
  //     navigate("/results")
  //   } else {
  //     setCurrentQuestion((prev) => prev + 1)
  //   }
  // }

  function handleQuestionChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentQuestion(value);
  }


  // trying to chnge number color
  const [appData, dispatchAppData] = useContext(AppContext)
  // console.log("TESTING === ", Object.keys(appData.answers))
  let answeredQuestions = Object.keys(appData.answers) ?? []
  // const checkAnswered = (index: any) => {
  //   let quesColor = ""
  //   if (answeredQuestions.indexOf(index) >= 0)
  //     quesColor = "green"
  //   else
  //     quesColor = "gray"
  //   return quesColor
  // }

  const [authValues, setAuthValues] = useContext(AuthContext)

  function handleResults() {
    setAuthValues({ ...authValues, submitted: true })
    navigate("/results")
  }

  const [userDetails] = useContext(UserContext)

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {isLoading ? "" : (
        <Paper
          elevation={10}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 20px",
            bgcolor: "#39A78E",
            textAlign: "left",
            color: "#D9DBDA"
          }}
        >
          <p>Name    :
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
                backgroundColor: "rgba(0, 0, 0, 0.171)",
                padding: "5px",
                borderRadius: "5px",
                marginLeft: "5px"
              }}
            >
              {userDetails.name}
            </span>
          </p>
          <p>Age     :
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
                backgroundColor: "rgba(0, 0, 0, 0.171)",
                padding: "5px",
                borderRadius: "5px",
                marginLeft: "5px"
              }}
            >
              {userDetails.age}
            </span>
          </p>
          <p>Gender  :
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
                backgroundColor: "rgba(0, 0, 0, 0.171)",
                padding: "5px",
                borderRadius: "5px",
                marginLeft: "5px"
              }}
            >
              {userDetails.gender}
            </span>
          </p>
        </Paper>
      )
      }

      {
        isLoading ? (
          <CircularProgress />
          // <CircularProgressWithLabel value={50} />
        ) : (
          // map through all the questions and show only which question number == currentQuestion
          questions.map(
            (question, index) => {
              // if (answeredQuestions.indexOf(currentQuestion) >= 0) { return }
              return (
                currentQuestion === question.id && (
                  <Box
                    margin="10px"
                  >
                    <Typography variant="h3">
                      Question: {index + 1}
                    </Typography>
                    <Box
                      // margin="10px"
                      height="400px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <QuestionCard
                        id={question.id}
                        question={question.question}
                        questionType={question.questionType as QuestionType}
                        answers={question.answerOptions}
                      />

                    </Box>
                    <Button
                      // onClick={() => navigate("/results")}
                      onClick={handleResults}
                      disabled={index !== TOTAL_QUESTIONS - 1}
                      sx={{ "&:hover": { bgcolor: "white", color: "black", transform: "scale(1.1)" }, transition: "all 0.2s" }}
                    >
                      Submit
                    </Button>
                  </Box>
                )
              )
            }
          )
        )
      }
      {
        isLoading ? "" : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1.1rem"
            }}
          >
            <Pagination
              sx={{
                transform: "scale(1.4)"
              }}
              count={TOTAL_QUESTIONS}
              // defaultPage={currentQuestion}
              siblingCount={2}
              boundaryCount={2}
              size="large"
              showFirstButton
              // color="yellow"
              showLastButton
              page={currentQuestion}
              onChange={handleQuestionChange}
              renderItem={
                (item) => {
                  // console.log(item)
                  let colorTheme = "gray"
                  let currPage = item.page?.toLocaleString() ?? "0"
                  // console.log(currPage)
                  if (
                    answeredQuestions.indexOf(item.page?.toLocaleString() ?? "0") >= 0
                    && item.type === "page"
                    && appData.answers[currPage].value
                    && appData.answers[currPage].value.length > 0
                  ) {
                    colorTheme = "green"
                  }
                  // if (firstTime && item.type === "page" && item.page?.toLocaleString() === "1") {
                  //   colorTheme = "yellow"
                  //   firstTime = false
                  // }
                  if (item.type === "page" && item.page?.toLocaleString() === currentQuestion.toLocaleString()) {
                    colorTheme = "yellow"
                  }
                  return (
                    <PaginationItem
                      sx={{
                        color: colorTheme,
                        bgcolor: "rgba(0,0,0,0.1)",
                        "&:hover": { bgcolor: "white" }
                      }}
                      {...item}
                    />
                  )
                }
              }
            />
          </Box>
        )
      }
    </Box >
  )
}

export default Questions