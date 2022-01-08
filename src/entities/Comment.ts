import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Post } from "./Post";
import { SharedEntity } from "./SharedEntity";
// import { Course } from "./Course";
// import { Note } from "./Note";

@Entity({ name: "Comments" })
export class Comment extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // @ManyToOne(() => Course, (course) => course.comments)
  // course: Course;

  // @ManyToOne(() => Note, (note) => note.comments)
  // note: Note;
}
