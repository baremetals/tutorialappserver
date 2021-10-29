import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "CourseStudents" })
export class CourseStudent extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @Column("boolean", { name: "HasJoined", default: false, nullable: false })
  hasJoined: boolean;

  @ManyToOne(() => User, (user) => user.courseStudents)
  student: User;

  @ManyToOne(() => Course, (course) => course.courseStudents)
  course: Course;
}
