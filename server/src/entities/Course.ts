import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { SharedEntity } from "./SharedEntity";
import { Student } from "./Student";
import { Category } from "./Category";
import { User } from "./User";
import {Comment } from "./Comment";
import { Note } from "./Note";

@Entity({ name: "Courses" })
export class Course extends SharedEntity {
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
    name: "Duration",
    length: 100,
    unique: false,
    nullable: false,
  })
  duration: string;

  @Column("varchar", {
    name: "Description",
    length: 2500,
    unique: false,
    nullable: false,
  })
  description: string;

  @Column("varchar", {
    name: "Image",
    length: 250,
    unique: false,
    nullable: false,
  })
  image: string;

  @Column("varchar", {
    name: "StartDate",
    length: 100,
    unique: false,
    nullable: false,
  })
  startDate: string;

  @Column("varchar", {
    name: "EndDate",
    length: 100,
    unique: false,
    nullable: false,
  })
  endDate: string;

  @Column("int", { name: "TotalStudents", default: 0, nullable: false })
  totalStudents: number;

  @ManyToOne(() => User, (user: User) => user.courses)
  adminUser: User;

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];

  @ManyToOne(() => Category, (category) => category.courses)
  category: Category;

  @OneToMany(() => Comment, (comments) => comments.course)
  comments: Comment[];

  @OneToMany(() => Note, (notes) => notes.course)
  notes: Note[];
}