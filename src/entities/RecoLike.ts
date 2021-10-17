import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recommendation } from "./Recommendation";
import { SharedEntity } from "./SharedEntity";

@Entity({ name: "RecoLikes" })
export class RecoLike extends SharedEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
  id: string;

  @Column("boolean", { name: "IsDecrement", default: false, nullable: false })
  isDecrement: boolean;

  @ManyToOne(() => User, (user) => user.recoLikes)
  user: User;

  @ManyToOne(() => Recommendation, (recommendation) => recommendation.recoLikes)
  recommendation: Recommendation;
}
