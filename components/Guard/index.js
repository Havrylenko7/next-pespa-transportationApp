import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else if (user && router.pathname === '/') {
      router.push('/requests')
    }
  }, [user, router.pathname]);

  return <div>{children}</div>
}
