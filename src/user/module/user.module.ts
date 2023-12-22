import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { PhoneNumberService } from '../service/phonenumber.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { PhoneNumberRepository } from '../repository/phonenumber.repository';
import { PhoneNumberController } from '../controller/phonenumber.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, PhoneNumberRepository]), UserModule],
  controllers: [UserController, PhoneNumberController],
  providers: [UserService, PhoneNumberService, UserRepository, PhoneNumberRepository],
})
export class UserModule {}