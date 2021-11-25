import { User } from '../entities/User';
import { Chat } from '../entities/Chat';
import {
  isPostBodyValid,
} from '../utils/validators/PostValidators';
import { QueryArrayResult, QueryOneResult } from './QuerryArrayResult';
import { getRepository } from 'typeorm';
import { ChatMsg } from '../entities/ChatMsg';


export class ChatMsgResult {
  constructor(public messages?: Array<string>, public chatMsg?: ChatMsg) {}
}

export const createChatMessage = async (
  ownerUserId: string | undefined | null,
  recipientUserId: string | undefined | null,
  body: string
): Promise<QueryOneResult<Chat>> => {
  const userRepository = getRepository(User);
  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }

  if (!ownerUserId) {
    return {
      messages: ['User not logged in.'],
    };
  }

  const owner = await userRepository.findOne({
    id: ownerUserId,
  });
  console.log('this is the owner: ', owner);

  if (!recipientUserId) {
    return {
      messages: ['User not found.'],
    };
  }

  const recipient = await userRepository.findOne({
    id: recipientUserId,
  });
  console.log("this is the receiver: ", recipient)

  const chatMsgs = await ChatMsg.create({
    body,
    sender: owner,
    receiver: recipient,
  }).save();

  if (!chatMsgs) {
    return {
      messages: ['Failed to create chat message.'],
    };
  }

  // let testChat: Array<ChatMsg>;

  const chat = await Chat.create({
    owner,
    recipient,
    chatMsgs: [chatMsgs]
  }).save();

  if (!chat) {
    return {
      messages: ['Failed to create chat.'],
    };
  }

  chatMsgs!.chat = chat;
  chatMsgs!.lastModifiedOn = new Date();
  await chatMsgs!.save();

  return {
    entity: chat,
    messages: ['Chat created successfully.'],
  };
};

export const respondToChatMessage = async (
  senderUserId: string | undefined | null,
  chatId: string | undefined | null,
  body: string
): Promise<ChatMsgResult> => {
  // const userRepository = getRepository(User);
  // const chatRepository = getRepository(Chat);

  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }

  if (!senderUserId) {
    return {
      messages: ['User not logged in.'],
    };
  }

  if (!chatId) {
    return {
      messages: ['Chat not found.'],
    };
  }

  const sender = await User.findOne({
    id: senderUserId,
  });
  console.log("testing sender",sender);

  const chat = await Chat.findOne({
    id: chatId,
  });

  // console.log("this to test for the chat owners id: ",chat);

  let recipient;

  if (chat!.owner.id !== senderUserId) {
    recipient = chat!.owner.id;
    const receiver = await User.findOne({
      id: recipient,
    });

    // console.log('from if statement: ', recipient);

    const chatMsgs = await ChatMsg.create({
      body,
      sender,
      receiver,
      chat,
    }).save();

    chat!.lastModifiedOn = new Date();
    chat!.lastModifiedBy = sender?.username as string;
    await chat!.save();

    // console.log('this just run bro');

    return {
      chatMsg: chatMsgs,
      messages: ['Chat message created successfully.'],
    };
  } else {
    recipient = chat!.owner.id;
  }

  const chatMsgs = await ChatMsg.create({
    body,
    sender,
    receiver: chat?.recipient,
    chat,
  }).save();

  console.log(" no I just did forsake my g")

  if (!chatMsgs) {
    return {
      messages: ['Failed to create chat message.'],
    };
  }

  chat!.lastModifiedOn = new Date();
  chat!.lastModifiedBy = sender?.username as string;
  await chat!.save()

  return {
    chatMsg: chatMsgs,
    messages: ['Chat message created successfully.'],
  };
};

export const getChatMessagesByUserId = async (
  userId: string
): Promise<QueryArrayResult<Chat>> => {
  const chats = await Chat.createQueryBuilder('chat')
    .where(`chat."ownerId" = :userId`, { userId })
    .where(`chat."recipientId" = :userId`, { userId })
    .leftJoinAndSelect('chat.owner', 'owner')
    .leftJoinAndSelect('chat.recipient', 'recipient')
    .leftJoinAndSelect('chat.chatMsgs', 'chatMsgs')
    .orderBy('chat.createdOn', 'DESC')
    .getMany();

  if (!chats || chats.length === 0) {
    return {
      messages: ['Chat messages of user not found.'],
    };
  }
  // console.log(chatMsgs);
  return {
    entities: chats,
  };
};

export const getAllChats = async (): Promise<QueryArrayResult<Chat>> => {
  const chats = await Chat.createQueryBuilder('c')
    .leftJoinAndSelect('c.owner', 'owner')
    .leftJoinAndSelect('c.recipient', 'recipient')
    .leftJoinAndSelect('c.chatMsgs', 'chatMsgs')
    .orderBy('c.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!chats || chats.length === 0) {
    return {
      messages: ['No chats found.'],
    };
  }
  // console.log(posts);
  return {
    entities: chats,
  };
};

export const getChatMessagesByChatId = async (
  chatId: string,
): Promise<QueryArrayResult<ChatMsg>> => {
  const chatMsgs = await ChatMsg.createQueryBuilder('cm')
    .where(`cm."chatId" = :chatId`, { chatId })
    .leftJoinAndSelect('cm.sender', 'sender')
    .leftJoinAndSelect('cm.receiver', 'receiver')
    .leftJoinAndSelect('cm.chat', 'chat')
    .orderBy('cm.createdOn', 'DESC')
    .getMany();
  if (!chatMsgs || chatMsgs.length === 0) {
    return {
      messages: ['Chat messages not found.'],
    };
  }
  //console.log(chatMsgs);
  return {
    entities: chatMsgs,
  };
};

export const getAllChatMsgs = async (): Promise<QueryArrayResult<ChatMsg>> => {
  const chatMsgs = await ChatMsg.createQueryBuilder('cm')
    .leftJoinAndSelect('cm.sender', 'sender')
    .leftJoinAndSelect('cm.receiver', 'receiver')
    .leftJoinAndSelect('cm.chat', 'chat')
    .orderBy('cm.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!chatMsgs || chatMsgs.length === 0) {
    return {
      messages: ['No chats found.'],
    };
  }
  // console.log(posts);
  return {
    entities: chatMsgs,
  };
};

// Todo

// export const editmsg = async (): Promise{}
// export const deletemsg = async (): Promise{}