// import { getRepository } from "typeorm";
import { Message } from "../entities/Message";
// import { User } from "../entities/User";

export class MsgResult {
  constructor(public messages?: Array<string>, public msg?: Message) {}
}

// export const neweNotification = async (
//   userId: string | undefined | null,
//   title: string,
//   body: string,
//   type: string
// ): Promise<MsgResult> => {
//   const userRepository = getRepository(User);

//   const notification = await Message.create({
//     title,
//     body,
//     user,
//     image: user?.profileImage,
//     type,
//     for: user?.id,
//   }).save();

//   if (!notification) {
//     return {
//       messages: ["Failed to create notification."],
//     };
//   }

//   return {
//     messages: ["Notification created successfully."],
//   };
// };