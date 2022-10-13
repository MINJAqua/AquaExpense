import "../css/Login.css";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Link,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const SIGNIN_URL = "http://localhost:8000/api/users/login";

const Login = () => {
  const buttonTheme = {
    fontWeight: "bold",
    textTransform: "none",
    height: "40px",
  };
  const navigate = useNavigate();

  const [loginFail, setLoginFail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(SIGNIN_URL, JSON.stringify(values), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        //The token stored in localStorage is a jwt token,
        //NOT the public token from plaid
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        navigate("/dashboard");
      } catch (error) {
        setLoginFail(true);
      }
    },
  });

  const loginCheck = () => {
    if (loginFail) {
      return (
        <Typography sx={{ paddingTop: "15px" }} className="login-fail">
          Incorrect Username or Password
        </Typography>
      );
    }
  };

  return (
    <>
      <Grid>
        <Paper
          elevation={0}
          sx={{
            padding: "100px 300px 10px 300px",
            height: "70vh",
            margin: "20px auto",
          }}
        >
          <Grid align="center"></Grid>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Sign in with your email address
          </Typography>

          <br />
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            id="username"
            fullWidth
            name="email"
            label="Email Address"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ margin: "20px 0px" }}
            id="password"
            name="password"
            type="password"
            fullWidth
            label="Password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {/* <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember Me"
            /> */}
          <Box sx={{ py: 2, paddingBottom: "20px" }}>
            <Button
              type="submit"
              variant="contained"
              component="label"
              size="large"
              fullWidth
              onClick={formik.handleSubmit}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                height: "50px",
                backgroundColor: "#31C7F8",
                "&:hover": { backgroundColor: "#23AFDC" },
              }}
            >
              Sign In Now
            </Button>
            {loginCheck()}
          </Box>

          <Typography>
            {/* Link to reset password
              <Link href="#">Forgot password?</Link> */}
          </Typography>

          <Typography color="textSecondary">
            Don't have an account?{" "}
            <Link
              className="signup-link"
              href="/signup"
              underline="hover"
              sx={{
                cursor: "pointer",
                color: "#31C7F0",
              }}
            >
              Sign Up
            </Link>
          </Typography>
          <Divider fullWidth sx={{ padding: "30px 0 30px 0" }}>
            <Typography color="textSecondary"> or </Typography>
          </Divider>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                onClick={() => formik.handleSubmit()}
                size="large"
                variant="contained"
                sx={buttonTheme}
                startIcon={<FaFacebookF />}
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                color="error"
                fullWidth
                onSubmit={formik.handleSubmit}
                size="large"
                variant="contained"
                startIcon={<FaGoogle />}
                sx={buttonTheme}
              >
                Login with Google
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
export default Login;
