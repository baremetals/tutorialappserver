import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Comment } from "./Comment";
import { PostPoint } from "./PostPoint";
import { Category } from "./Category";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: 'Posts' })
export class Post extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: string;

  @Column('varchar', {
    name: 'Slug',
    length: 500,
    // unique: true,
    nullable: true,
  })
  slug: string;

  @Column('int', { name: 'Views', default: 0, nullable: false })
  views: number;

  @Column('int', { name: 'Points', default: 0, nullable: false })
  points: number;

  @Column('boolean', { name: 'IsDisabled', default: false, nullable: false })
  isDisabled: boolean;

  @Column('varchar', { name: 'Title', length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column('varchar', { name: 'Body', length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  creator: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];

  @OneToMany(() => PostPoint, (postPoint) => postPoint.post)
  postPoints: PostPoint[];

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
}
