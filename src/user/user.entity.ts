import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users', {})
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false, name: 'email' })
  email: string;

  @Column({ nullable: false, name: 'password' })
  password: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'status' })
  roles: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}

