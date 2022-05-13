import AppReducer from "../context/AppReducer";
import { actions } from "../actions";
import { AppContext, AuthContext, UserContext } from "../App";
import QuestionCard from "../components/QuestionCard";
import { fireEvent, render, screen } from "@testing-library/react";
import Questions from "../pages/Questions";
import { BrowserRouter } from "react-router-dom";
import InputDetailsForm from "../pages/InputDetailsForm";
import { createTheme, ThemeProvider } from "@mui/material/styles"

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

const answersData = { answers: {} };
const tempId = 7;
const tempType = "radio";
const tempValue = "Batman";
const expectedAnswersData = {
    answers: {
        [tempId]: {
            type: tempType,
            value: tempValue,
        },
    },
};

describe("Testing Reducer Function", () => {
    test("AppReducer...", () => {
        const tempAction = {
            type: "SET_ANSWER",
            payload: {
                id: tempId,
                data: { type: tempType, value: tempValue },
            },
        };
        const newAnswersData = AppReducer(answersData, tempAction);
        expect(newAnswersData).toStrictEqual(expectedAnswersData);
        expect(AppReducer(answersData, { type: "RANDOM", payload: { id: 5, data: { type: "random", value: "nothing" } } })).toThrowError()
    });
});

const { setAnswer } = actions;
const expectedSetAnswer = {
    type: "SET_ANSWER",
    payload: {
        id: tempId,
        data: {
            type: tempType,
            value: tempValue,
        },
    },
};

describe("Testing SETANSWER helper function", () => {
    test("SetAnswer...", () => {
        const newSetAnswer = setAnswer(tempId, tempValue, tempType);
        expect(newSetAnswer).toStrictEqual(expectedSetAnswer);
    });
});

describe("Checking ONCHANGE", () => {

    test("RADIO OPTIONS", () => {

        const dispatchAppData = jest.fn();
        const wrapper = ({ children }) => (
            <AppContext.Provider
                value={
                    [appData, dispatchAppData]} >
                {children}
            </AppContext.Provider>
        );
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"radio"}
                answers={[
                    { option: "SuperMan", isCorrect: false },
                    { option: "BatMan", isCorrect: true },
                    { option: "SpiderMan", isCorrect: false },
                    { option: "GreenLantern", isCorrect: false },
                ]}
            />,
            { wrapper }
        );
        const radioBox = screen.getByDisplayValue("SuperMan,false");
        fireEvent.click(radioBox, { target: { value: "Batman,true" } });
        fireEvent.click(radioBox, { target: { value: "SpiderMan,false" } });
        expect(dispatchAppData).toHaveBeenCalledTimes(2);
    });

    test('TEXTINPUT FIELD IN ANSWERS', () => {

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
        const inputBox = screen.getByDisplayValue("");
        fireEvent.change(inputBox, { target: { value: "DEF" } });
        fireEvent.change(inputBox, { target: { value: "GHI" } });
        expect(dispatchAppData).toHaveBeenCalledTimes(2);
    })

    test("CHECKBOX OPTIONS", () => {

        const dispatchAppData = jest.fn();
        const wrapper = ({ children }) => (
            <AppContext.Provider
                value={
                    [appData, dispatchAppData]} >
                {children}
            </AppContext.Provider>
        );
        render(
            <QuestionCard
                id={5}
                question={"dummy"}
                questionType={"checkbox"}
                answers={[
                    { option: "SuperMan", isCorrect: true },
                    { option: "BatMan", isCorrect: true },
                    { option: "SpiderMan", isCorrect: false },
                    { option: "GreenLantern", isCorrect: true },
                ]}
            />,
            { wrapper }
        );
        const checkBox = screen.getByLabelText("SuperMan");
        fireEvent.click(checkBox, { target: { name: "BatMan" } });
        fireEvent.click(checkBox, { target: { name: "SpiderMan" } });
        expect(dispatchAppData).toHaveBeenCalledTimes(2);
    });

    test("INPUT FIELD OF NAME", () => {
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
        const inputBox = screen.getByLabelText("Name *");
        fireEvent.change(inputBox, { target: { value: "HERO" } });
        expect(setUserDetails).toHaveBeenCalledTimes(1);
    })

    test("INPUT FIELD OF AGE", () => {
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
        const inputBox = screen.getByLabelText("Age *");
        fireEvent.change(inputBox, { target: { value: 69 } });
        expect(setUserDetails).toHaveBeenCalledTimes(1);
    })

});

describe("Checking Authentication Buttons", () => {

    test("Checking Submit Button", () => {

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
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton)
        expect(setAuthValues).toHaveBeenCalledTimes(1);
    })

    test("Checking Register Button", () => {

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

        const registerButton = screen.getByRole("button");
        fireEvent.click(registerButton)
        expect(setAuthValues).toHaveBeenCalledTimes(1);

    })
})
