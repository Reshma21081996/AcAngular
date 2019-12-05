import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './signup/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userList=[
    {userId:"john15",firstName:"John",lastName:"Wick",password:"john15"},
    {userId:"admin",firstName:"Mehnaz",lastName:"Mariyam",password:"12345"}
  ];
  
  userRole: string;
  userId: string;
  //userType: string;
  constructor(private router:Router,private httpClient:HttpClient, private userService: UserServiceService) { }

  

  getUser(userId:string){
    let user = this.userList.filter((user)=>(user.userId==userId));
    return user[0];
  }
}
