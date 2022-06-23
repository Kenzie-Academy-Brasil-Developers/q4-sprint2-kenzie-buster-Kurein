import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Dvd } from "./dvd.entity";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column("float")
  total: number;

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne((type) => Dvd, { eager: true })
  @JoinColumn()
  dvd: Dvd;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
