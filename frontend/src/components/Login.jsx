import '../css/Login.css'
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
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

import { useRef, useEffect, useState } from 'react'

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 300,
    margin: '20px auto',
  }

  const avatarStyle = {
    backgroundColor: 'green',
  }
  const userRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user, pwd)
    setSuccess(true)
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <Link href='#'> Homepage</Link>
          </p>
        </section>
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
              <h2>Log In</h2>
            </Grid>

            <TextField
              id='username'
              ref={userRef}
              fullWidth
              label='Username'
              placeholder='Enter username'
              htmlFor='username'
              required
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              style={{ margin: '20px 0px' }}
              id='password'
              type='password'
              fullWidth
              label='Password'
              placeholder='Enter password'
              required
              htmlFor='password'
              onChange={(e) => setPwd(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name='checkedB' color='primary' />}
              label='Remember Me'
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              component='label'
              fullWidth
              onClick={handleSubmit}
              style={{ margin: '8px 0' }}
            >
              Sign In
            </Button>

            <Typography>
              {/* Link to reset password */}
              <Link href='#'>Forgot password?</Link>
            </Typography>

            <Typography>
              Do you have an account
              {/* link to signup page */}
              <Link href='#'> Sign-Up</Link>
            </Typography>
          </Paper>
        </Grid>
      )}
    </>
  )
}
export default Login
