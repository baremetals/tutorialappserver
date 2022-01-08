import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length } from "class-validator";
import { Post } from "./Post"
import { PostPoint } from "./PostPoint";
import { Comment } from "./Comment";
import { Student } from "./Student";
import { Book } from "./Book";
import { Course } from "./Course";
import { Message } from "./Message";
import { Video } from "./Video";
import { SharedEntity, UserRole } from "./SharedEntity";
import { Chat } from './Chat';
import { ChatMsg } from './ChatMsg';


@Entity({ name: 'Users' })
export class User extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('varchar', {
    name: 'UserIdSlug',
    length: 250,
    unique: true,
    nullable: false,
  })
  userIdSlug: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column('varchar', {
    name: 'Email',
    length: 120,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    name: 'UserName',
    length: 60,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column('varchar', {
    name: 'FullName',
    length: 60,
    nullable: false,
  })
  fullName: string;

  @Column('varchar', {
    name: 'description',
    length: 120,
    unique: false,
    default: '',
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    name: 'Location',
    length: 120,
    default: 'London',
    nullable: false,
  })
  location: string;

  @Column('varchar', { name: 'Password', length: 100, nullable: false })
  @Length(8, 100)
  password: string;

  @Column('varchar', {
    name: 'ProfileImage',
    length: 250,
    nullable: false,
  })
  profileImage: string;

  @Column('varchar', {
    name: 'BackgroundImage',
    length: 250,
    nullable: true,
  })
  backgroundImg: string;

  @Column('boolean', { name: 'Confirmed', default: false, nullable: false })
  confirmed: boolean;

  @Column('boolean', { name: 'IsDisabled', default: false, nullable: false })
  isDisabled: boolean;

  @Column('boolean', { name: 'IsOnline', default: false, nullable: false })
  isOnline: boolean;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => PostPoint, (postPoint) => postPoint.user)
  postPoints: PostPoint[];

  // This represents the total courses the user is taking. So each course will have the users student identity.
  @OneToMany(() => Student, (student) => student.user)
  myCourses: Student[];

  @OneToMany(() => Book, (book) => book.adminUser)
  books: Book[];

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Video, (video) => video.teacher)
  videos: Video[];

  @OneToMany(() => Chat, (chat) => chat.owner)
  ownerChats: Chat[];

  @OneToMany(() => Chat, (chat) => chat.recipient)
  recipientChats: Chat[];

  @OneToMany(() => ChatMsg, (chatMsg) => chatMsg.sender)
  senderChats: ChatMsg[];

  @OneToMany(() => ChatMsg, (chatMsg) => chatMsg.receiver)
  receiverChats: ChatMsg[];
}