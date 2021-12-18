import DetailPost from "components/ForumPage/DetailPost";
import {
  GetPostBySlugDocument,
  GetPostBySlugQueryResult,
} from "generated/graphql";
import { client } from 'lib/initApollo';
import { useIsAuth } from 'lib/isAuth';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React from "react";

const PostDetails = (props: any) => {
  const postData = props.data;
  // console.log(postData);

  useIsAuth();
  return (
    <>
          <DetailPost
          props={postData}
          /> 
    </>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    const { slug } = ctx.query;
    const data = await client.query<GetPostBySlugQueryResult>({
      query: GetPostBySlugDocument,
      variables: {
        slug: slug,
      },
    });
    return {
      props: {data},
    };
  }
);

export default PostDetails;
