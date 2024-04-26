import { useState } from 'react';
import styles from '../styles/Auth.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '@/store/reducers/authSlice';

import { TextField, Button, Snackbar, Alert } from "@mui/material";

export default function Auth({}) {
  const [isSignIn, setSignIn] = useState(true)
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);

  const submit = () => {
    const userData = { email, password, userName };

    if (isSignIn) {
      const user = users.find(user => user.email === userData.email);

      if (user?.password === userData.password) {
        dispatch(signIn(user))
      } else {
        setError(true)
      }
    } else {
      if (
        userData.email.includes('@') &&
        userData.password.length >= 6 &&
        userData.userName.length >= 2
      ) {
        dispatch(signUp(userData))
      } else {
        setError(true)
      }
    }
  }
  
  return (
    <div className={styles.authWrapper}>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={e => setEmail(e.target.value)}
        helperText="Should be email type"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
        helperText="Should contain at least 6 characters"
      />
      {!isSignIn &&
        <TextField
          id="outlined-basic"
          label="Your name"
          variant="outlined"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
      }
      <Button onClick={() => submit()} variant="contained">
        Sign {isSignIn ? 'In' : 'Up'}
      </Button>
      <Button onClick={() => isSignIn ? setSignIn(false) : setSignIn(true)}>
        {isSignIn ? 'Sign Up' : 'Back'}
      </Button>
      <Snackbar
        open={error}
        className={styles.snackbar}
        autoHideDuration={5000}
        onClose={() => setError(!error)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Incorrect credentials
        </Alert>
      </Snackbar>
    </div>
  )
}
