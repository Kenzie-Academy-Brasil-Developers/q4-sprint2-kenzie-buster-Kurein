import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { compare } from "bcrypt";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAdm: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
