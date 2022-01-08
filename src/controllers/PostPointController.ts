import { getManager, getRepository } from "typeorm";
import { User } from "../entities/User";
import { PostPoint } from "../entities/PostPoint";
import { Post } from "../entities/Post";
import { LIKED_POST, NEW_MESSAGE } from "../lib/constants";
import { pubsub } from '../graphql/GqlContext';
import { Message } from '../entities/Message';
// import { QueryArrayResult } from './QuerryArrayResult';


export class PostPointResult {
  constructor(public messages?: Array<string>, public postPoint?: PostPoint) {}
}

export const updatePostPoint = async (
  userId: string,
  slug: string,
  increment: boolean
): Promise<string> => {
  const userRepository = getRepository(User);
  if (!userId || userId === '0') {
    return 'User is not authenticated';
  }

  let message = 'Failed to increment points';
  const post = await Post.findOne({
    where: { slug },
    relations: ['creator'],
  });

  const postOwner = await userRepository.findOne({
    where: { id: post!.creator!.id },
  });

  if (post!.creator!.id === userId) {
    message = 'Error: users cannot like their own post';
    console.log('incPostPoint', message);
    return message;
  }
  const user = await userRepository.findOne({ where: { id: userId } });

  const existingPoint = await PostPoint.findOne({
    where: {
      post: { id: post!.id },
      user: { id: userId },
    },
    relations: ['post'],
  });

  await getManager().transaction(async (_transactionEntityManager) => {
    if (existingPoint) {
      if (increment) {
        if (existingPoint.isDecrement) {
          console.log('remove dec');
          await PostPoint.remove(existingPoint);
          post!.points = Number(post!.points) + 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      } else {
        if (!existingPoint.isDecrement) {
          console.log('remove inc');
          await PostPoint.remove(existingPoint);
          post!.points = Number(post!.points) - 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      }
    } else {
      console.log('new point');
      await PostPoint.create({
        post,
        isDecrement: !increment,
        user,
        createdBy: user?.username,
        lastModifiedBy: user?.username,
      }).save();
      if (increment) {
        post!.points = Number(post!.points) + 1;
      } else {
        post!.points = Number(post!.points) - 1;
      }
      post!.lastModifiedOn = new Date();
      await post!.save();
    }
  });

  // console.log(postPoint)

  message = `Successfully ${increment ? 'incremented' : 'decremented'} total.`;

  if (message === 'Successfully decremented total.') {
    return message;
  }

  const response: Message = await Message.create({
    from: user!.username,
    image: user!.profileImage,
    title: 'post like',
    body: `${user!.username} liked your post.`,
    type: LIKED_POST,
    user: postOwner,
  }).save();

  pubsub.publish(NEW_MESSAGE, {
    newMessage: {
      id: response.id,
      from: user?.username,
      image: user?.profileImage,
      isRead: response.isRead,
      title: 'new like',
      body: response.body,
      type: NEW_MESSAGE,
      createdBy: response.createdBy,
      createdOn: response.createdOn,
      user: postOwner,
    },
  });

  return message;
};

// export const getPostPointsByPostId = async (
//   postId: string
// ): Promise<QueryArrayResult<PostPoint>> => {
//   const postPoints = await PostPoint.createQueryBuilder('pp')
//     .where(`pp."postId" = :postId`, { postId })
//     .leftJoinAndSelect('pp.user', 'user')
//     .orderBy('pp.createdOn', 'DESC')
//     .getMany();

//   if (!postPoints || postPoints.length === 0) {
//     return {
//       messages: ['Posts of category not found.'],
//     };
//   }

//   // console.log(posts);
//   return {
//     entities: postPoints,
//   };
// };

