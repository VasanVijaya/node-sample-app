import { DataSource,Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PhoneNumber } from '../entity/phonenumber.entity';
@Injectable()
export class PhoneNumberRepository extends Repository<PhoneNumber>{
    constructor(private dataSource: DataSource) {
        super(PhoneNumber, dataSource.createEntityManager());
      }
}