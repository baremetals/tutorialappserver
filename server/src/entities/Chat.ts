import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SharedEntity } from './SharedEntity';
import { User } from './User';
import { ChatMsg } from './ChatMsg';

@Entity({ name: 'Chats' })
export class Chat extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @ManyToOne(() => User, (user: User) => user.ownerChats, { eager: true })
  owner: User;

  @ManyToOne(() => User, (user: User) => user.recipientChats)
  recipient: User;

  @OneToMany(() => ChatMsg, (chatMsg: ChatMsg) => chatMsg.chat)
  chatMsgs: ChatMsg[];
}
