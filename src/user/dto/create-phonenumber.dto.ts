import { IsNotEmpty, Length } from "class-validator";

export class CreatePhoneNumberDto{
    id?:number;
    
    @IsNotEmpty()
    @Length(10)
    number:string;

    @IsNotEmpty()
    userid:number;
}