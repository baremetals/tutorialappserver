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
