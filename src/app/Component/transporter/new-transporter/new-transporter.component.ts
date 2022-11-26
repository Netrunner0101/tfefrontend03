import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransporterService} from "../../../Service/transporter.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-transporter',
  templateUrl: './new-transporter.component.html',
  styleUrls: ['./new-transporter.component.css']
})
export class NewTransporterComponent implements OnInit {


  // Initial formgroup
  newTransporterForm= new FormGroup({
    name : new FormControl('',[Validators.required]) ,
    adress : new FormControl('',[Validators.required]) ,
    city : new FormControl('',[Validators.required]) ,
    postal_code : new FormControl('',[Validators.required])  ,
    email : new FormControl('',[Validators.required]) ,
    phoneNumber : new FormControl('',[Validators.required]) ,
  });

  constructor(private tranServ: TransporterService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  createTransporter(){
    const newTransporter = {
      name : this.newTransporterForm.value.name ,
      adress : this.newTransporterForm.value.adress ,
      city : this.newTransporterForm.value.city ,
      postal_code : this.newTransporterForm.value.postal_code  ,
      email : this.newTransporterForm.value.email ,
      phoneNumber : this.newTransporterForm.value.phoneNumber ,
    }
    if(!this.newTransporterForm.valid){
      alert('La form transporter est invalide, veuillez remplir tous les champs requis.')
      window.location.reload();
    }else {
      this.tranServ.create(newTransporter).subscribe(
        (data)=> {
          console.log("Success : " + data)
          this.router.navigate(['/transporter']).then(() => {
            window.location.reload();
          });
        },
        (error)=>{
          console.log("Error : " + error);
          alert("Error, sauvegarde d'une nouvelle donnée Transporter est Impossible, veuillez corriger le formulaire");
          window.location.reload();
        }
      );
    }
  }
}
