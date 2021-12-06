import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUpdatePostPointMutation, User, PostPoint, Category, useNewCommentSubscription } from "generated/graphql";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

import {
  PostTop,
  PostLeftWrap,
  PostProfileImge,
  UserName,
  PostDate,
  // PostTopRightWrap,
  // ExpandIcon,
  PostCenterWrap,
  PostTitle,
  PostMediaImage,
  PostBottomWrapper,
  BottomLeftWrap,
  FilledLikeIcon,
  UnFilledLikeIcon,
  LikeCounter,
  BottomRightWrap,
  CommentIcon,
  CommentText,
  // PostDropdown,
  LikeGroup,
  // DropAndCenterWrap,
  PostMediaVideoIF,
} from "../Dashboard/Forum/forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Comment  from "../Comments";
import { ErrorMsg } from 'components/Input';
// import Dropdown from "../../Dropdown";

interface ForumPost {
  createdOn: any;
  title: string;
  body?: string;
  category: Category;
  points: number;
  creator: User;
  postPoints: Array<PostPoint>;
  comments: Array<Comment>;
}

type userComment = {
  body: string;
  id: string;
  createdOn: string;
  createdBy: string;
  user: User;
};

// type postPoint = {
//   id: string;
// };


const DetailPost = (props: { props: { data: any; loading: any; }; }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [likePost] = useUpdatePostPointMutation(); // like and unlike post function call

  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [commentsArray, setCommentsArray] = useState([]);
  const [message, setMessage] = useState<string | undefined>("");


  const { user: user } = useAppSelector(isUser);
  const me = user;

  // data fro props
  const { data, loading } = props.props;
  const { title, body, points, createdOn, creator, postPoints } =
    data?.getPostById as ForumPost;

  const [postPointNumber, setPostPointsNumber] = useState(0);
  
  // console.log(body);
  // console.log(postPointNumber);

  // Comments Subscription data
  const newComms = useNewCommentSubscription();
  const newCommsData = newComms?.data?.newComment;
  const comments = data?.getPostById.comments;
  let commentsLength: number = 0;

  // console.log(pointsLenth);

  // This useEffect updates the points count
  useEffect(() => {
    let mounted = true;
    if (!mounted) {
        setPostPointsNumber(points);
      }
    return () => {
      mounted = false;
    };
  }, []);


  useEffect(() => {
    let mounted = true;
    if (body?.includes("www.youtube.com" || ".mp4" || ".mov")) {
      if (mounted) {
        setIsVideo(true);
      }
    }
    return () => {
      mounted = false;
    }; 
  }, [body]);

  // This useEffect is subscribing to new comments to update the comments count
  useEffect(() => {
    // let mounted = true;
    if (newCommsData) {
      const newMessageItem = newCommsData;
      const newArrayItem: any = (prevArray: userComment[]) => {
        return [newMessageItem, ...prevArray];
      };
      setCommentsArray(newArrayItem);
    }
    // if (mounted) {
      
    // }
    // return () => {
    //   mounted = false;
    // };
  }, [newCommsData]);

  // This useEffect checks if the logged in user has liked the post already
  useEffect(() => {
    let mounted = true;
    if (postPoints.length !== 0) {
      postPoints.forEach((point: { user: { id: string | undefined } }) => {
        if (point.user?.id === me?.id) {
          if (mounted) {
            setHasLikedPost(true);
          }          
        }
      });
    }
    
    return () => {
      mounted = false;
    };
  }, [postPoints, me?.id]);

  // This useEffect checks if the logged in user is the creator of the post
  useEffect(() => {
    let mounted = true;
    if (creator.id === me?.id) {
      if (mounted) {
        setIsCreator(true);
      }
    }
    return () => {
      mounted = false;
    };
  }, [me?.id]);

  commentsLength = commentsArray.concat(comments).length;
  // console.log(commentsLength);

  if (!data || loading) {
    return <div>loading...</div>;
  }

  const handleLike = async () => {
    // console.log(isCreator);

    if (!isCreator) {
      const newPoint: number = points + 1
      try {
        const response = await likePost({
          variables: {
            postId: slug as string,
            increment: true,
          },
        });
        console.log(response);
        if (response.data?.updatePostPoint.includes("Successfully incremented total.")) {
          setPostPointsNumber(newPoint);
          setHasLikedPost(true)
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      setMessage("users cannot like their own post");
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 3000);
    }
  };

  const handleUnLike = async () => {
    const newPoint: number = points - 1;
    try {
      const response = await likePost({
        variables: {
          postId: slug as string,
          increment: false,
        },
      });
      console.log(response);
      if (
        response.data?.updatePostPoint.includes(
          "Successfully decremented total."
        )
      ) {
        setPostPointsNumber(newPoint);
        setHasLikedPost(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PostTop>
        <PostLeftWrap>
          <Link href={`user-profile/${creator.username}`}>
            <PostProfileImge
              src={creator.profileImage}
              alt="user profile image"
            />
          </Link>

          <UserName>
            <Link href={`user-profile/${creator.username}`}>
              {creator.username}
            </Link>

            <PostDate>{dayjs(createdOn).fromNow()}</PostDate>
          </UserName>
        </PostLeftWrap>
        {/* <PostTopRightWrap>
          <PostDropdown>
            <ExpandIcon onClick={() => setShowDropdown(!showDropdown)} />
            <Dropdown showDropdown={showDropdown} />
          </PostDropdown>
        </PostTopRightWrap> */}
      </PostTop>
      <PostCenterWrap>
        <PostTitle>{title}</PostTitle>
        {isVideo ? (
          <PostMediaVideoIF
            {...props}
            width="560"
            height="315"
            src={body}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        ) : (
          <PostMediaImage alt="Post image" src={body} />
        )}
      </PostCenterWrap>

      <PostBottomWrapper>
        <BottomLeftWrap>
          <LikeGroup>
            {hasLikedPost ? (
              <FilledLikeIcon onClick={handleUnLike} />
            ) : (
              <UnFilledLikeIcon onClick={handleLike} />
            )}
            <LikeCounter>{postPointNumber}</LikeCounter>
            {errorMsg && <ErrorMsg>{message}</ErrorMsg>}
          </LikeGroup>
        </BottomLeftWrap>
        <BottomRightWrap>
          <CommentIcon />
          <CommentText>{commentsLength}</CommentText>
        </BottomRightWrap>
      </PostBottomWrapper>
      <Comment />
    </>
  );
};

export default DetailPost;
