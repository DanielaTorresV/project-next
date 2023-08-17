import { ProviderAuth } from '@hooks/useAuth';
import '../styles/tailwind.css';
import MainLayout from '@layout/MainLayout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}
