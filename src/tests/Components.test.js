import { createTheme, ThemeProvider } from "@mui/material/styles"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import App, { AppContext, AuthContext, UserContext } from "../App"
import AuthQuestions from "../components/AuthQuestions"
import AuthResults from "../components/AuthResults"
import RadioButtons from "../components/buttons/RadioButtons"
import CheckboxOptions from "../components/CheckboxOptions"
import QuestionCard from "../components/QuestionCard"
import RadioOptions from "../components/RadioOptions"
import InputDetailsForm from "../pages/InputDetailsForm"
import Questions from "../pages/Questions"
import Results from "../pages/Results"

const appData = {
    answers: {
        [2]: {
            type: "checkbox",
            value: ["ScarletWitch false", "DoctorStrange true"]
        },
        [7]: {
            type: "radio",
            value: "Batman,true"
        },
        [10]: {
            type: "textInput",
            value: "DoctorFate"
        },
        [12]: {
            type: "radio",
            value: "Flash,false"
        }
    },
}

describe("Rendering APP Component", () => {
    test("APP Rendering...", () => {
        render(
            <App />
        )
    })
})

describe("Rendering all the Page Components", () => {

    test("Rendering the RESULTS page", () => {
        const dispatchAppData = jest.fn()
        const setUserDetails = jest.fn()
        const userDetails = {
            name: "Doctor Strange",
            gender: "Male",
            age: 27
        }
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                <UserContext.Provider value={[userDetails, setUserDetails]}>
                    {children}
                </UserContext.Provider>
            </AppContext.Provider>
        );
        render(
            <Results />, { wrapper }
        )
    })

    test("Rendering the Questions page", () => {

        const dispatchAppData = jest.fn()
        const setUserDetails = jest.fn()
        const setAuthValues = jest.fn()
        const userDetails = {
            name: "Scarlet Witch",
            gender: "Female",
            age: 27
        }
        const authValues = {
            submitted: true,
            registered: true
        }
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                <UserContext.Provider value={[userDetails, setUserDetails]}>
                    <AuthContext.Provider value={[authValues, setAuthValues]}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </AuthContext.Provider>
                </UserContext.Provider>
            </AppContext.Provider>
        );
        render(
            <Questions />, { wrapper }
        )
    })

    test("Rendering the Home page", () => {

        const theme = createTheme({
            palette: {
                primary: {
                    main: "#A7B4B4"
                },
                secondary: {
                    main: "#DE3C59"
                },
                tertiary: {
                    main: "#39A78E"
                },
                background: {
                    default: "#192231",
                    paper: "#24344d",
                },
                text: {
                    primary: "#fff",
                },
            },
            typography: {
                allVariants: {
                    fontFamily: "Open Sans",
                    fontWeight: "bold",
                },
                body1: {
                    fontWeight: "normal",
                },
                button: {
                    fontWeight: "bold",
                },
            },
        });
        const setAuthValues = jest.fn()
        const authValues = {
            submitted: true,
            registered: true
        }
        const setUserDetails = jest.fn()
        const userDetails = {
            name: "Doctor Strange",
            gender: "Male",
            age: 27
        }
        const wrapper = ({ children }) => (
            <ThemeProvider theme={theme}>
                <AuthContext.Provider value={[authValues, setAuthValues]}>
                    <UserContext.Provider value={[userDetails, setUserDetails]}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </UserContext.Provider>
                </AuthContext.Provider>
            </ThemeProvider>
        );
        render(
            <InputDetailsForm />, { wrapper }
        )
    })
})

describe("Rendering the Button Components", () => {
    test("Rendering the Radio Buttons", () => {

        const setUserDetails = jest.fn()
        const userDetails = {
            name: "Doctor Strange",
            gender: "Male",
            age: 27
        }
        const wrapper = ({ children }) => (
            <UserContext.Provider value={[userDetails, setUserDetails]}>
                {children}
            </UserContext.Provider>
        );
        render(
            <RadioButtons
                buttons={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" }
                ]}
                label=""
            />, { wrapper }
        )
    })
})


describe("Rendering Authentication Components", () => {

    test("Rendering AUTHQUESTIONS component", () => {

        const setAuthValues = jest.fn()
        const authValues = {
            submitted: true,
            registered: true
        }
        const wrapper = ({ children }) => (
            <AuthContext.Provider
                value={[authValues, setAuthValues]}
            >
                {" "} {children} {" "}
            </AuthContext.Provider>
        );
        render(
            <AuthQuestions />, { wrapper }
        );

    })

    test("Rendering AUTHRESULTS component", () => {

        const setAuthValues = jest.fn()
        const authValues = {
            submitted: true,
            registered: true
        }
        const wrapper = ({ children }) => (
            <AuthContext.Provider
                value={[authValues, setAuthValues]}
            >
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </AuthContext.Provider>
        );
        render(
            <AuthResults />, { wrapper }
        )
    })

})


describe('Rendering Question Card Component', () => {

    test('CHECKBOX', () => {

        const dispatchAppData = jest.fn()
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                {children}
            </AppContext.Provider>
        )
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"checkbox"}
                answers={[
                    { "option": "string", "isCorrect": true },
                    { "option": "boolean", "isCorrect": true },
                    { "option": "object", "isCorrect": false },
                    { "option": "array", "isCorrect": false }
                ]}
            />, { wrapper }
        )
    })

    test('RADIO', () => {

        const dispatchAppData = jest.fn()
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                {children}
            </AppContext.Provider>
        )
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"radio"}
                answers={[
                    { "option": "SuperMan", "isCorrect": false },
                    { "option": "BatMan", "isCorrect": true },
                    { "option": "SpiderMan", "isCorrect": false },
                    { "option": "GreenLantern", "isCorrect": false }
                ]}
            />, { wrapper }
        )
    })

    test('TEXTINPUT', () => {

        const dispatchAppData = jest.fn()
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                {children}
            </AppContext.Provider>
        )
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"textInput"}
                answers={[{ "option": "YO YO HONEY SINGH", "isCorrect": true }]}
            />, { wrapper }
        )
    })

    test('DEFAULT', () => {

        const dispatchAppData = jest.fn()
        const wrapper = ({ children }) => (
            <AppContext.Provider value={[appData, dispatchAppData]}>
                {children}
            </AppContext.Provider>
        )
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"others"}
                answers={[{ "option": "YO YO HONEY SINGH", "isCorrect": true }]}
            />, { wrapper }
        )
    })

})

describe('Rendering Options Components', () => {

    test('Rendering Radio Options', () => {

        const mockHandleChange = jest.fn()
        render(
            <RadioOptions
                options={[
                    ["YO YO", true],
                    ["HONEY SINGH", true]
                ]}
                value={"whatever"}
                handleChange={mockHandleChange}
            />
        )
    })

    test('Rendering Checkbox Options', () => {

        const mockHandleChange = jest.fn()
        render(
            <CheckboxOptions
                handleChange={mockHandleChange}
                options={[
                    { isCorrect: true, option: "string", value: false },
                    { isCorrect: false, option: "object", value: true }
                ]}
            />
        )
    })
})