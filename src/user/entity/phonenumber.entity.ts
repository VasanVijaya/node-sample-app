import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {User} from './user.entity';

@Entity('phonenumber')
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  number: string;

  @ManyToOne(() => User, (user) => user.phoneNumbers)
  user: User;
}

export default PhoneNumber;