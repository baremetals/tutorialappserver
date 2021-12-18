import { Post } from "../entities/Post";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Comment } from '../entities/Comment';
import { isPostBodyValid, isPostTitleValid } from "../utils/validators/PostValidators";
import { QueryArrayResult, QueryOneResult } from "./QuerryArrayResult";
import { getConnection, getRepository } from "typeorm";
import { v4 } from 'uuid';
import slugify from "slugify";

export const createPost = async (
  userId: string | undefined | null,
  categoryName: string,
  title: string,
  body: string,
  mediaUrl: string
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
      messages: ['User not logged in.'],
    };
  }

  const creator = await userRepository.findOne({
    id: userId,
  });

  const category = await Category.findOne({
    name: categoryName,
  });

  if (!category) {
    return {
      messages: ['category not found.'],
    };
  }

  const generatedToken = v4();
  const newTitle = slugify(title)
  const slug = generatedToken + "-" + newTitle;
  console.log(slug)

  const post = await Post.create({
    slug,
    title,
    body,
    mediaUrl,
    creator,
    category,
    createdBy: creator?.username,
    lastModifiedBy: creator?.username,
  }).save();

  if (!post) {
    return {
      messages: ['Failed to create post.'],
    };
  }

  return {
    messages: [`${post.slug}`],
  };
};

export const editPost = async (
  id: string,
  body: string,
  title: string,
  categoryId: string
): Promise<QueryArrayResult<Post>> => {
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

  const category = await Category.findOne({
    id: categoryId,
  });

  const post = await Post.findOne({
    where: { id },
  });

  if (!post) {
    return {
      messages: ['Post not found.'],
    };
  }

  await getConnection()
    .createQueryBuilder()
    .update(Post)
    .set({
      slug: post.slug,
      title,
      body,
      mediaUrl: post.mediaUrl,
      category,
      lastModifiedBy: post.createdBy,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return {
    messages: ['Post edited successfully.'],
  };
};

export const deletePost = async (id: string): Promise<string> => {
  const post = await Post.findOne({
    where: { id },
  });

  if (!post) {
    return 'Post not found.';
  }


  const comments = await Comment.find({
    where: { id },
  });

  if (!comments) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id', { id: id })
      .execute();
    return 'Your post has been deleted.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Comment)
    .where('postId = :postId', { postId: id })
    .execute();

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Post)
    .where('id = :id', { id: id })
    .execute();
  return 'Your post has been deleted.';
};

// Queries
export const getPostBySlug = async (slug: string): Promise<QueryOneResult<Post>> => {
  const post = await Post.findOne({
    where: {
      slug,
    },
    relations: [
      'creator',
      'comments',
      // 'comments.user',
      // 'comments.post',
      'postPoints',
      'postPoints.user',
      'category',
    ],
  });

  // console.log(post);
  if (!post) {
    return {
      messages: ['Post not found.'],
    };
  }

  // extra sort
  if (post.comments) {
    post.comments.sort((a: Comment, b: Comment) => {
      if (a.createdOn > b.createdOn) return -1;
      if (a.createdOn < b.createdOn) return 1;
      return 0;
    });
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
  const posts = await Post.createQueryBuilder('post')
    .leftJoinAndSelect('post.category', 'category')
    .leftJoinAndSelect('post.creator', 'creator')
    .leftJoinAndSelect('post.comments', 'comments')
    .leftJoinAndSelect('post.postPoints', 'postPoints')
    // .leftJoinAndSelect('post.postPoints.user', 'postPoints')
    .orderBy('post.createdOn', 'DESC')
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
