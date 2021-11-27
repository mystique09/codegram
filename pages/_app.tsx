import '../styles/globals.css'
import Layout from "@/components/layout";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps}: AppProps) {
  return <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
}

export default MyApp
