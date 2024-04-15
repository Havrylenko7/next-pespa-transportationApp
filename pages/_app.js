import '../styles/globals.scss';

import { Provider } from 'react-redux';
import store from '../store';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AuthGuard from '@/components/Guard';
import Header from '@/components/Header';


export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthGuard>
          <Header>
            <Component {...pageProps} />
          </Header>
        </AuthGuard>
      </LocalizationProvider>
    </Provider>
  )
}
