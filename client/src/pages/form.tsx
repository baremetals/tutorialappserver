// import Modal from "components/ShareForm/Modal";
import { useQuery } from "@apollo/client";
import {
  GetCommentsByPostIdDocument,
  NewCommentDocument,
} from "generated/graphql";
import { useEffect, useState } from "react";

const form = () => {
  const postId: any = "1";
  // let allComments: [];

  const { data, error, loading, subscribeToMore } = useQuery(
    GetCommentsByPostIdDocument,
    {
      variables: {
        postId,
      },
    }
  );

  const comments = data?.getCommentsByPostId.comments;

  const [comArray, setComArray] = useState([]);

  useEffect(() => {
    subscribeToMore({
      document: NewCommentDocument,
      // variables: { postID: postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCommentItem = subscriptionData.data.newComment;
        console.log(newCommentItem);
        setComArray((prevArray) => [newCommentItem, ...prevArray]);
        
        // const newCommentData = Object.assign({}, prev, {
        //   comments: [newCommentItem, ...prev.getCommentsByPostId.comments],
        // });
        // console.log(newCommentData.comments);
        // allComments = newCommentData.comments.map((u) => (
        //   <li key={u.id}>{u.body}</li>
        // ));

        // return newCommentData;
      },
    });
  }, []);

  // const { ...result } = useSubscription(
  //   GetCommentsByPostIdDocument,
  //   {
  //     variables: {
  //       postId,
  //     },
  //   }
  // );

  //console.log(comments);
  // if (!loading) {
  //   // const allComments = comments.map((u) => <li key={u.id}>{u.body}</li>);
  //   return allComments;
  //   // return comments?.comments.map((u) => <li key={u.id}>{u.body}</li>)
  // }

  return (
    !loading && (
      <div>
        {/* {comArray.map((u) => (
          <li key={u.id}>{u.body}</li>
        ))} */}
        {comArray.concat(comments).map(({id, body}) => (
          <li key={id}>{body}</li>
        ))}
      </div>
    )
  );
  // // return (
  // //   <>
  // //     {/* {!loading && <div>{allComments}</div>} */}
  // //     {/* {!loading && (
  // //       <u>
  // //         <div>
  // //           {comments.map((u) => (
  // //             <li key={u.id}>{u.body}</li>
  // //           ))}
  // //         </div>
  // //       </u>
  // //     )} */}

  //   </>
  // );
};

export default form;
