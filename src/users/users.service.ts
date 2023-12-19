import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UsersService{
    users: User[]=[];
    addUser(id:number, name: string, username: string, password:string, phoneNumbers:[string]){
        const newUser = new User(id, name, username, password, phoneNumbers);
        this.users.push(newUser);        
        return newUser;
    }

    getUsersList(){ 
        const [usersList] = [...this.users];
        delete usersList['password'];
        return usersList;
    }

    getUser(id: number){
        const user = this.findUser(id)[0];
        delete user['password'];
        return user;
    }

    updateUser(id: number,name: string, username: string, password: string, phoneNumbers: [string] ){
        const [user, index] = this.findUser(id);
        const updatedUser = {...user};
        if(id){
            updatedUser.name = name ? name : user.name;
            updatedUser.username = username ? username : user.username;
            updatedUser.phoneNumbers = phoneNumbers ? phoneNumbers : user.phoneNumbers;
            updatedUser.password = password ? password : user.password;
            this.users[index] = updatedUser;
        }
        return updatedUser;
    }

    private findUser(id: number): [User, number]{
        const userIndex = this.users.findIndex(user => user.id == id);
        const user = this.users[userIndex];
        if(!user)
            throw new NotFoundException('User not found');
        return [user, userIndex];
    }
}