import { updatePostPoint } from "../../controllers/PostPointController";
import { getTopCategoryPost } from './../../controllers/CategoryPostController';
import { Post } from "../../entities/Post";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { GqlContext } from "../GqlContext";
// import { withFilter } from "graphql-subscriptions";
import { createPost, deletePost, editPost, getLatestPosts, getPostById, getPostsByCategoryId } from "../../controllers/PostController";
import { STANDARD_ERROR, EntityResult } from "../resolvers"
import { Category } from "../../entities/Category";
import { getAllCategories } from "../../controllers/CategoryController";
import { PostCategory } from "../../entities/EntityCategory";
// import { LIKED_POST } from "../../lib/constants";

const postResolver = {
  PostResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Post';
    },
  },
  PostArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'PostArray';
    },
  },

  MsgResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Message';
    },
  },

  PostPointResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'PostPoint';
    },
  },

  PostPointArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'PostPointArray';
    },
  },

  // Subscription: {
  //   newLike: {
  //     subscribe: () => pubsub.asyncIterator([LIKED_POST]),
  //     // subscribe: withFilter(
  //     //   () => pubsub.asyncIterator(LIKED_POST),
  //     //   (payload, args) => payload.postId === args.postId
  //     // ),
  //   },
  // },

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
        categoryName: string;
        title: string;
        body: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Post>;
      try {
        result = await createPost(
          args.userId,
          args.categoryName,
          args.title,
          args.body
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    editPost: async (
      _obj: any,
      args: {
        id: string;
        body: string;
        title: string;
        categoryId: string;
      },
      ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return {
            messages: ['You must be logged in to make changes.'],
          };
        }
        // const userId = "51"
        const result = await editPost(
          args.id,
          ctx.req.session!.userId,
          // userId,
          args.body,
          args.title,
          args.categoryId
        );

        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deletePost: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        const result = await deletePost(args.id);

        return result;
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
      let result = '';
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return 'You must be logged in to like this post.';
        }
        // const userId = "44"
        result = await updatePostPoint(
          ctx.req.session?.userId,
          // userId,
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

export default postResolver;
