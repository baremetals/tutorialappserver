import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { SharedEntity } from "./SharedEntity";


@Entity({ name: "Permissions" })
export class Permission extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Name",
    length: 120,
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    name: "CodeName",
    length: 60,
    unique: true,
    nullable: false,
  })
  codename: string;

}