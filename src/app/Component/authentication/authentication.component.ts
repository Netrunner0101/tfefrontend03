import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Service/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private auth:AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  userForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public login():void{
    const user= {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    }
    console.log(this.userForm.value)
    return this.auth.login(user);
  }

  public logout(){
    this.auth.logout();
    location.reload();
  }


}
