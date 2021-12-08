import { QueryArrayResult } from '../../controllers/QuerryArrayResult';
import { GqlContext, pubsub } from '../GqlContext';
import { withFilter } from 'graphql-subscriptions';

import { STANDARD_ERROR, EntityResult } from '../resolvers';
import { Chat } from '../../entities/Chat';
import { NEW_CHAT, NEW_CHAT_MESSAGE } from '../../lib/constants';
import {
  createChatMessage,
  getAllChatMsgs,
  getAllChats,
  getAllUnReadChatMsgsByUserId,
  getChatMessagesByChatId,
  getAllChatsByUserId,
  respondToChatMessage,
  editChatMsg,
  deleteChatMsg,
  deleteChat,
  // searchAllChatsByUserId,
} from '../../controllers/ChatController';
import { ChatMsg } from '../../entities/ChatMsg';
import { User } from '../../entities/User';
// import { User } from '../../entities/User';


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
      // subscribe: () => pubsub.asyncIterator([NEW_CHAT_MESSAGE]),
    },
  },

  Query: {
    getAllChatsByUserId: async (
      _obj: any,
      _args: null,
      ctx: GqlContext,
      _info: any
    ): Promise<{ chats: Array<Chat> } | EntityResult> => {
      let chats: QueryArrayResult<Chat>;
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in to join this course.',
          };
        }

        // const userId = '46';
        // chats = await getAllChatsByUserId(userId);
        chats = await getAllChatsByUserId(ctx.req.session!.userId);
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

    searchAllChatsByUserId: async (
      _obj: any,
      args: { username: string },
      ctx: GqlContext,
      _info: any
    ): Promise<{ chatMsgs: Array<ChatMsg> } | EntityResult> => {
      let chatMsgs: QueryArrayResult<ChatMsg>;
      let chats: QueryArrayResult<Chat>;
      let chatId: string;

      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in.',
          };
        }

        // const userId = "44"
        // chats = await getAllChatsByUserId(userId);
        chats = await getAllChatsByUserId(ctx.req.session!.userId);

        // console.log(chats)
        const allChats = chats.entities?.filter((cht) => {
          return (
            cht.owner.username == args.username ||
            cht.recipient.username == args.username
          );
        });

        // console.log(allChats![0].id);
        // console.log("where is it messing up");
        if (allChats?.length === 0) {
          return {
            messages: ['You have no messages'],
          };
        }
        // console.log('isit here?');
        chatId = allChats![0].id;
        // chatId = allChats![0].id === undefined ? '' : allChats![0].id;
        chatMsgs = await getChatMessagesByChatId(chatId);

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

    getAllUnReadChatMsgsByUserId: async (
      _obj: any,
      _args: null,
      ctx: GqlContext,
      _info: any
    ): Promise<{ chatMsgs: Array<ChatMsg> } | EntityResult> => {
      let chatMsgs: QueryArrayResult<ChatMsg>;
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in to join this course.',
          };
        }

        // const userId = '46';
        // chatMsgs = await getAllUnReadChatMsgsByUserId(userId);
        chatMsgs = await getAllUnReadChatMsgsByUserId(ctx.req.session!.userId);
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
      ctx: GqlContext,
      _info: any
    ): Promise<{ chatMsgs: Array<ChatMsg> } | EntityResult> => {
      console.log(args.chatId);

      let chatMsgs: QueryArrayResult<ChatMsg>;
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return {
            messages: 'You must be logged in to join this course.',
          };
        }
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
      args: { ownerUserId: string; username: string; body: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<ChatMsg | EntityResult> => {
      // let result: QueryOneResult<Chat>;

      const recipient = await User.findOne({
        username: args.username,
      });

      const owner = await User.findOne({
        id: args.ownerUserId,
      });

      // console.log(recipient);

      try {
        const result = await createChatMessage(
          args.ownerUserId,
          recipient?.id,
          args.body
        );
        if (result && result.chatMsg) {
          pubsub.publish(NEW_CHAT, {
            newChat: {
              id: result.chatMsg.chat.id,
              owner: owner,
              recipient: recipient,
              // chatMsgs: result.chatMsg.chatMsg,
              createdBy: result.chatMsg.createdBy,
              createdOn: result.chatMsg.createdOn,
            },
          });

          pubsub.publish(NEW_CHAT_MESSAGE, {
            newChatMessage: {
              id: result.chatMsg.id,
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

    editChatMsg: async (
      _obj: any,
      args: { id: string; body: string },
      ctx: GqlContext,
      _info: any
    ): Promise<ChatMsg | EntityResult> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return {
            messages: ['You must be logged in to make changes.'],
          };
        }

        const result = await editChatMsg(args.id, args.body);

        if (result && result.chatMsg) {
          pubsub.publish(NEW_CHAT_MESSAGE, {
            newChatMessage: {
              id: result.chatMsg.id,
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

    deleteChatMsg: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        return await deleteChatMsg(args.id);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deleteChat: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        return await deleteChat(args.id);

        
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};

export default chatResolver;
