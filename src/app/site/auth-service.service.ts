import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../site/signup/User';
import { ProductServiceService } from '../services/product-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loggedInUser={loggedOut:true};
  validCredentials:boolean = true;
  accessToken: string; 
  redirectUrl = '/';
  loggedIn:boolean = false;
  private authenticationApiUrl = environment.baseUrl;
  private token: string;
  log: boolean = true;
  id: number;
  type: string;
  isAdmin: boolean = false;

  constructor(private userService:UserServiceService,public router: Router,private httpClient:HttpClient) /* private menuItemService:MenuItemService, */ { }

  
 authenticate(userId: string, password: string): Observable<any>{
   let credentials=btoa(userId + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.httpClient.get('http://localhost:8083/authentication-service/authenticate', {headers});
  }


  
  public setToken(token: string) {
    //this.menuItemService.setToken(token);
    this.token = token;
  }
  public getToken() {
    return this.token;
  }

  public setId(id: number) {
    this.id = id;
  }
  public getId() {
    return this.id;
  }

  authenticateUser(user) {
       this.authenticate(user.userId,user.password).subscribe(
         (data)=>{
        this.loggedInUser = user;
        this.validCredentials = true;
        this.userService.userRole = data.role;
        console.log(this.userService.userRole);
        this.userService.userId = data.username;
      if(this.userService.userRole == 'A'){
         this.isAdmin = true;
       }
      else{
        this.isAdmin = false;
      }
       this.loggedIn = true;
        //this.menuItemService.isLoggedIn = true;
        this.setToken(data.token);
        console.log(data.token);
        console.log(this.token);
        //this.menuItemService.addCartItem(this.userService.userId, this.id).subscribe(
       //   data => {});
        if(this.userService.userRole=='superuser')
        this.router.navigate(['superuser']);
        else this.router.navigate(['search-bar']);
         },
         
      (error)=>{
        this.validCredentials = false;
      })
    }
  logout() {
    this.loggedInUser = {loggedOut:true};
   this.isAdmin = false;
    this.loggedIn = false;
   // this.productService.isLoggedIn = false;
   // this.menuItemService.clickedOnAdd = false;
   // this.menuItemService.addedToCart = false;
   this.setToken(null);
    this.router.navigate(['login']);
  }

  addUser(user:User) {
    if(this.type=="A")
      return this.httpClient.post<User>('http://localhost:8083/authentication-service/user/A',user); 
    else 
    return this.httpClient.post<User>('http://localhost:8083/authentication-service/user/U',user);
  }

  adminDetails():Observable<User[]> {
    let headers = new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.getToken());
    return this.httpClient.get<User[]>('http://localhost:8083/authentication-service/user/A',{headers});
  }
  
  response(user: User):Observable<User> {
    let headers = new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.getToken());
    return this.httpClient.put<User>('http://localhost:8083/authentication-service/user',user,{headers});
  }

}