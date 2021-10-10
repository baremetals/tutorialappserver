import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "PostCategories" })
export class PostCategory extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @Column("varchar", {
    name: "Name",
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    name: "Description",
    length: 150,
    nullable: true,
  })
  description: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
