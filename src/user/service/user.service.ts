import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { PhoneNumberRepository } from '../repository/phonenumber.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(PhoneNumberRepository) private phoneNumberRepository: PhoneNumberRepository,
  ) { }

  async createNewUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: id },
      relations: ['phoneNumbers']
    });
    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.userRepository.merge(userToUpdate, dto);
    return await this.userRepository.save(userToUpdate);
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.createQueryBuilder('u')
      .leftJoinAndSelect('u.phoneNumbers', 'ph')
      .getMany();
  }

  async getUserById(id): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['phoneNumbers']
    });
  }
  async getPhoneNumberById(id: number) {
    const phonenumber_user = await this.phoneNumberRepository.findOne
      ({
        where: { id: id },
        relations: ['user']
      });
    if (phonenumber_user) {
      return phonenumber_user;
    }
    throw new NotFoundException(id);
  }
 
}