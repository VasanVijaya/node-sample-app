import{Body, Controller, Get, Post, Param} from '@nestjs/common';
import { CreatePhoneNumberDto } from '../dto/create-phonenumber.dto';
import { PhoneNumber } from '../entity/phonenumber.entity';
import { UserService } from '../service/user.service';
import { PhoneNumberService } from '../service/phonenumber.service';

@Controller('phonenumber')
export class PhoneNumberController{
    constructor(
        private phoneNumberService: PhoneNumberService,
        private userService: UserService,
      ) {}
    
      @Post('')
      async savePhoneNumber(@Body() phoneNumber: CreatePhoneNumberDto): Promise<PhoneNumber> {
        const user = await this.userService.getUserById(phoneNumber.userid);
        console.log(user);
        return await this.phoneNumberService.createPhoneNumber(phoneNumber, user);
      }

      @Get(':id')
      find(@Param('id') id: string):Promise<PhoneNumber[]> {
        return this.phoneNumberService.findPhoneNumbersByUserId(+id);
      }
    }