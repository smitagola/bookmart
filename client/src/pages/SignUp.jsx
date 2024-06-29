import { useState, useEffect } from 'react';
import { registerUser } from '../features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, TextField, Grid, Link, IconButton, Button, Avatar } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from "react-router-dom";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.user.response);

  const [resMessage, setResMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: "",
    mail: "",
    password: "",
    conPassword: "",
    type: "user"
  });
  const [error, setError] = useState({
    nameError: false,
    mailError: false,
    passwordError: false,
    conPasswordError: false
  });
  const [errorText, setErrorText] = useState({
    nameErrorText: "Please enter your name",
    mailErrorText: "Please enter your email address",
    passwordErrorText: "Please enter your password",
    conPasswordErrorText: "Please re-enter your password"
  });

  useEffect(() => {
    if (message == "User Exist") {
      setResMessage("This email is already has been register please try to login or another email")
    } else if (message == "User Register successfully") {
      navigate("/login");
    } else if (message == "") {
      setResMessage("");
    }
  }, [message])

  let { mail, password, conPassword, name, type } = signUpData;
  let { mailError, passwordError, conPasswordError, nameError } = error;
  let { mailErrorText, passwordErrorText, conPasswordErrorText, nameErrorText } = errorText;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    (resMessage !== "" && setResMessage(""));
  }

  const signUp = () => {
    let checkEmail = mail.includes('@' && '.');
    let lengthOfPass = password.length;

    if (mail == "" && password == "" && conPassword == "" && name == "") {
      setError({
        nameError: true,
        mailError: true,
        passwordError: true,
        conPasswordError: true
      });
    } else if (name == "") {
      setError({ ...error, nameError: true })
    } else if (mail == "") {
      setError({ ...error, mailError: true })
    } else if (!checkEmail) {
      setError({ ...error, mailError: true });
      setErrorText({ ...errorText, mailErrorText: "Please enter valid email address" });
    } else if (password == "") {
      setError({ ...error, passwordError: true })
    } else if (conPassword == "") {
      setError({ ...error, conPasswordError: true })
    } else if (lengthOfPass < 4) {
      setError({ ...error, passwordError: true });
      setErrorText({ ...errorText, passwordErrorText: "Password length should not be less than 4 character" });
    } else if (conPassword !== password) {
      setError({ ...error, conPasswordError: true });
      setErrorText({ ...errorText, conPasswordErrorText: "Password doen't match" });
    } else {
      dispatch(registerUser({ name, mail, password, type }));
      setSignUpData({ mail: "", password: "", conPassword: "", name: "", type: "" });
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ textAlign: "center" }}>Sign Up</Typography>

          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              type="text"
              variant='outlined'
              label="Name"
              name="name"
              value={name}
              error={nameError}
              helperText={nameError && nameErrorText}
              onFocus={() => setError({ ...error, nameError: false })}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              type={'email'}
              variant="outlined"
              label="Email Address"
              name={"mail"}
              value={mail}
              error={mailError}
              helperText={mailError && mailErrorText}
              onFocus={() => setError({ ...error, mailError: false })}
              onChange={(e) => handleChange(e)}
            />

            <TextField
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              label="Enter Password"
              name="password"
              value={password}
              error={passwordError}
              helperText={passwordError && passwordErrorText}
              onFocus={() => setError({ ...error, passwordError: false })}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => { setShowPassword(showPassword ? false : true) }}>
                    {(showPassword) ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              type={showConPass ? 'text' : 'password'}
              variant="outlined"
              label="Confirm Password"
              name="conPassword"
              value={conPassword}
              error={conPasswordError}
              helperText={conPasswordError && conPasswordErrorText}
              onFocus={() => setError({ ...error, conPasswordError: false })}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => { setShowConPass(showConPass ? false : true) }}>
                    {(showConPass) ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )
              }}
            />

            <Button fullwidth variant="contained" size='large' onClick={signUp} sx={{ width: "100%" }}>SIGN UP</Button>
            <Grid container>
              <Grid item>
                <RouterLink to="/login">
                  {"Already have an account? Log in"}
                </RouterLink>
              </Grid>
            </Grid>
            <Typography sx={{ color: "red" }}>{resMessage}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SignUp