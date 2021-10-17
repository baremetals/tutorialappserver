import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "CourseStudents" })
export class CourseStudent extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @ManyToOne(() => User, (user) => user.courseStudents)
  user: User;

  @ManyToOne(() => Course, (course) => course.courseStudents)
  course: Course;
}
