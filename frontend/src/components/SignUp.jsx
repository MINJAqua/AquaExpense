import "../css/Signup.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Checkbox,
  FormHelperText,
} from "@mui/material";

//const USER_REGEX = /^[A-z][A-z]$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "http://localhost:8000/api/users";

const SignUp = () => {
  const navigate = useNavigate();

  const [registerFail, setRegisterFail] = useState(false);

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      check: false,
    },
    validationSchema: Yup.object({
      user: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .max(255)
        .min(8, "Password must be at least 8 characters or more")
        .required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), "hello"],
        "Passwords must match"
      ),
      check: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(SIGNUP_URL, JSON.stringify(values), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        // setSuccess(true);
        navigate("/");
      } catch (error) {
        //i think we write the logic for giving a user already exists error in here
        setRegisterFail(true);
      }
    },
  });

  const registerCheck = () => {
    if (registerFail) {
      return (
        <Typography sx={{ paddingTop: "15px" }} className="register-fail">
          Email already exists
        </Typography>
      );
    }
  };

  return (
    <>
      <form>
        <Grid>
          <Paper
            elevation={0}
            style={{
              padding: "50px 300px 10px 300px",
              height: "70vh",
              margin: "20px auto",
            }}
          >
            <Grid align="center"></Grid>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Create a new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Create a new account with your email address
            </Typography>
            <br />

            <TextField
              error={Boolean(formik.touched.user && formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
              id="name"
              fullWidth
              name="user"
              label="Name"
              required
              autoComplete="off"
              onChange={formik.handleChange}
            />

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style={{ margin: "20px 0px 0px" }}
              id="email"
              fullWidth
              name="email"
              label="Email"
              required
              autoComplete="off"
              onChange={formik.handleChange}
            />

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ margin: "20px 0px" }}
              type="password"
              id="password"
              fullWidth
              label="Password"
              name="password"
              placeholder="Enter password"
              onChange={formik.handleChange}
              required
            />

            <TextField
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              id="confirm_pwd"
              type="password"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              required
              onChange={formik.handleChange}
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
                padding: "5px",
              }}
            >
              <Checkbox
                checked={formik.values.check}
                name="check"
                onChange={formik.handleChange}
              />

              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <Link
                  color="primary"
                  underline="always"
                  variant="subtitle2"
                  sx={{
                    cursor: "pointer",
                    color: "#31C7F0",
                  }}
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
            {Boolean(formik.touched.check && formik.errors.check) && (
              <FormHelperText error>{formik.errors.check}</FormHelperText>
            )}

            <Box sx={{ py: 2, paddingBottom: "20px" }}>
              <Button
                onClick={formik.handleSubmit}
                variant="contained"
                component="label"
                size="large"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  height: "50px",
                  backgroundColor: "#31C7F8",
                  "&:hover": { backgroundColor: "#23AFDC" },
                }}
              >
                Register Account
              </Button>
              {registerCheck()}
            </Box>

            <Typography>
              Already have an account?{" "}
              <Link
                href="/"
                underline="hover"
                sx={{
                  cursor: "pointer",
                  color: "#31C7F0",
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </>
  );
};
export default SignUp;
