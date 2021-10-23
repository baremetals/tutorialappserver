import {
  isPostBodyValid,
} from "../utils/validators/PostValidators";

import { QueryArrayResult } from "./QuerryArrayResult";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

import { getRepository } from "typeorm";



export const createComment = async (
  userId: string | undefined | null,
  postId: string,
  body: string
): Promise<QueryArrayResult<Comment>> => {
  const userRepository = getRepository(User);
  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }
  if (!userId) {
    return {
      messages: ["User not logged in."],
    };
  }
  const user = await userRepository.findOne({
    id: userId,
  });

  const post = await Post.findOne({
    id: postId,
  });
  if (!post) {
    return {
      messages: ["Postnot found."],
    };
  }
  const comment = await Comment.create({
    body,
    user,
    post,
  }).save();
  if (!comment) {
    return {
      messages: ["Failed to create Comment."],
    };
  }

  return {
    messages: ["Comment created successfully."],
  };
};

export const getCommentsByPostId = async (
  postId: string
): Promise<QueryArrayResult<Comment>> => {
  const comments = await Comment.createQueryBuilder("c")
    .where(`c."postId" = :postId`, { postId })
    .leftJoinAndSelect("c.post", "post")
    .orderBy("c.createdOn", "DESC")
    .getMany();

  if (!comments) {
    return {
      messages: ["Comments of post not found."],
    };
  }
  console.log(comments);
  return {
    entities: comments,
  };
};
