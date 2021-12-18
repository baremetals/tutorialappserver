import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import store from "../app/store";
import Head from "next/head";
import { darkTheme } from "../styles/theme";
import "../styles/globals.css";
import { useApollo } from "../lib/apolloClient";


function MyApp({ Component, pageProps }: AppProps) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Baremetals Tutorial</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={darkTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </>
  );
}
export default MyApp;
