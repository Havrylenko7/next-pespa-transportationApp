import { useState } from 'react';
import styles from '../styles/Auth.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '@/store/reducers/authSlice';

import { TextField, Button } from "@mui/material";

export default function Auth({}) {
  const [isSignIn, setSignIn] = useState(true)
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
      }
    } else {
      email && password && userName && dispatch(signUp(userData))
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
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
    </div>
  );
}
