import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Length } from "class-validator";
import { Post } from "./Post"
import { Like } from "./Like";
import { SharedEntity } from "./SharedEntity";
import { Book } from "./Book";
import { Course } from "./Course";
import { CourseStudent } from "./CourseStudent";
import { Recommendation } from "./Recommendation";
import { CourseNote } from "./CourseNote";

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
  userName: string;

  @Column("varchar", {
    name: "FullName",
    length: 60,
    unique: true,
    nullable: false,
  })
  fullName: string;

  @Column("varchar", { name: "Password", length: 100, nullable: false })
  @Length(8, 100)
  password: string;

  @Column("boolean", { name: "Confirmed", default: false, nullable: false })
  confirmed: boolean;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("boolean", { name: "IsAdmin", default: false, nullable: false })
  isAdmin: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.user)
  courseStudents: CourseStudent[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];

  @OneToMany(() => CourseNote, (courseNote) => courseNote.user)
  courseNotes: CourseNote[];
}