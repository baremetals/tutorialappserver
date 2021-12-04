// import { getRepository } from "typeorm";
import { Message } from "../entities/Message";
import { QueryArrayResult } from './QuerryArrayResult';
// import { User } from "../entities/User";

export class MsgResult {
  constructor(public messages?: Array<string>, public msg?: Message) {}
}

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