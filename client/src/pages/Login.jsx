import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, Link, IconButton, Button, Avatar } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../features/userSlice';
import { useNavigate, Link as RouterLink, Navigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.user.isLoggedIn);
  const history = useSelector(state => state.user.userHistory);
  const userType = useSelector(state => state.user.userDetails);

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    mail: "",
    password: ""
  });

  const [error, setError] = useState({
    mailError: false,
    passwordError: false
  });

  const [errorText, setErrorText] = useState({
    mailErrorText: "Please enter your email address",
    passwordErrorText: "Please enter your password"
  });

  let { mail, password } = loginData;
  let { mailError, passwordError } = error;
  let { mailErrorText, passwordErrorText } = errorText;

  // useEffect(() => {
  //   console.log(userType)
  //   // if (loggedIn && userType.type === "admin") {
  //   //   navigate("/admin/dashboard")
  //   // } else if(loggedIn){
  //   //   navigate("/books")
  //   // }
  // }, [loggedIn])

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  const logIn = () => {
    let checkEmail = mail.includes('@' && '.');
    if (mail == "" && password == "") {
      setError({
        mailError: true,
        passwordError: true
      });
    } else if (mail == "") {
      setError({ ...error, mailError: true });
    } else if (!checkEmail) {
      setError({ ...error, mailError: true });
      setErrorText({ ...errorText, mailErrorText: "Please enter valid email address" })
    } else if (password == "") {
      setError({ ...error, passwordError: true });
    } else {
      dispatch(loginUser(loginData))
    }
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Sign in</Typography>

          {/* <Stack direction="column" gap={2}> */}
          <Box>
            <TextField
              margin="normal"
              fullWidth
              type={'email'}
              variant="outlined"
              label="Email Address"
              name="mail"
              value={mail}
              onChange={(e) => handleChange(e)}
              onFocus={() => setError({ ...error, mailError: false })}
              error={mailError}
              helperText={mailError && mailErrorText}
            />

            <TextField
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              label="Enter Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              onFocus={() => setError({ ...error, passwordError: false })}
              error={passwordError}
              helperText={passwordError && passwordErrorText}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => { setShowPassword(showPassword ? false : true) }}>
                    {(showPassword) ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )
              }}
            />

            <Button fullWidth variant="contained" size='large' onClick={logIn} sx={{ mt: 3, mb: 2 }}>Log in</Button>

            <Grid container>
              <Grid item>
                <RouterLink to={"/signUp"}>
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Container>
    </>
  )
}

export default Login