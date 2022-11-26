import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../Service/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  newUserForm= new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Password : new FormControl('', [Validators.required]),
  });

  registerUser(){
    const newUser = {
      firstname: this.newUserForm.value.firstname,
      lastname: this.newUserForm.value.lastname,
      Username: this.newUserForm.value.Username,
      Email: this.newUserForm.value.Email,
      Password: this.newUserForm.value.Password,
    }
    this.auth.register(newUser).subscribe(
      (data)=> {
        console.log("Success : " + data)
        this.router.navigate(['login']);
      },
      (error)=>{
        console.log("Error : " + error);
        alert("Error, sauvegarde d'un nouveau User est Impossible, veuillez corriger le formulaire");
        window.location.reload();
      }
    );
    /*
    this.auth.register(newUser);
    console.log("New user create"+newUser);
    this.router.navigate(['delivery']);

     */
  }

}
