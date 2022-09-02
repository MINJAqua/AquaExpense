import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { InputAdornment, IconButton } from '@mui/material';
import { MailOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

function LoginAlt() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = (e) => {
    e.preventDefault();
    // Login Logic
  };
  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          maxWidth: 400,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <h1>AQUAEXPENSE</h1>
        <div className="oauthProviders">
          <Button
            variant="outlined"
            // onClick={}
            fullWidth
          >
            <div className="oauthproviderLogo">
              {/* <img src={} alt="Google Logo" /> */}
            </div>
            {'Log in with Google'}
          </Button>
        </div>
        <div>
          <Typography level="h4" component="h1"></Typography>
          <Typography level="body2">Sign in to continue</Typography>
        </div>
        <TextField
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          // pass down to FormLabel as children
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          endAdornment={
            <InputAdornment position="end">
              <MailOutline />
            </InputAdornment>
          }
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          sx={{
            mt: 1, // margin top
          }}
          onClick={login}
          type="submit"
          className="login__button"
        >
          Log In
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
export default LoginAlt;
