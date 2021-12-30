import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Course } from './Course';
import { Post } from './Post';

import { SharedEntity } from "./SharedEntity";
import { User } from './User';

@Entity({ name: 'Searches' })
export class Search extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('int', { name: 'SearchCount', default: 0, nullable: false })
  searchCount: number;

  @OneToMany(() => User, (user) => user.search)
  users: User[];

  @OneToMany(() => Post, (post) => post.search)
  posts: Post[];

  @OneToMany(() => Course, (course) => course.search)
  courses: Course[];
}