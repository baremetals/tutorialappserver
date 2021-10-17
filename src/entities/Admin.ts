import { Entity, OneToMany } from "typeorm";
import { Book } from "./Book";
import { Course } from "./Course";
import { Recommendation } from "./Recommendation";
import { CourseNote } from "./CourseNote";
import { User } from "./User";


@Entity({ name: "Admins" })
export class Admin extends User {
  
  @OneToMany(() => Book, (book) => book.admin)
  books: Book[];

  @OneToMany(() => Course, (course) => course.admin)
  courses: Course[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.admin)
  recommendations: Recommendation[];

  @OneToMany(() => CourseNote, (courseNote) => courseNote.admin)
  courseNotes: CourseNote[];

}