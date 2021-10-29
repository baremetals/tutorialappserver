import { getManager, getRepository } from "typeorm";
import { User } from "../entities/User";
import { PostPoint } from "../entities/PostPoint";
import { Post } from "../entities/Post";

export const updatePostPoint = async (
  userId: string,
  postId: string,
  increment: boolean
): Promise<string> => {
  const userRepository = getRepository(User);
  if (!userId || userId === "0") {
    return "User is not authenticated";
  }

  let message = "Failed to increment points";
  const post = await Post.findOne({
    where: { id: postId },
    relations: ["user"],
  });
  if (post!.creator!.id === userId) {
    message = "Error: users cannot like their own post";
    console.log("incPostPoint", message);
    return message;
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

    message = `Successfully ${
      increment ? "incremented" : "decremented"
    } total.`;
  });

  return message;
};
