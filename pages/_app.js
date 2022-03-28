import { ToastNotification } from '../components/ToastNotification';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AccountVerificationFormProvider>
        <Component {...pageProps} />
      </AccountVerificationFormProvider>

      <ToastNotification />
    </>
  );
}
