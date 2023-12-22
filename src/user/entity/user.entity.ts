import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {PhoneNumber} from './phonenumber.entity';
 
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ type: 'varchar', length: 30 })
  username: string;
 
  @Column({ type: 'varchar', length: 15 })
  name: string;
 
  @Column({ type: 'varchar', length: 20 })
  password: string;

  @OneToMany(() => PhoneNumber, (phonenumber) => phonenumber.user, { cascade: true })
  phoneNumbers: PhoneNumber[];

}
 
export default User;