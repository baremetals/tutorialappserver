import { getManager, getRepository } from "typeorm";
import { User } from "../entities/User";
import { Like } from "../entities/Like";
import { Post } from "../entities/Post";

export const updateLike = async (
  userId: string,
  postId: string,
  increment: boolean
): Promise<string> => {
  const userRepository = getRepository(User);
  if (!userId || userId === "0") {
    return "User is not authenticated";
  }

  let message = "Failed to increment like";
  const post = await Post.findOne({
    where: { id: postId },
    relations: ["user"],
  });
  if (post!.user!.id === userId) {
    message = "Error: users cannot like their own post";
    console.log("inclike", message);
    return message;
  }
  const user = await userRepository.findOne({ where: { id: userId } });

  const existingPoint = await Like.findOne({
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
          await Like.remove(existingPoint);
          post!.points = Number(post!.points) + 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      } else {
        if (!existingPoint.isDecrement) {
          console.log("remove inc");
          await Like.remove(existingPoint);
          post!.points = Number(post!.points) - 1;
          post!.lastModifiedOn = new Date();
          await post!.save();
        }
      }
    } else {
      console.log("new point");
      await Like.create({
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

    message = `Successfully ${
      increment ? "incremented" : "decremented"
    } total.`;
  });

  return message;
};
