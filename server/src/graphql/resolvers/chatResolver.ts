import { QueryArrayResult, QueryOneResult } from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
import { withFilter } from 'graphql-subscriptions';

import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Chat } from '../../entities/Chat';
import { NEW_CHAT, NEW_CHAT_MESSAGE } from '../../lib/constants';
import { createChatMessage, getAllChatMsgs, getAllChats, getChatMessagesByChatId, getChatMessagesByUserId, respondToChatMessage } from '../../controllers/ChatController';
import { ChatMsg } from '../../entities/ChatMsg';


const chatResolver = {
  ChatResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Chat';
    },
  },

  ChatMsgResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'ChatMsg';
    },
  },

  ChatArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'ChatArray';
    },
  },

  ChatMsgArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'ChatMsgArray';
    },
  },

  Subscription: {
    newChat: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_CHAT]),
        (payload, args) => payload.userId === args.userId
      ),
    },

    newChatMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_CHAT_MESSAGE]),
        (payload, args) => payload.userId === args.userId
      ),
    },
  },

  Query: {
    getChatMessagesByUserId: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ chats: Array<Chat> } | EntityResult> => {
      let chats: QueryArrayResult<Chat>;
      try {
        // if (!ctx.req.session || !ctx.req.session?.userId) {
        //   return {
        //     messages: 'You must be logged in to join this course.',
        //   };
        // }

        const userId = '46';
        chats = await getChatMessagesByUserId(userId);
        // msgs = await getMessagesByUserId(ctx.req.session!.userId);
        if (chats.entities) {
          // console.log('this is the console log ', chats.entities);
          return {
            chats: chats.entities,
          };
        }
        return {
          messages: chats.messages ? chats.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getAllChats: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ chats: Array<Chat> } | EntityResult> => {
      let chats: QueryArrayResult<Chat>;
      try {
        chats = await getAllChats();
        if (chats.entities) {
          return {
            chats: chats.entities,
          };
        }
        return {
          messages: chats.messages ? chats.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getChatMessagesByChatId: async (
      _obj: any,
      args: { chatId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ chatMsgs: Array<ChatMsg> } | EntityResult> => {
      // console.log(' I got here in the resolver start');
      let chatMsgs: QueryArrayResult<ChatMsg>;
      try {
        chatMsgs = await getChatMessagesByChatId(args.chatId);

        if (chatMsgs.entities) {
          // console.log('this is the console log ', chatMsgs.entities);
          return {
            chatMsgs: chatMsgs.entities,
          };
        }
        return {
          messages: chatMsgs.messages ? chatMsgs.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getAllChatMsgs: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ chatMsgs: Array<ChatMsg> } | EntityResult> => {
      let chatMsgs: QueryArrayResult<ChatMsg>;
      try {
        chatMsgs = await getAllChatMsgs();
        if (chatMsgs.entities) {
          return {
            chatMsgs: chatMsgs.entities,
          };
        }
        return {
          messages: chatMsgs.messages ? chatMsgs.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },

  Mutation: {
    createChatMessage: async (
      _obj: any,
      args: { ownerUserId: string; recipientUserId: string; body: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Chat>;
      try {
        result = await createChatMessage(
          args.ownerUserId,
          args.recipientUserId,
          args.body
        );
        if (result.entity) {
          pubsub.publish(NEW_CHAT, {
            newChat: {
              id: result.entity.id,
              owner: result.entity.owner,
              recipient: result.entity.recipient,
              chatMsgs: result.entity.chatMsgs,
              createdBy: result.entity.createdBy,
              createdOn: result.entity.createdOn,
            },
          });
        }

        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    respondToChatMessage: async (
      _obj: any,
      args: {
        senderUserId: string;
        chatId: string;
        body: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<ChatMsg | EntityResult> => {
      try {
        const result = await respondToChatMessage(
          args.senderUserId,
          args.chatId,
          args.body
        );
        if (result && result.chatMsg) {
          pubsub.publish(NEW_CHAT_MESSAGE, {
            newChatMessage: {
              id: result.chatMsg.id,
              isRead: result.chatMsg.isRead,
              body: args.body,
              sender: result.chatMsg.sender,
              receiver: result.chatMsg.receiver,
              chat: result.chatMsg.chat,
              createdBy: result.chatMsg.createdBy,
              createdOn: result.chatMsg.createdOn,
            },
          });
        }
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    // Todo
    // deleteMessage: async (): Promise<string>{}
    // editMessage: async (): Promise<string>{}
  },
};

export default chatResolver;
