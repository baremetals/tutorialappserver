import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";

@Entity({ name: "Messages" })
export class Message extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "From",
    default: "Baremetals",
    length: 150,
    nullable: false,
  })
  from: string;

  @Column("varchar", {
    name: "Image",
    default: "BM",
    length: 250,
    nullable: false,
  })
  image: string;

  @Column("boolean", { name: "IsRead", default: false, nullable: false })
  isRead: boolean;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @Column("varchar", { name: "Type", length: 100, nullable: false })
  @Length(5, 150)
  type: string;

  @ManyToOne(() => User, (user: User) => user.messages)
  user: User;
}