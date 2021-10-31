import {
  isPostBodyValid,
} from "../utils/validators/PostValidators";

import { QueryArrayResult } from "./QuerryArrayResult";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

import { getRepository } from "typeorm";
import { Course } from "../entities/Course";
import { Note } from "../entities/Note";

// Post comments

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
  // console.log(user?.username);

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
    createdBy: user?.username
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
    .leftJoinAndSelect("c.user", "comments")
    .orderBy("c.createdOn", "DESC")
    .getMany();

  if (!comments) {
    return {
      messages: ["Comments of post not found."],
    };
  }
  // console.log(comments);
  return {
    entities: comments,
  };
};

// Course comments

export const newCourseComment = async (
  userId: string | undefined | null,
  courseId: string,
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
  // console.log(user?.username);

  const course = await Course.findOne({
    id: courseId,
  });
  if (!course) {
    return {
      messages: ["Course not found."],
    };
  }
  const comment = await Comment.create({
    body,
    user,
    course,
    createdBy: user?.username,
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
export const getCommentsByCourseId = async (
  courseId: string
): Promise<QueryArrayResult<Comment>> => {
  const comments = await Comment.createQueryBuilder("c")
    .where(`c."courseId" = :courseId`, { courseId })
    .leftJoinAndSelect("c.course", "course")
    .leftJoinAndSelect("c.user", "comments")
    .orderBy("c.createdOn", "DESC")
    .getMany();

  if (!comments) {
    return {
      messages: ["Comments of course not found."],
    };
  }
  // console.log(comments);
  return {
    entities: comments,
  };
};

// Note comments

export const newNoteComment = async (
  userId: string | undefined | null,
  noteId: string,
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
  // console.log(user?.username);

  const note = await Note.findOne({
    id: noteId,
  });
  if (!note) {
    return {
      messages: ["Note not found."],
    };
  }
  const comment = await Comment.create({
    body,
    user,
    note,
    createdBy: user?.username,
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
export const getCommentsByNoteId = async (
  noteId: string
): Promise<QueryArrayResult<Comment>> => {
  const comments = await Comment.createQueryBuilder("c")
    .where(`c."noteId" = :noteId`, { noteId })
    .leftJoinAndSelect("c.note", "note")
    .leftJoinAndSelect("c.user", "comments")
    .orderBy("c.createdOn", "DESC")
    .getMany();

  if (!comments) {
    return {
      messages: ["Comments of note not found."],
    };
  }
  // console.log(comments);
  return {
    entities: comments,
  };
};

// Todo

// export const editComment = async (): Promise{}
// export const deleteComment = async (): Promise{}
