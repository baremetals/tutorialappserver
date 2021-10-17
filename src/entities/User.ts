import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Length } from "class-validator";
import { Post } from "./Post"
import { Like } from "./Like";
import { SharedEntity } from "./SharedEntity";
import { Comment } from "./Comment";
import { CourseStudent } from "./CourseStudent";
import { RecoLike } from "./RecoLike";

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
    nullable: false,
  })
  backgroundImg: string;

  @Column("boolean", { name: "Confirmed", default: false, nullable: false })
  confirmed: boolean;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("boolean", { name: "IsAdmin", default: false, nullable: false })
  isAdmin: boolean;

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
}