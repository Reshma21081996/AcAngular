import { Component } from '@angular/core';
import { AuthServiceService } from './site/auth-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from './site/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn:boolean = false;
  role: string;

  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['search-bar']);
  }
  constructor(public router: Router,private authService:AuthServiceService, 
    private userService: UserServiceService) /* private menuItemService:MenuItemService, */ {  
  }

  
loggedIn():boolean {
    if(!this.authService.loggedInUser.loggedOut){
      this.isLoggedIn = true;
      this.role=this.userService.userRole;
      return true
    }
    else{
      this.isLoggedIn = false;
      this.role=this.userService.userRole;
      return false;
    }
  }
 /* clickOnAddCart(){
    this.clickedOnAdd = false;
    this.addedToCart = false;
  } */
}
