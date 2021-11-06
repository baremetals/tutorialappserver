import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import BooksPage from '../components/Books'
import { useIsAuth } from "../lib/isAuth";
// import { withApollo } from 'utils/withApollo';


function Books() {
  useIsAuth();
    return (
      <>
        <BooksPage
        />
      </>
    );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default Books

