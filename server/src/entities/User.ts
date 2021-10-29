import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Length } from "class-validator";
import { Post } from "./Post"
import { PostPoint } from "./PostPoint";
import { Comment } from "./Comment";
import { CourseStudent } from "./CourseStudent";
import { Book } from "./Book";
import { Course } from "./Course";
import { Notification } from "./Notifications";
import { CourseNote } from "./CourseNote";
import { Group } from "./Group";
import { SharedEntity } from "./SharedEntity";
// import { Group } from "./Group";

@Entity({ name: "Users" })
export class User extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Email",
    length: 120,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    name: "UserName",
    length: 60,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column("varchar", {
    name: "FullName",
    length: 60,
    unique: false,
    nullable: false,
  })
  fullName: string;

  @Column("varchar", { name: "Password", length: 100, nullable: false })
  @Length(8, 100)
  password: string;

  @Column("varchar", {
    name: "ProfileImage",
    length: 250,
    nullable: false,
  })
  profileImage: string;

  @Column("varchar", {
    name: "BackgroundImage",
    length: 250,
    nullable: true,
  })
  backgroundImg: string;

  @Column("boolean", { name: "Confirmed", default: false, nullable: false })
  confirmed: boolean;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  // @ManyToOne(() => Group, (group: Group) => group.users)
  // group: Group;

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => PostPoint, (postPoint) => postPoint.user)
  postPoints: PostPoint[];

  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.student)
  courseStudents: CourseStudent[];

  @OneToMany(() => Book, (book) => book.adminUser)
  books: Book[];

  @OneToMany(() => Course, (course) => course.adminUser)
  courses: Course[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => CourseNote, (courseNote) => courseNote.user)
  courseNotes: CourseNote[];
}