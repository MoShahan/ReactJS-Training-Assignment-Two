import { render } from "@testing-library/react";
import App from "../App";

describe("SNAPSHOT testing", () => {
    test("", () => {
        const { AppComponent } = render(
            <App />
        );
        expect(AppComponent).toMatchSnapshot();
    })
})