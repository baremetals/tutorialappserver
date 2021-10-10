import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "Likes" })
export class Like extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @Column("boolean", { name: "IsDecrement", default: false, nullable: false })
  isDecrement: boolean;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}