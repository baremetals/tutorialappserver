import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./Course";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";
// import { Comment } from "./Comment";



@Entity({ name: "Notes" })
export class Note extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "NoteType", length: 100, nullable: false })
  @Length(5, 150)
  noteType: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user: User) => user.notes)
  adminUser: User;

  @ManyToOne(() => Course, (course) => course.notes)
  course: Course;

  // @OneToMany(() => Comment, (comments) => comments.note)
  // comments: Comment[];
}