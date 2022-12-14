import { Component } from '@angular/core';
import {AuthService} from "./Service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfefrontend03';

  constructor(private auth:AuthService, private router : Router) { }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
