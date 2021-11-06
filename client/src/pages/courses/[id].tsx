import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import CourseDetails from '../../components/Courses/CourseDetails'

function CourseDetailsPage() {
    return (
        <>
          <CourseDetails />  
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
export default CourseDetailsPage
