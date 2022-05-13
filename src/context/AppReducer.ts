import { Action, State } from "../types";

export default function AppReducer(state: State, action: Action) {

    switch (action.type) {
        case "SET_ANSWER":
            return {
                answers: {
                    ...state.answers,
                    [action.payload.id]: action.payload.data
                }
            }
        default:
            throw new Error()
    }
}
