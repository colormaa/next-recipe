import '../styles/globals.css';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;