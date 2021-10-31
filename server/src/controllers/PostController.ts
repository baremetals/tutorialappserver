import { Post } from "../entities/Post";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { isPostBodyValid, isPostTitleValid } from "../utils/validators/PostValidators";
import { QueryArrayResult, QueryOneResult } from "./QuerryArrayResult";
import { getRepository } from "typeorm";

export const createPost = async (
  userId: string | undefined | null,
  categoryId: string,
  title: string,
  body: string,
  postType: string
): Promise<QueryArrayResult<Post>> => {
  const userRepository = getRepository(User);
  const titleMsg = isPostTitleValid(title);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  }
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

  const creator = await userRepository.findOne({
    id: userId,
  });

  

  const category = await Category.findOne({
    id: categoryId,
  });

  if (!category) {
    return {
      messages: ["category not found."],
    };
  }

  const post = await Post.create({
    title,
    body,
    creator,
    category,
    postType,
  }).save();

  if (!post) {
    return {
      messages: ["Failed to create post."],
    };
  }

  return {
    messages: ["Post created successfully."],
  };
};

export const getPostById = async (
  id: string
): Promise<QueryOneResult<Post>> => {
  const post = await Post.findOne({ id });
  if (!post) {
    return {
      messages: ["Post not found."],
    };
  }

  return {
    entity: post,
  };
};

export const getPostsByCategoryId = async (
  categoryId: string
): Promise<QueryArrayResult<Post>> => {
  const posts = await Post.createQueryBuilder("post")
    .where(`post."categoryId" = :categoryId`, { categoryId })
    .leftJoinAndSelect("post.category", "category")
    .orderBy("post.createdOn", "DESC")
    .getMany();

  if (!posts || posts.length === 0) {
    return {
      messages: ["Posts of category not found."],
    };
  }
  console.log(posts);
  return {
    entities: posts,
  };
};

export const getLatestPosts = async (): Promise<QueryArrayResult<Post>> => {
  const posts = await Post.createQueryBuilder("post")
    .leftJoinAndSelect("post.category", "category")
    .leftJoinAndSelect("post.creator", "creator")
    .leftJoinAndSelect("post.comments", "comments")
    .orderBy("post.createdOn", "DESC")
    .take(10)
    .getMany();

  if (!posts || posts.length === 0) {
    return {
      messages: ["No posts found."],
    };
  }
  // console.log(posts);
  return {
    entities: posts,
  };
};

// Todo

// export const editPost = async (): Promise{}
// export const deletePost = async (): Promise{}