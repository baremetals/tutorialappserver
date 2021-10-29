import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "PostPoints" })
export class PostPoint extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @Column("boolean", { name: "IsDecrement", default: false, nullable: false })
  isDecrement: boolean;

  @ManyToOne(() => User, (user) => user.postPoints)
  user: User;

  @ManyToOne(() => Post, (post) => post.postPoints)
  post: Post;
}