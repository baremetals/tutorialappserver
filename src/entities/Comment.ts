import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Post } from "./Post";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "Comments" })
export class Comment extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
