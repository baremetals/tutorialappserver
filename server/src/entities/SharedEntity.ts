import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Length } from 'class-validator';

export class SharedEntity extends BaseEntity {
  @Column("varchar", {
    name: "CreatedBy",
    length: 60,
    default: () => `getpgusername()`,
    nullable: false,
  })
  createdBy: string;

  @Column("timestamp with time zone", {
    name: "CreatedOn",
    default: () => `now()`,
    nullable: false,
  })
  createdOn: Date;

  @Column("varchar", {
    name: "LastModifiedBy",
    length: 60,
    default: () => `getpgusername()`,
    nullable: false,
  })
  lastModifiedBy: string;

  @Column("timestamp with time zone", {
    name: "LastModifiedOn",
    default: () => `now()`,
    nullable: false,
  })
  lastModifiedOn: Date;
}

@Entity({ name: 'Supports' })
export class Support extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('varchar', {
    name: 'FullName',
    length: 60,
    nullable: false,
  })
  fullName: string;

  @Column('varchar', {
    name: 'UserName',
    length: 60,
    nullable: true,
  })
  username: string;

  @Column('varchar', {
    name: 'Email',
    length: 120,
    nullable: false,
  })
  email: string;

  @Column('varchar', { name: 'Title', length: 150, nullable: false })
  @Length(5, 150)
  subject: string;

  @Column('varchar', { name: 'Body', length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;
}

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'tutor',
  STUDENT = 'student',
}