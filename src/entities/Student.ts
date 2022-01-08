import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: 'Students' })
export class Student extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' }) // for typeorm
  id: string;

  @Column('boolean', { name: 'HasJoined', default: false, nullable: false })
  hasJoined: boolean;

  @ManyToOne(() => User, (user) => user.myCourses)
  user: User;

  @ManyToOne(() => Course, (course) => course.students)
  course: Course;
}
