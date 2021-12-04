import { useIsAuth } from 'lib/isAuth';
import React from 'react'
import { GetServerSideProps } from "next";
import { requireAuthentication } from 'lib/requireAuthentication';
import EditProfile from 'components/Profile/EditProfile';

const EditProfilePage = () => {
    useIsAuth();
    return (
        <>
            <EditProfile />
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

export default EditProfilePage;