import { Injectable, flatten } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhoneNumberDto } from '../dto/create-phonenumber.dto';
import { PhoneNumber } from '../entity/phonenumber.entity';
import { PhoneNumberRepository } from '../repository/phonenumber.repository';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumberRepository)
    @InjectRepository(UserRepository)
    private phonenumberRepository: PhoneNumberRepository,
    private userRepository: UserRepository,
  ) { }

  async findPhoneNumbersByUserId(id: number): Promise<PhoneNumber[]> {
    return await this.phonenumberRepository.find
      ({
        where: { user: { id: id } },
        select: { number: true }
      });
  }

  async createPhoneNumber(phonenumber: CreatePhoneNumberDto, user: User,): Promise<PhoneNumber> {
    const newPhoneNumber = await this.phonenumberRepository.save({ number: phonenumber.number, });
    user.phoneNumbers = [...user.phoneNumbers, newPhoneNumber];
    await this.userRepository.save(user);
    return newPhoneNumber;
  }

}