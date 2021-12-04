import {
  QueryArrayResult,
} from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
import { withFilter } from 'graphql-subscriptions';

import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Message } from '../../entities/Message';
import {  NEW_MESSAGE } from '../../lib/constants';
import { getMessagesByUserId, getUnReadMessagesByUserId } from '../../controllers/MsgController';

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
    // Todo
    // deleteMessage: async (): Promise<string>{}
    // editMessage: async (): Promise<string>{}
  },
};


export default messageResolver;
