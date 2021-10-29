import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { SharedEntity } from "./SharedEntity";
import { User } from "./User";

@Entity({ name: "Notifications" })
export class Notification extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", { name: "For", length: 150, nullable: true })
  for: string;

  @Column("varchar", { name: "Image", length: 150, nullable: true })
  image: string;

  @Column("boolean", { name: "IsRead", default: false, nullable: false })
  isRead: boolean;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "NoticeType", length: 100, nullable: false })
  @Length(5, 150)
  NoticeType: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user: User) => user.notifications)
  user: User;
}