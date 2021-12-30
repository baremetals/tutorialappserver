import React from "react";
import { useIsAuth } from "lib/isAuth";
import SearchResult from "components/SearchResult";
import { GetServerSideProps } from 'next';
import { requireAuthentication } from 'lib/requireAuthentication';

function Result() {
  useIsAuth();
  return (
    <>
      <SearchResult />
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

export default Result;
