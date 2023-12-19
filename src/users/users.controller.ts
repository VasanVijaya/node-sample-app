import { Controller, Post, Get, Patch, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}
    @Post()
    addUser(
        @Body('id') id:number, 
        @Body('name') name: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('phoneNumbers') phoneNumbers:[string]
        ): any {
       const newUser = this.usersService.addUser(id, name, username, password, phoneNumbers);
       return newUser;
    }

    @Get()
    getUsersList(){
        return this.usersService.getUsersList();
    }

    @Get(':id')
    getUser(@Param('id')id: number){
        return this.usersService.getUser(id);
    }

    @Patch(':id')
    updateUser(
        @Param('id') id:number,        
        @Body('name') name: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('phoneNumbers') phoneNumbers:[string]){
            const updatedUser = this.usersService.updateUser(id, name, username, password, phoneNumbers);
            return updatedUser;
    }
}