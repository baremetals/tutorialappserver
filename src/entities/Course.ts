import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";
import { CourseStudent } from "./CourseStudent";

@Entity({ name: "Courses" })
export class Course extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Title",
    length: 1000,
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
    length: 2500,
    unique: true,
    nullable: false,
  })
  author: string;

  @Column("varchar", {
    name: "StartDate",
    length: 2500,
    unique: true,
    nullable: false,
  })
  startDate: string;

  @ManyToOne(() => User, (user: User) => user.courses)
  user: User;

  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.course)
  courseStudents: CourseStudent[];
}