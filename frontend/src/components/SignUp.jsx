import '../css/SignIn.css';
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 300,
    margin: '20px auto',
  };

  const avatarStyle = {
    backgroundColor: 'green',
  };
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign UP</h2>
          </Grid>

          <TextField
            id="outlined-basic"
            fullWidth
            label="Username"
            placeholder="Enter username"
            required
          />
          <TextField
            style={{ margin: '20px 0px' }}
            id="outlined-basic"
            fullWidth
            label="Password"
            placeholder="Enter password"
            required
            type="password"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Password"
            placeholder="Confirm password"
            required
            type="password"
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Sign Up"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            component="label"
            fullWidth
            style={{ margin: '8px 0' }}
          >
            Sign In
          </Button>

          <Typography>
            Do you have already have an account
            <Link href="#"> Sign-In</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};
export default SignUp;
