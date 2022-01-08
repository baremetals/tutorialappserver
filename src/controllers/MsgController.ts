import { getConnection } from 'typeorm';
import { Message } from "../entities/Message";
import { User } from '../entities/User';
import { QueryArrayResult } from './QuerryArrayResult';
// import { User } from "../entities/User";

export class MsgResult {
  constructor(public messages?: Array<string>, public msg?: Message) {}
}


export const markMessageRead = async (id: string, userId: string): Promise<string> => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return 'User not found.';
  }

  const msg = await Message.findOne({
    where: { id },
  });

  if (!msg) {
    return 'Message not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .update(Message)
    .set({
      isRead: true,
      lastModifiedBy: user.username,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return 'Message edited successfully.';
};

export const markAllMessagesReadByUserId = async (id: string): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  const msgs = await getConnection()
    .createQueryBuilder()
    .update(Message)
    .set({
      isRead: true,
      lastModifiedBy: user.username,
      lastModifiedOn: new Date(),
    })
    .where('userId = :userId', { userId: id })
    .andWhere('IsRead = :isRead', { isRead: false })
    .execute();

  if (msgs.affected === 0) {
    return 'Nothing to change';
  }

  return 'Your messages has been edited.';
};

export const deleteMessage = async (id: string): Promise<string> => {
   const msg = await Message.findOne({
     where: { id },
   });

   if (!msg) {
     return 'Message not found.';
   }
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Message)
    .where('id = :id', { id: id })
    .execute();
  return 'Your message has been deleted.';
};

export const deleteAllMessagesByUserId = async (
  id: string,
): Promise<string> => {

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  const msgs = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Message)
    .where('userId = :userId', { userId: id })
    .execute();

  if (msgs.affected === 0) {
    return 'Nothing to delete';
  }

  return 'Your messages has been deleted.';
};

// Queries
export const getMessagesByUserId = async (
  userId: string
): Promise<QueryArrayResult<Message>> => {
  const msgs = await Message.createQueryBuilder('msg')
    .where(`msg."userId" = :userId`, { userId })
    // .leftJoinAndSelect('msg.user', 'user')
    .orderBy('msg.createdOn', 'DESC')
    .getMany();

  if (!msgs || msgs.length === 0) {
    return {
      messages: ['Messages of user not found.'],
    };
  }
  // console.log(msgs);
  return {
    entities: msgs,
  };
};

export const getUnReadMessagesByUserId = async (
  userId: string
): Promise<QueryArrayResult<Message>> => {
  const msgs = await Message.createQueryBuilder('msg')
    .where(`msg."userId" = :userId`, { userId })
    .andWhere(`msg."IsRead" = :isRead`, { isRead: false })
    // .leftJoinAndSelect('msg.user', 'user')
    .orderBy('msg.createdOn', 'DESC')
    .getMany();

  if (!msgs || msgs.length === 0) {
    return {
      messages: ['Messages of user not found.'],
    };
  }
  // console.log(msgs);
  return {
    entities: msgs,
  };
};

// export const createNotification = async (
//   userId: string | undefined | null,
//   ownerId: string | undefined | null,
//   entityId: string,
//   body: string
// ): Promise<MsgResult> => {
//   const userRepository = getRepository(User);
//   const bodyMsg = isPostBodyValid(body);
//   if (bodyMsg) {
//     return {
//       messages: [bodyMsg],
//     };
//   }
//   if (!userId) {
//     return {
//       messages: ['User not logged in.'],
//     };
//   }
//   const user = await userRepository.findOne({
//     id: userId,
//   });
//   // console.log(user?.username);

//   const post = await Post.findOne({
//     id: postId,
//   });
//   const postOwner = await userRepository.findOne({
//     where: { id: ownerId },
//   });
//   if (!post) {
//     return {
//       messages: ['Postnot found.'],
//     };
//   }
//   const notice = await Message.create({
//     from: user?.username,
//     image: user?.profileImage,
//     title: 'new comment',
//     body, // `${user?.username} commented on your post`,
//     type: 'NEW_COMMENT',
//     user: postOwner,
//   }).save();

//   if (!notice) {
//     return {
//       messages: ['Failed to create Notification.'],
//     };
//   }

//   pubsub.publish(NEW_MESSAGE, {
//     newMessage: {
//       id: notice.id,
//       from: user?.username,
//       image: user?.profileImage,
//       title: 'new comment',
//       body: notice.body,
//       createdBy: notice.createdBy,
//       createdOn: notice.createdOn,
//       user,
//     },
//   });

//   return {
//     comment: comment,
//     messages: ['Comment created successfully.'],
//   };
// };