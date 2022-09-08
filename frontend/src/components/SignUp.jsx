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
import InfoIcon from '@mui/icons-material/Info'
import { useRef, useState, useEffect } from 'react'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const SIGNUP_URL = '/signup'

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
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    console.log(user, pwd)
    setSuccess(true)
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
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>
              <h2>Sign UP</h2>
            </Grid>

            <TextField
              id='username'
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              fullWidth
              label='Username'
              htmlFor='username'
              placeholder='Enter username'
              required
              autoComplete='off'
            />
            <p
              id='uidnote'
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <InfoIcon sx={{ fontSize: 8 }} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <TextField
              style={{ margin: '20px 0px' }}
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              fullWidth
              label='Password'
              htmlFor='password'
              placeholder='Enter password'
              required
            />
            <p
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
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
            </p>
            <TextField
              type='password'
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              fullWidth
              label='Confirm Password'
              htmlFor='confirm_pwd'
              placeholder='Confirm Password'
              required
            />
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <InfoIcon fontSize='small' />
              Must match the first password input field.
            </p>
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
              disabled={!validName || !validPwd || !validMatch ? true : false}
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
