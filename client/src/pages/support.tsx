import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import SupportPage from '../components/SuppportPage'

function Support() {
    return (
        <>
          <SupportPage />  
        </>
    )
}
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default Support
