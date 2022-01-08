import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./Course";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";

@Entity({ name: 'Vide0s' })
export class Video extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('boolean', { name: 'IsDisabled', default: false, nullable: false })
  isDisabled: boolean;

  @Column('varchar', { name: 'Title', length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column('varchar', { name: 'URL', length: 100, nullable: false })
  @Length(5, 150)
  url: string;

  @Column('varchar', { name: 'Description', length: 2500, nullable: true })
  @Length(10, 2500)
  description: string;

  @ManyToOne(() => User, (user: User) => user.videos)
  teacher: User;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;
}