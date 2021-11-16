import React from "react";

// import ImagePostCard from "../components/Dashboard/Forum/ImagePostCard";
// import TextPostCard from "../components/Dashboard/Forum/TextPostCard";
// import VideoPostCard from "../components/Dashboard/Forum/VideoPostCard";
import { GetLatestPostsDocument, GetLatestPostsQueryResult } from "generated/graphql";

import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { client } from "../lib/initApollo";
import ForumPage from "components/ForumPage";
import { useIsAuth } from "../lib/isAuth";
// import {
//   ForumWrapper,
//   ForumContainer,
//   // DropAndCenterWrap,
// } from "../components/Dashboard/Forum/forum.styles";
// import { Comment } from "../components/Comments";
// import { withApollo } from "utils/withApollo";




function Forum(props: any) {
  useIsAuth();
  // const dispatch = useAppDispatch();
  // const [showComments, setShowComments] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  const postData = props.data.getLatestPosts.posts
  // console.log(postData)

  return (
    <>
      <ForumPage props={postData}></ForumPage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    
    const { data } = await client.query<GetLatestPostsQueryResult>({
      query: GetLatestPostsDocument,
      // variables: {
      //   token: token,
      // },
    });
    // console.log(data)
    return {
      props: {data},
    };
  }
);

export default Forum;
// export default useApollo(Forum);
