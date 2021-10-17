import { createComment, getCommentsByPostId } from "../../controllers/CommentController";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { GqlContext } from "../GqlContext";
import { STANDARD_ERROR, EntityResult } from "../resolvers";
import { Comment } from "../../entities/Comment"

const commentResolver = {
  CommentResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Comment";
    },
  },

  CommentArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "CommentArray";
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
          messages: comments.messages
            ? comments.messages
            : [STANDARD_ERROR],
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
      args: { userId: string; threadId: string; body: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Comment>;
      try {
        result = await createComment(args.userId, args.threadId, args.body);
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};

export default commentResolver;
