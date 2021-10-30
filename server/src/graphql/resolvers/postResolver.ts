import { updatePostPoint } from "../../controllers/PostPointController";
import { getTopCategoryPost } from './../../controllers/CategoryPostController';
import { Post } from "../../entities/Post";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { GqlContext, pubsub } from "../GqlContext";
import { withFilter } from "graphql-subscriptions";
import { createPost, getLatestPosts, getPostById, getPostsByCategoryId } from "../../controllers/PostController";
import { STANDARD_ERROR, EntityResult } from "../resolvers"
import { Category } from "../../entities/Category";
import { getAllCategories } from "../../controllers/CategoryController";
import { PostCategory } from "../../entities/EntityCategory";
import { Message } from "../../entities/Message";
import { LIKED_POST } from "../../lib/constants";

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

  MsgResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Message";
    },
  },

  Subscription: {
    newLike: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LIKED_POST),(payload, args) => payload.postId ===args.postId,
      )
    }
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
      _ctx: GqlContext,
      _info: any
    ): Promise<Message | EntityResult> => {
      try {
        // if (!ctx.req.session || !ctx.req.session?.userId) {
        //   return {
        //     messages: ["You must be logged in to like this post."],
        //   };
        // }
        const userId = "51";
        const msg = await updatePostPoint(userId, args.postId, args.increment);
        if (msg && msg.msg) {
          // console.log(msg.msg);
          return msg.msg;
        }
        pubsub.publish(LIKED_POST, { postId: args.postId, msg });
        return {
          messages: msg.messages ? msg.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },
};

export default postResolvers;
