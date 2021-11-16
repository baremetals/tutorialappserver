import {
  createComment,
  getCommentsByCourseId,
  getCommentsByNoteId,
  getCommentsByPostId,
} from '../../controllers/CommentController';
import { QueryArrayResult } from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
// import { withFilter } from 'graphql-subscriptions';
import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Comment } from '../../entities/Comment';
import { NEW_COMMENT } from '../../lib/constants';

const commentResolver = {
  CommentResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Comment';
    },
  },

  CommentArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'CommentArray';
    },
  },

  Subscription: {
    newComment: {
      subscribe: () => pubsub.asyncIterator([NEW_COMMENT]),
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator([NEW_COMMENT]),
      //   (payload, args) => payload.postId === args.postId
      // ),
    },
  },

  Query: {
    getCommentsByPostId: async (
      _obj: any,
      args: { postId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ comments: Array<Comment> } | EntityResult> => {
      let comments: QueryArrayResult<Comment>;
      try {
        comments = await getCommentsByPostId(args.postId);
        if (comments.entities) {
          return {
            comments: comments.entities,
          };
        }
        return {
          messages: comments.messages ? comments.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    getCommentsByCourseId: async (
      _obj: any,
      args: { courseId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ comments: Array<Comment> } | EntityResult> => {
      let comments: QueryArrayResult<Comment>;
      try {
        comments = await getCommentsByCourseId(args.courseId);
        if (comments.entities) {
          return {
            comments: comments.entities,
          };
        }
        return {
          messages: comments.messages ? comments.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    getCommentsByNoteId: async (
      _obj: any,
      args: { noteId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ comments: Array<Comment> } | EntityResult> => {
      let comments: QueryArrayResult<Comment>;
      try {
        comments = await getCommentsByNoteId(args.noteId);
        if (comments.entities) {
          return {
            comments: comments.entities,
          };
        }
        return {
          messages: comments.messages ? comments.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
  Mutation: {
    createComment: async (
      _obj: any,
      args: { userId: string; postId: string; body: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<Comment | EntityResult> => {
      try {
        const result = await createComment(args.userId, args.postId, args.body);
        if (result && result.comment) {
          
          pubsub.publish(NEW_COMMENT, {
            newComment: {
              id: result.comment.id,
              body: args.body,
              createdBy: result.comment.createdBy,
              createdOn: result.comment.createdOn,
              isDisabled: result.comment.isDisabled,
              user: result.comment.user,
              post: result.comment.post,
            },
          });
          // console.log(result.comment);
          return result.comment;
        }

        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    // newCourseComment: async (
    //   _obj: any,
    //   args: { userId: string; courseId: string; body: string },
    //   _ctx: GqlContext,
    //   _info: any
    // ): Promise<EntityResult> => {
    //   let result: QueryOneResult<Comment>;
    //   try {
    //     result = await newCourseComment(args.userId, args.courseId, args.body);
    //     return {
    //       messages: result.messages ? result.messages : [STANDARD_ERROR],
    //     };
    //   } catch (ex) {
    //     console.log(ex);
    //     throw ex;
    //   }
    // },

    // newNoteComment: async (
    //   _obj: any,
    //   args: { userId: string; noteId: string; body: string },
    //   _ctx: GqlContext,
    //   _info: any
    // ): Promise<EntityResult> => {
    //   let result: QueryOneResult<Comment>;
    //   try {
    //     result = await newNoteComment(args.userId, args.noteId, args.body);
    //     return {
    //       messages: result.messages ? result.messages : [STANDARD_ERROR],
    //     };
    //   } catch (ex) {
    //     console.log(ex);
    //     throw ex;
    //   }
    // },

    // Todo

    // editComment: async (): Promise<string>{}
    // deleteComment: async (): Promise<string>{}
  },
};

export default commentResolver;
