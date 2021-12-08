import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "styled-components";
import store from "../app/store";
import Head from "next/head";
import { darkTheme } from "../styles/theme";
// import Footer from "../components/Footer/Footer";
// import NavBar from "../components/NavBar/NavBar";
import NavDropDown from "../components/NavDropDown";
import "../styles/globals.css";
import { useApollo } from "../lib/apolloClient";
import NavBar from 'components/NavBar/NavBar';


function MyApp({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const toggle: any = () => {
    setIsOpen(!isOpen);
  };

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
            <CssBaseline />
            <NavDropDown toggle={toggle} isOpen={isOpen} />
            <NavBar toggle={toggle} />
            <Component {...pageProps} />
            {/* <Footer /> */}
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </>
  );
}
export default MyApp;
