import React from "react";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Profile from "components/Profile";
import { useIsAuth } from "../../lib/isAuth";



const UserProfile = () => {
  useIsAuth();
  
  return (
    <>
      <Profile />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default UserProfile;

