import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { SharedEntity } from "./SharedEntity";
import { CourseStudent } from "./CourseStudent";
import { Category } from "./Category";
import { User } from "./User";

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

  @ManyToOne(() => User, (user: User) => user.courses)
  user: User;

  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.course)
  courseStudents: CourseStudent[];

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;
}