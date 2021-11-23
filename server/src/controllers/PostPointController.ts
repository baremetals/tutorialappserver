import { getManager, getRepository } from "typeorm";
import { User } from "../entities/User";
import { PostPoint } from "../entities/PostPoint";
import { Post } from "../entities/Post";
import { MsgResult } from "./MsgController";
import { Message } from "../entities/Message";
import { LIKED_POST } from "../lib/constants";

export const updatePostPoint = async (
  userId: string,
  postId: string,
  increment: boolean
): Promise<MsgResult> => {
  const userRepository = getRepository(User);
  if (!userId || userId === "0") {
    return {
      messages: ["User is not authenticated"],
    };
  }

  let message = "Failed to increment points";
  const post = await Post.findOne({
    where: { id: postId },
    relations: ["creator"],
  });
  if (post!.creator!.id === userId) {
    message = "Error: users cannot like their own post";
    console.log("incPostPoint", message);
    return {
      messages: [message],
    };
  }
  const user = await userRepository.findOne({ where: { id: userId } });

  const existingPoint = await PostPoint.findOne({
    where: {
      post: { id: postId },
      user: { id: userId },
    },
    relations: ["post"],
  });

  await getManager().transaction(async (_transactionEntityManager) => {
    if (existingPoint) {
      if (increment) {
        if (existingPoint.isDecrement) {
          console.log("remove dec");
          await PostPoint.remove(existingPoint);
          post!.points = Number(post!.points) + 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      } else {
        if (!existingPoint.isDecrement) {
          console.log("remove inc");
          await PostPoint.remove(existingPoint);
          post!.points = Number(post!.points) - 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      }
    } else {
      console.log("new point");
      await PostPoint.create({
        post,
        isDecrement: !increment,
        user,
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

  message = `Successfully ${increment ? "incremented" : "decremented"} total.`;

  if (message === "Successfully decremented total.") {
    return {
      messages: [message],
    };
  }

  const response: Message = await Message.create({
    from: user!.username,
    image: user!.profileImage,
    title: 'post like',
    body: `${user!.username} liked your post.`,
    type: LIKED_POST,
    user,
  }).save();
  

  return {
    msg: response,
  };
};
