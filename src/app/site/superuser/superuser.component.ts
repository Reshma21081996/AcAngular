import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../signup/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.css']
})
export class SuperuserComponent implements OnInit {

  admins: User[];

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.authService.adminDetails().subscribe(
      (data)=>{this.admins=data;
      });
  }

  accept(user: User) {
    user.status="A";
    this.authService.response(user).subscribe(
      data=> {user=data});
  }

  decline(user: User) {
    user.status="D";
    this.authService.response(user).subscribe(
      data=> {user=data});
  }

}
