import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Length } from "class-validator";
import { Post } from "./Post"
import { Like } from "./Like";
import { Comment } from "./Comment";
import { CourseStudent } from "./CourseStudent";
import { RecoLike } from "./RecoLike";
import { Book } from "./Book";
import { Course } from "./Course";
import { Recommendation } from "./Recommendation";
import { CourseNote } from "./CourseNote";
import { Group } from "./Group";
import { SharedEntity } from "./SharedEntity";
// import { Group } from "./Group";

@Entity({ name: "Users" })
export class User extends SharedEntity{
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

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.user)
  courseStudents: CourseStudent[];

  @OneToMany(() => RecoLike, (recoLike) => recoLike.user)
  recoLikes: RecoLike[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];

  @OneToMany(() => CourseNote, (courseNote) => courseNote.user)
  courseNotes: CourseNote[];
}