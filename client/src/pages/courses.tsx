// import { ErrorMsg } from 'components/Input';
// import { useMeQuery } from 'generated/graphql';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React from 'react'
import CoursesPage from '../components/Courses'

// import { useAppDispatch } from "app/hooks";
// import { setUser} from "features/auth/reducers";

function courses() {
    // const dispatch = useAppDispatch()

    // const { data, loading, error } = useMeQuery();
    // if (!data || loading) {
    //   return <div>loading...</div>;
    // }
    // if (error) return <ErrorMsg>{error}</ErrorMsg>;
    // dispatch(setUser(data.me))
    // useEffect(() => {
    //     dispatch()
    // })
    // console.log(data);
    return (
        <>
        <CoursesPage />
        </>
    )
}

export default courses;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
    async  (_ctx) => {
    
        return {
            props: {}
        }
    }
)