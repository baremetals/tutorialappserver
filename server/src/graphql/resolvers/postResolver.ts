import { updatePostPoint } from "../../controllers/PostPointController";
import { getTopCategoryPost } from './../../controllers/CategoryPostController';
import { Post } from "../../entities/Post";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { GqlContext } from "../GqlContext";
import { createPost, getLatestPosts, getPostById, getPostsByCategoryId } from "../../controllers/PostController";
import { STANDARD_ERROR, EntityResult } from "../resolvers"
import { Category } from "../../entities/Category";
import { getAllCategories } from "../../controllers/CategoryController";
import { PostCategory } from "../../entities/EntityCategory";

const postResolvers = {
  PostResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Post";
    },
  },
  PostArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "PostArray";
    },
  },

  Query: {
    getPostById: async (
      _obj: any,
      args: { id: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<Post | EntityResult> => {
      let post: QueryOneResult<Post>;
      try {
        post = await getPostById(args.id);

        if (post.entity) {
          return post.entity;
        }
        return {
          messages: post.messages ? post.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },

    getPostsByCategoryId: async (
      _obj: any,
      args: { categoryId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ posts: Array<Post> } | EntityResult> => {
      let posts: QueryArrayResult<Post>;
      try {
        posts = await getPostsByCategoryId(args.categoryId);
        if (posts.entities) {
          return {
            posts: posts.entities,
          };
        }
        return {
          messages: posts.messages ? posts.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getLatestPosts: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ posts: Array<Post> } | EntityResult> => {
      let posts: QueryArrayResult<Post>;
      try {
        posts = await getLatestPosts();
        if (posts.entities) {
          return {
            posts: posts.entities,
          };
        }
        return {
          messages: posts.messages ? posts.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
    getAllCategories: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<Array<Category> | EntityResult> => {
      let categories: QueryArrayResult<Category>;
      try {
        categories = await getAllCategories();
        if (categories.entities) {
          return categories.entities;
        }
        return {
          messages: categories.messages
            ? categories.messages
            : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
    getTopCategoryPost: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<Array<PostCategory>> => {
      try {
        return await getTopCategoryPost();
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },
  },
  
  Mutation: {
    createPost: async (
      _obj: any,
      args: {
        userId: string;
        categoryId: string;
        title: string;
        body: string;
        postType: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Post>;
      try {
        result = await createPost(
          args.userId,
          args.categoryId,
          args.title,
          args.body,
          args.postType
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    updatePostPoint: async (
      _obj: any,
      args: { postId: string; increment: boolean },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      let result = "";
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return "You must be logged in to like this post.";
        }
        result = await updatePostPoint(
          ctx.req.session!.userId,
          args.postId,
          args.increment
        );
        return result;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },
};

export default postResolvers;
