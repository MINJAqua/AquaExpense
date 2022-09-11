import '../css/Signup.css'
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
import { useRef, useState, useEffect } from 'react'
import axios from '../axios'

const USER_REGEX = /^[A-z][A-z]$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const SIGNUP_URL = '/api/users'

const SignUp = () => {
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
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [validName, setValidName] = useState(false)

  const [password, setPassword] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(password)
    console.log(result)
    console.log(password)
    setValidPwd(result)
    const match = password === matchPwd
    setValidMatch(match)
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, email, password, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if button enabled with JS hack
    // const v1 = USER_REGEX.test(user);
    // const v2 = PWD_REGEX.test(password);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ name: user, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log('hello')
      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true)
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('')
      setPassword('')
      setEmail('')
      setMatchPwd('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            {/* React router link */}
            <Link href='#'> HomePage</Link>
          </p>
        </section>
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
              <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                {errMsg}
              </p>
              <h2>Sign UP</h2>
            </Grid>

            <TextField
              id='name'
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              fullWidth
              label='Name'
              htmlFor='name'
              placeholder='Enter Name'
              required
              autoComplete='off'
            />
            <TextField
              style={{ margin: '20px 0px 0px' }}
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label='Email'
              htmlFor='email'
              placeholder='Enter email'
              required
              autoComplete='off'
            />

            <TextField
              style={{ margin: '20px 0px' }}
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label='Password'
              htmlFor='password'
              placeholder='Enter password'
              required
            />
            {/* <p
              id='pwdnote'
              className={!validPwd ? 'instructions' : 'offscreen'}
            >
              <InfoIcon fontSize='small' />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label='exclamation mark'>!</span>{' '}
              <span aria-label='at symbol'>@</span>{' '}
              <span aria-label='hashtag'>#</span>{' '}
              <span aria-label='dollar sign'>$</span>{' '}
              <span aria-label='percent'>%</span>
            </p> */}
            <TextField
              type='password'
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              fullWidth
              label='Confirm Password'
              htmlFor='confirm_pwd'
              placeholder='Confirm Password'
              required
            />
            {/* <p
              id='confirmnote'
              className={!validMatch ? 'instructions' : 'offscreen'}
            >
              <InfoIcon fontSize='small' />
              Must match the first password input field.
            </p> */}
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
              style={{ margin: '8px 0' }}
              //disabled={!validName || !validPwd || !validMatch ? true : false}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Typography>
              Do you have already have an account
              <Link href='#'> Sign-In</Link>
              {/* React router link */}
            </Typography>
          </Paper>
        </Grid>
      )}
    </>
  )
}
export default SignUp
