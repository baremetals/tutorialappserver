import { User } from '../entities/User';
import { Chat } from '../entities/Chat';
import {
  isPostBodyValid,
} from '../utils/validators/PostValidators';
import { QueryArrayResult } from './QuerryArrayResult';
import { getConnection, getRepository } from 'typeorm';
import { ChatMsg } from '../entities/ChatMsg';
// import { pubsub } from '../graphql/GqlContext';
// import { NEW_CHAT } from '../lib/constants';
// import { pubsub } from '../graphql/GqlContext';
// import { NEW_CHAT_MESSAGE } from '../lib/constants';


export class ChatMsgResult {
  constructor(public messages?: Array<string>, public chatMsg?: ChatMsg) {}
}

export const createChatMessage = async (
  ownerUserId: string | undefined | null,
  recipientUserId: string | undefined | null,
  body: string
): Promise<ChatMsgResult> => {
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
  // console.log('this is the owner: ', owner);

  if (!recipientUserId) {
    return {
      messages: ['User not found.'],
    };
  }

  const recipient = await userRepository.findOne({
    id: recipientUserId,
  });
  // console.log('this is the receiver: ', recipient);

  const chatMsgs = await ChatMsg.create({
    body,
    sender: owner,
    receiver: recipient,
    createdBy: owner?.username,
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
    chatMsgs: [chatMsgs],
  }).save();

  if (!chat) {
    return {
      messages: ['Failed to create chat.'],
    };
  }

  chatMsgs!.chat = chat;
  chatMsgs!.lastModifiedOn = new Date();
  await chatMsgs!.save();

  // pubsub.publish(NEW_CHAT, {
  //   newChat: {
  //     id: chat.id,
  //     owner: owner,
  //     recipient: recipient,
  //     chatMsgs: chatMsgs,
  //     createdBy: chatMsgs.createdBy,
  //     createdOn: chatMsgs.createdOn,
  //   },
  // });

  return {
    chatMsg: chatMsgs,
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
      createdBy: sender?.username,
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
    recipient = chat!.recipient;
  }

  const chatMsgs = await ChatMsg.create({
    body,
    sender,
    receiver: recipient, // chat?.recipient,
    chat,
    createdBy: sender?.username,
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

export const editChatMsg = async (
  id: string,
  body: string
): Promise<ChatMsgResult> => {
  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }
  const chatMsgs = await ChatMsg.findOne({
    where: { id },
  });

  if (!chatMsgs) {
    return {
      messages: ['Chat message not found.'],
    };
  }

  // const sender = await User.findOne({
  //   id: senderUserId,
  // });

  console.log(chatMsgs);

  await getConnection()
    .createQueryBuilder()
    .update(ChatMsg)
    .set({
      body,
      lastModifiedBy: chatMsgs?.createdBy,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return {
    chatMsg: chatMsgs,
    messages: ['Message edited successfully.'],
  };
};

export const deleteChatMsg = async (id: string): Promise<string> => {
  const chatMsgs = await ChatMsg.findOne({
    where: { id },
  });

  if (!chatMsgs) {
    return 'Chat message not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(ChatMsg)
    .where('id = :id', { id: id })
    .execute();
  return 'Your message has been deleted.';
};

export const deleteChat = async (id: string): Promise<string> => {
  const chat = await Chat.findOne({
    where: { id },
  });

  if (!chat) {
    return 'Chat not found.';
  }

  const chatMsgs = await ChatMsg.find({
    where: { id },
  });

  if (!chatMsgs) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Chat)
      .where('id = :id', { id: id })
      .execute();
    return 'Your chats has been deleted.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(ChatMsg)
    .where('chatId = :chatId', { chatId: id })
    .execute();

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Chat)
    .where('id = :id', { id: id })
    .execute();
  return 'Your chats has been deleted.';
};

export const getAllChatsByUserId = async (
  userId: string
): Promise<QueryArrayResult<Chat>> => {
  const chats = await Chat.createQueryBuilder('chat')
    .where(`chat."ownerId" = :userId OR chat."recipientId" = :userId`, {
      userId,
    })
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
  chatId: string
): Promise<QueryArrayResult<ChatMsg>> => {
  const chatMsgs = await ChatMsg.createQueryBuilder('cm')
    .where(`cm."chatId" = :chatId `, {chatId})
    .leftJoinAndSelect('cm.sender', 'sender')
    .leftJoinAndSelect('cm.receiver', 'receiver')
    .leftJoinAndSelect('cm.chat', 'chat')
    .orderBy('cm.createdOn', 'ASC')
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

export const getAllUnReadChatMsgsByUserId = async (userId: string): Promise<QueryArrayResult<ChatMsg>> => {
  const chatMsgs = await ChatMsg.createQueryBuilder('cm')
    .where(`cm."receiverId" = :userId`, { userId })
    .andWhere(`cm."IsRead" = :isRead`, { isRead: false })
    .leftJoinAndSelect('cm.sender', 'sender')
    .leftJoinAndSelect('cm.receiver', 'receiver')
    .leftJoinAndSelect('cm.chat', 'chat')
    .orderBy('cm.createdOn', 'DESC')
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

export const searchAllChatsByUserId = async (
  userId: string
): Promise<QueryArrayResult<Chat>> => {
  const chats = await Chat.createQueryBuilder('chat')
    .where(`chat."ownerId" = :userId OR chat."recipientId" = :userId`, {
      userId,
    })
    .leftJoinAndSelect('chat.owner', 'owner')
    .leftJoinAndSelect('chat.recipient', 'recipient')
    .orderBy('user.createdOn', 'DESC')
    .getMany();

  if (!chats || chats.length === 0) {
    return {
      messages: ['No messages found.'],
    };
  }

  return {
    entities: chats,
  };
};

// Todo

// export const editmsg = async (): Promise{}
// export const deletemsg = async (): Promise{}
