import '../css/Login.css';
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

const Login = () => {
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
            <h2>Sign In</h2>
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
            style={{ margin: '8px 0' }}
          >
            Sign In
          </Button>

          <Typography>
            <Link href="#">Forgot password?</Link>
          </Typography>

          <Typography>
            Do you have an account
            <Link href="#"> Sign-Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};
export default Login;
