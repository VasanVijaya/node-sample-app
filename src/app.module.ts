import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module/user.module';
import { UserService } from './user/service/user.service';
import { User } from './user/entity/user.entity';
import PhoneNumber from './user/entity/phonenumber.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:5432,
        password: 'simform',
        username:'postgres',
        entities:[User, PhoneNumber],
        database:'pgWithNest',
        synchronize:true,
        logging:true,
      }),
      UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
