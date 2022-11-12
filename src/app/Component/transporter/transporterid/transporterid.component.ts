import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TransporterService} from "../../../Service/transporter.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transporterid',
  templateUrl: './transporterid.component.html',
  styleUrls: ['./transporterid.component.css']
})
export class TransporteridComponent implements OnInit {


  id_transporter:number = <number>{} ;
  transporter:any = [];

  panelOpenState = false;

  // Initial formgroup
  updateTransporterForm= new FormGroup({
    name : new FormControl('') ,
    adress : new FormControl('') ,
    city : new FormControl('') ,
    postal_code : new FormControl('')  ,
    email : new FormControl('') ,
    phoneNumber : new FormControl('') ,
  });

  constructor(private transServ: TransporterService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_transporter = params['id_transporter'];
        this.getTransporterById(this.id_transporter);
      }
    )
  }

  /*
  *   Get customer by Id
  * */
  getTransporterById(id_transporter:number){
    this.transServ.TransporterById(id_transporter).subscribe(
      (data)=>{
        console.log(data);
        this.transporter = data;
        this.updateTransporterForm.patchValue({
          name : this.transporter.name ,
          adress : this.transporter.adress ,
          city : this.transporter.city ,
          postal_code : this.transporter.postal_code  ,
          email : this.transporter.email ,
          phoneNumber : this.transporter.phoneNumber ,
        })
      })
    return this.transporter;
  }

  updateTransporter(){
    const updateTransporter = {
      name : this.updateTransporterForm.value.name ,
      adress : this.updateTransporterForm.value.adress ,
      city : this.updateTransporterForm.value.city ,
      postal_code : this.updateTransporterForm.value.postal_code  ,
      email : this.updateTransporterForm.value.email ,
      phoneNumber : this.updateTransporterForm.value.phoneNumber ,
    }
    this.transServ.update(this.id_transporter,updateTransporter);
    console.log("Update Delivery form data: ", updateTransporter);
    console.log("This id Delivery : ", this.id_transporter);
  }

}
