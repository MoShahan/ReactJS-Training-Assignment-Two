import { styled } from "@mui/material/styles";
import { Box, Button, Grow, Paper, TextField, Typography } from '@mui/material'
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import RadioButtons from '../components/buttons/RadioButtons'
import { useContext } from "react";
import { AuthContext, UserContext } from "../App";

const StyledTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
        color: "#A9A9A9"
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "inherit"
        }
    }
})

const StyledText = styled(Typography)(({ theme }) => ({
    color: theme.palette.tertiary.main,
    marginTop: "6px",
    fontSize: "0.7rem"
}))

const InputDetailsFormHeading = () => (
    <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Enter Your Details
        </Typography>
        <StyledText variant="body1">
            We take data privacy seriously. Be assured that your data is safe with us{" "}
        </StyledText>
    </Box>
)

const InputDetailsFormBody = () => {

    const [authValues, setAuthValues] = useContext(AuthContext)

    const [userDetails, setUserDetails] = useContext(UserContext)

    const navigate = useNavigate()

    function handleRegister() {
        setAuthValues({ ...authValues, registered: true })
        navigate("/questions")
    }

    return (
        <Box
            component="form"
            sx={{ marginTop: "2rem" }}
            // onSubmit={() => navigate("/questions")}
            onSubmit={handleRegister}
        >
            <Box>
                <StyledTextField
                    fullWidth
                    id="outlined-name"
                    label="Name"
                    variant="outlined"
                    required
                    onChange={(e) => { setUserDetails({ ...userDetails, name: e.target.value }) }}
                />
            </Box>

            <Box sx={{ marginTop: "2rem" }}>
                <StyledTextField
                    fullWidth
                    id="outlined-name"
                    label="Age"
                    variant="outlined"
                    type="number"
                    required
                    onChange={(e) => { setUserDetails({ ...userDetails, age: e.target.value }) }}
                />
            </Box>

            <Box sx={{ marginTop: "2rem" }}>
                <RadioButtons
                    buttons={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" }
                    ]}
                    label=""
                />
            </Box>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ marginTop: "2rem", padding: "1rem" }}
            >
                Submit and Start Test
            </Button>
        </Box>
    )
}

const InputDetailsForm = () => {

    const theme = useTheme()

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Grow appear={true} in={true} timeout={1000}>
                <Paper
                    elevation={3}
                    sx={{ paddingTop: "8px", borderRadius: "2rem", background: theme.palette.tertiary.main }}
                >
                    <Typography variant="h6" sx={{ padding: "0.rem 4rem", color: "#24344d" }}>
                        Quiz Application
                    </Typography>
                    <Paper elevation={3} sx={{ padding: "4rem", borderRadius: "1.5rem" }}>
                        <InputDetailsFormHeading />
                        <InputDetailsFormBody />
                    </Paper>
                </Paper>
            </Grow>
        </Box>
    )
}

export default InputDetailsForm