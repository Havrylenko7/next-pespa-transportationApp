import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '@/store/reducers/authSlice';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { Button } from '@mui/material';
import findUser from '@/helpers/findUser';
import Loader from '../Loader';

export default function Header({ children }) {
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => ({
    user: state.auth.user,
    users: state.auth.users
  }));

  useEffect(() => {
    router.isFallback
      ? setLoading(true)
      : setLoading(false)
  }, [router.isFallback]);

  return (
    <>
      <Head>
        <title>Transportation</title>
        <meta name="description" content="Transportation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {loading ?
        <Loader />
      : 
        <>
          {user &&
            <div className="header">
              <div>
                {findUser(user, users)?.userName}
              </div>
              <Button
                variant="outlined"
                onClick={() => dispatch(signOut())}
                color="info"
                size="medium"
              >
                Sign Out
              </Button>
            </div>
          }
          <main className="pageWrapper">{children}</main>
        </>
      }
    </>
  )
}
