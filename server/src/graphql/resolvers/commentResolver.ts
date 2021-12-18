import {
  createComment,
  deleteComment,
  editComment,
  getCommentsByCourseId,
  getCommentsByNoteId,
  getCommentsByPostSlug,
} from '../../controllers/CommentController';
import { QueryArrayResult } from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
// import { withFilter } from 'graphql-subscriptions';
import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Comment } from '../../entities/Comment';
import { NEW_COMMENT, NEW_MESSAGE } from '../../lib/constants';
import { getRepository } from 'typeorm';
import { Message } from '../../entities/Message';
import { User } from '../../entities/User';
import { Post } from '../../entities/Post';
// import { withFilter } from 'graphql-subscriptions';

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
    getCommentsByPostSlug: async (
      _obj: any,
      args: { slug: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ comments: Array<Comment> } | EntityResult> => {
      let comments: QueryArrayResult<Comment>;
      const postRepository = getRepository(Post);

      if (!args.slug) {
        return {
          messages: ['Please provide a slug.'],
        };
      }

      const post = await postRepository.findOne({
        where: {slug: args.slug}
      });
      try {
        comments = await getCommentsByPostSlug(post?.id as string);
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
      const userRepository = getRepository(User);
      const post = await Post.findOne({
        where: { id: args.postId },
        relations: ['creator'],
      });

      try {
        const result = await createComment(args.userId, args.postId, args.body);
        if (result && result.comment) {
          const postOwner = await userRepository.findOne({
            where: { id: post!.creator!.id },
          });
          // console.log(postOwner);
          const user = result.comment.user;

          const notice = await Message.create({
            from: user?.username,
            image: user?.profileImage,
            title: 'new comment',
            body: `${user?.username} commented on your post`,
            type: 'NEW_COMMENT',
            user: postOwner,
          }).save();

          pubsub.publish(NEW_MESSAGE, {
            newMessage: {
              id: notice.id,
              from: user?.username,
              image: user?.profileImage,
              isRead: notice.isRead,
              title: 'new comment',
              body: notice.body,
              type: NEW_MESSAGE,
              createdBy: notice.createdBy,
              createdOn: notice.createdOn,
              user: postOwner,
            },
          });

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

    editComment: async (
      _obj: any,
      args: { id: string; body: string },
      ctx: GqlContext,
      _info: any
    ): Promise<Comment | EntityResult> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return {
            messages: ['You must be logged in to make changes.'],
          };
        }
        
        // const userId = "46"
        const result = await editComment(
          args.id,
          ctx.req.session!.userId,
          // userId,
          args.body,
        );

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

    deleteComment: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        const result = await deleteComment(args.id);

        return result;
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
