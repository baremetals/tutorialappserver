import {
  QueryArrayResult,
} from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
import { withFilter } from 'graphql-subscriptions';

import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Message } from '../../entities/Message';
import {  NEW_MESSAGE } from '../../lib/constants';
import {
  deleteAllMessagesByUserId,
  deleteMessage,
  getMessagesByUserId,
  getUnReadMessagesByUserId,
  markAllMessagesReadByUserId,
  markMessageRead,
} from '../../controllers/MsgController';

const messageResolver = {
  MsgResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Message';
    },
  },
  MessageArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'MessageArray';
    },
  },

  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_MESSAGE]),
        (payload, args) => payload.userId === args.userId
      ),
    },
  },

  Query: {
    getMessagesByUserId: async (
      _obj: any,
      _args: null,
      ctx: GqlContext,
      _info: any
    ): Promise<{ msgs: Array<Message> } | EntityResult> => {
      let msgs: QueryArrayResult<Message>;
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in to join this course.',
          };
        }

        // const userId = '44';
        // msgs = await getMessagesByUserId(userId);
        msgs = await getMessagesByUserId(ctx.req.session!.userId);
        if (msgs.entities) {
          return {
            msgs: msgs.entities,
          };
        }
        return {
          messages: msgs.messages ? msgs.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getUnReadMessagesByUserId: async (
      _obj: any,
      _args: null,
      ctx: GqlContext,
      _info: any
    ): Promise<{ msgs: Array<Message> } | EntityResult> => {
      let msgs: QueryArrayResult<Message>;
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in to join this course.',
          };
        }

        // const userId = '51';
        // msgs = await getUnReadMessagesByUserId(userId);
        msgs = await getUnReadMessagesByUserId(ctx.req.session!.userId);
        if (msgs.entities) {
          return {
            msgs: msgs.entities,
          };
        }
        return {
          messages: msgs.messages ? msgs.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },

  Mutation: {
    markMessageRead: async (
      _obj: any,
      args: {
        id: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        // if (!ctx.req.session || !ctx.req.session!.userId) {
        //   return 'You must be logged in to make changes.';
        // }

        const userId = '46';
        return await markMessageRead(args.id, userId);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    markAllMessagesReadByUserId: async (
      _obj: any,
      args: {
        id: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        // if (!ctx.req.session || !ctx.req.session!.userId) {
        //   return 'You must be logged in to make changes.';
        // }

        return await markAllMessagesReadByUserId(args.id);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deleteMessage: async (
      _obj: any,
      args: { id: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        // if (!ctx.req.session || !ctx.req.session!.userId) {
        //   return 'You must be logged in to make this change.';
        // }

        return await deleteMessage(args.id);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deleteAllMessagesByUserId: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        return await deleteAllMessagesByUserId(args.id);

      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};


export default messageResolver;
