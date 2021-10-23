import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";

@Entity({ name: "Books" })
export class Book extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Title",
    length: 250,
    unique: false,
    nullable: false,
  })
  title: string;

  @Column("varchar", {
    name: "Image",
    length: 250,
    unique: false,
    nullable: false,
  })
  image: string;

  @Column("varchar", {
    name: "Description",
    length: 2500,
    unique: false,
    nullable: false,
  })
  description: string;

  @Column("varchar", {
    name: "Author",
    length: 250,
    unique: false,
    nullable: false,
  })
  author: string;

  @Column("varchar", {
    name: "Link",
    length: 500,
    unique: true,
    nullable: false,
  })
  link: string;

  @ManyToOne(() => User, (user: User) => user.books)
  user: User;

  @ManyToOne(() => Category, (category) => category.courses)
  category: Category;
}