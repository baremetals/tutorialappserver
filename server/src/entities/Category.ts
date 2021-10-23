import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./Book";
import { Course } from "./Course";
import { Post } from "./Post";
import { Recommendation } from "./Recommendation";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "Categories" })
export class Category extends SharedEntity {
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

  @OneToMany(() => Recommendation, (recommendation) => recommendation.category)
  recommendations: Recommendation[];

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
