import "../css/Signup.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../axios";
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
} from "@mui/material";

const USER_REGEX = /^[A-z][A-z]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "http://localhost:8000/api/users";

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      password: "",
      check: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      check: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await axios.post(SIGNUP_URL, JSON.stringify(values), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log(response);
        // setSuccess(true);
        navigate("/");
      } catch (error) {
        //i think we write the logic for giving a user already exists error in here

        console.log(error, "can you see me?");
      }

      console.log("finished running handle submit function");
    },
  });

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
              id="confirm_pwd"
              type="password"
              fullWidth
              label="Confirm Password"
              htmlFor="confirm_pwd"
              placeholder="Confirm Password"
              required
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
                <Link color="primary" underline="always" variant="subtitle2">
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>

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
