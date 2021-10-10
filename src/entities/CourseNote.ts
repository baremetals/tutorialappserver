import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";


@Entity({ name: "CourseNotes" })
export class CourseNote extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("int", { name: "Views", default: 0, nullable: false })
  views: number;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "PostType", length: 100, nullable: false })
  @Length(5, 150)
  postType: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user: User) => user.courseNotes)
  user: User;
}