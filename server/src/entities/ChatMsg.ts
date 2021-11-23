import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { SharedEntity } from './SharedEntity';
import { User } from './User';
import { Chat } from './Chat';

@Entity({ name: 'ChatMsgs' })
export class ChatMsg extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('boolean', { name: 'IsRead', default: false, nullable: false })
  isRead: boolean;

  @Column('varchar', { name: 'Body', length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user: User) => user.senderChats)
  sender: User;

  @ManyToOne(() => User, (user: User) => user.receiverChats)
  receiver: User;

  @ManyToOne(() => Chat, (chat: Chat) => chat.chatMsgs)
  chat: Chat;
}
