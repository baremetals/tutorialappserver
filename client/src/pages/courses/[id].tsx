import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import CourseDetails from '../../components/Courses/CourseDetails'
import { useIsAuth } from 'lib/isAuth';
import { client } from 'lib/initApollo';
import { GetCourseByIdDocument, GetCourseByIdQueryResult, } from 'generated/graphql';

function CourseDetailsPage(props: any) {
  const courseData = props.data
  useIsAuth();
    return (
      <>
        <CourseDetails
          props={courseData}
        />
      </>
    );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    const { id } = ctx.query;

    const data = await client.query<GetCourseByIdQueryResult>({
      query: GetCourseByIdDocument,
      variables: {
        id: id as string,
      },
    });
    return {
      props: {data},
    };
  }
);
export default CourseDetailsPage
