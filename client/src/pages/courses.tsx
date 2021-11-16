import { GetLatestCoursesDocument, GetLatestCoursesQueryResult } from 'generated/graphql';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React from 'react'
import CoursesPage from '../components/Courses'

import { useAppDispatch } from "app/hooks";
import { setCourse} from "features/courses/reducers";
import { client } from "../lib/initApollo";;
import { useIsAuth } from "../lib/isAuth";

function courses(props: any) {
  useIsAuth();
  const dispatch = useAppDispatch();
  const courseData = props.data?.getLatestCourses?.courses;
  dispatch(setCourse(courseData));
  // console.log(courseData);

  return (
    <>
      <CoursesPage
        // title={"testing"}
        // duration={"bla"}
        // description={"bigd"}
        // image={"jxgvx"}
        // startDate={"gdgjdvdj"}
      />
    </>
  );
}


export const getServerSideProps: GetServerSideProps = requireAuthentication(
    async  (_ctx) => {
      const { data } = await client.query<GetLatestCoursesQueryResult>({
        query: GetLatestCoursesDocument,
        // variables: {
        //   token: token,
        // },
      });
    //   console.log(data);
      return {
        props: {data},
      };
    }
)


export default courses;