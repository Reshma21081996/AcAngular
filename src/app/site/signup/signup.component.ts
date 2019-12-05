import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './User';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUp: boolean;
  choice=["male","female"];
  
  constructor(private formBuilder:FormBuilder,private userService:UserServiceService, private authService: AuthServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.authService.type = this.route.snapshot.paramMap.get('type');
    this.signUpForm = this.formBuilder.group({
      userId : ['',[
        Validators.required,
        this.isUsernameTaken
      ]],
      firstName:['',[
        Validators.required
      ]],
      lastName:['',[
        Validators.required
      ]],
      password:['',[
        Validators.required
      ]],
      age:['',[
        Validators.required
      ]],
      gender:['',[
        Validators.required
      ]],
      contactNumber:['',[
        Validators.required
      ]],
      userType:['',[
        Validators.required
      ]],
      confirmPassword:['',[
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]]
    })
  }
  get userId() {
    return this.signUpForm.get('userId');
  }
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get age() {
    return this.signUpForm.get('age');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  get contactNumber() {
    return this.signUpForm.get('contactNumber');
  }
  get userType() {
    return this.signUpForm.get('userType');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }
  isUsernameTaken(formControl: FormControl): { [s: string]: boolean } {
      if (formControl.value === 'admin') {
          return { 'userNameTaken': true };
        } else {
          return null;
        }
      }

      addUser(users : User){
       // let user:User = {userId:this.signUpForm.value["userId"],firstname:this.signUpForm.value["firstname"],lastname:this.signUpForm.value["lastname"],
       // age:this.signUpForm.value["age"],gender:this.signUpForm.value["gender"],contactNumber:this.signUpForm.value["contactNumber"],userType:this.signUpForm.value["userType"],
      //  password:this.signUpForm.value["password"],confirmPassword:this.signUpForm.value["confirmPassword"]}
    console.log(users);
        this.authService.addUser(users).subscribe(
          data => {
            if(data) {
              console.log("logged");
              this.router.navigate(['login'])
            }
            else {
              alert('Already exist');
              this.router.navigate(['signup'])
            }
          });
      }
      
}
