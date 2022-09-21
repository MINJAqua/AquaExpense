import "../css/Login.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import axios from "../axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SIGNUP_URL = "http://localhost:8000/api/users/login";

const Login = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "20px auto",
  };

  const avatarStyle = {
    backgroundColor: "green",
  };
  const userRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [loginFail, setLoginFail] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //The token stored in localStorage is a jwt token,
      //NOT the public token from plaid
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);

      navigate("/plaid");
    } catch (error) {
      setLoginFail(true);
    }
  };

  const loginCheck = () => {
    if (loginFail) {
      return <div className="login-fail">*Incorrect username or password*</div>;
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <Link href="#"> Homepage</Link>
          </p>
        </section>
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
              <h2>Log In</h2>
            </Grid>

            <TextField
              id="username"
              ref={userRef}
              fullWidth
              label="Username"
              placeholder="Enter username"
              htmlFor="username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ margin: "20px 0px" }}
              id="password"
              type="password"
              fullWidth
              label="Password"
              placeholder="Enter password"
              required
              htmlFor="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember Me"
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              component="label"
              fullWidth
              onClick={handleSubmit}
              style={{ margin: "8px 0" }}
            >
              Sign In
            </Button>
            {loginCheck()}

            <Typography>
              {/* Link to reset password */}
              <Link href="#">Forgot password?</Link>
            </Typography>

            <Typography>
              Don't you have an account?
              {/* link to signup page */}
              <Link href="#"> Sign-Up</Link>
            </Typography>
          </Paper>
        </Grid>
      )}
    </>
  );
};
export default Login;
