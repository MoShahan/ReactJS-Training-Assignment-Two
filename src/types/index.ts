export type RadioButtonProps = {
    label: string,
    buttons: Array<{
        value: string,
        label: string
    }>
}

export type CheckboxOptionsProps = {
    options: any,
    handleChange: any
}

export type QuestionType = "checkbox" | "radio" | "textInput"

export type QuestionCardProps = {
    id: number,
    question: string,
    questionType: QuestionType,
    answers: Array<any>
}

export type RadioOptionsProps = {
    // options: string[],
    value: string,
    options:any[][],
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type State = {
    answers: any
}

export type Action = {
    type: string,
    payload: {
        id: string,
        data: any
    }
}