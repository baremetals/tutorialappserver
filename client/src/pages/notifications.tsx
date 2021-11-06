import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import NotificationsPage from '../components/NotificationsPage'

function Notifications() {
    return (
      <>
        <NotificationsPage
          image={"/prettygirl.jpg"}
          body={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
          createdOn={"10 hours ago"}
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

export default Notifications
