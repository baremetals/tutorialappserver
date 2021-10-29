import { ErrorMsg } from 'components/Input';
import { MeDocument, MeQueryResult, useMeQuery } from 'generated/graphql';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react'
import CoursesPage from '../components/Courses'

import { useAppDispatch } from "app/hooks";
import { setUser} from "features/auth/reducers";
import { client } from './_app';

function courses() {
    // const dispatch = useAppDispatch()
    
    // const { data, loading, error } = useMeQuery();
    // console.log(data?.me);
    // if (!data || loading) {
    //   return <div>loading...</div>;
    // }
    // if (error) return <ErrorMsg>{error}</ErrorMsg>;
    // dispatch(setUser(data.me))
    // const getMe = async () => {
    //     const { data } = await client.query<MeQueryResult>({
    //       query: MeDocument,
    //     })
    //     console.log(data);
    // }
    // useEffect(() => {
    //     getMe()
    // }, [])
    
    return (
        <>
        <CoursesPage />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = requireAuthentication(
    async  (_ctx) => {
    
        return {
            props: {}
        }
    }
)

export default courses;