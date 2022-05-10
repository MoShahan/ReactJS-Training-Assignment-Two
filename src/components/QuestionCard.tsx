import { useContext } from "react"
import { actions } from "../actions"
import { QuestionCardProps } from "../types"
import { AppContext } from "../App";
import { Card, TextField, Typography } from "@mui/material";
import CheckboxOptions from "./CheckboxOptions";
import RadioOptions from "./RadioOptions";
import questions from "../questions.json";

const QuestionCard = ({ id, question, questionType, answers }: QuestionCardProps) => {

    const { setAnswer } = actions

    const [appData, dispatchAppData] = useContext(AppContext)

    console.log("App data is", appData);

    return (
        <Card
            sx={{
                padding: "2rem",
                width: "500px",
                marginTop: "2rem",
                overflowY: "auto",
                height:"350px"
            }}
        >
            <Typography variant="h5" marginBottom="2rem">
                {question}
            </Typography>

            {(() => {
                switch (questionType) {

                    case "checkbox":
                        return (
                            <CheckboxOptions
                                handleChange={(e: any) => {
                                    let currentArray: any = []
                                    if (Array.isArray(appData.answers[id]?.value)) {
                                        currentArray = [...appData.answers[id]?.value]
                                    }
                                    if (e.target.checked) {
                                        // console.log("e.target.name ==",e.target.name)
                                        // let tempAnswers = e.target.name.split(" ")
                                        currentArray.push(e.target.name)
                                        // currentArray.push(tempAnswers)
                                    } else {
                                        const indexOfName = currentArray.indexOf(e.target.name)
                                        currentArray.splice(indexOfName, 1)
                                    }
                                    dispatchAppData(setAnswer(id, currentArray, questionType))
                                }}
                                options={answers.map((answer: any) => {
                                    return {
                                        isCorrect: answer.isCorrect,
                                        option: answer.option,
                                        // value: appData.answers[id]?.value.includes(answer.option) || false
                                        value: appData.answers[id]?.value.includes(answer.option + " " + answer.isCorrect) || false
                                    }
                                })}
                            />
                        )

                    case "radio":
                        return (
                            <RadioOptions
                                // options={answers.map((answer) => answer.option)}
                                options={answers.map((answer) => [answer.option, answer.isCorrect])}
                                value={appData.answers[id]?.value || ""}
                                handleChange={(e) => dispatchAppData(setAnswer(id, e.target.value, questionType))}
                            />
                        )

                    case "textInput":
                        // let textIsCorrect = false
                        // if (appData.answers[id]?.value === questions[id].answerOptions[0].option) {
                        //     textIsCorrect = true
                        // }
                        return (
                            <TextField
                                value={appData.answers[id]?.value || ""}
                                onChange={
                                    (e) => dispatchAppData(setAnswer(id, e.target.value, questionType))
                                }
                            />
                        )

                    default:
                        return <div>Not Found</div>
                }
            })()}
        </Card>
    )
}

export default QuestionCard