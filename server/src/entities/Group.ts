import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";
import { SharedEntity } from "./SharedEntity";
// import { User } from "./User";

@Entity({ name: "Groups" })
export class Group extends SharedEntity {
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

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  // @OneToMany(() => User, (user) => user.group)
  // users: User[];
}

