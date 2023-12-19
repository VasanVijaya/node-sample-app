import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  getHello(): any{
    return {name:'Vijaya'}
  }
}
