import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../Service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  // Initial formgroup
  newCustomerForm= new FormGroup({
    name : new FormControl('', [Validators.required]) ,
    vat : new FormControl('', [Validators.required]) ,
    // Unique Number
    adress : new FormControl('', [Validators.required]) ,
    city :new FormControl('', [Validators.required])  ,
    postal_code : new FormControl('', [Validators.required]) ,
    email : new FormControl('', [Validators.required]) ,
    phoneNumber : new FormControl('', [Validators.required]) ,
  });

  constructor(private cusServ: CustomerService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  createCustomer(){
    const newCustomer = {
      name :  this.newCustomerForm.value.name ,
      vat :  this.newCustomerForm.value.vat ,
      adress :  this.newCustomerForm.value.adress ,
      city : this.newCustomerForm.value.city  ,
      postal_code :  this.newCustomerForm.value.postal_code ,
      email :  this.newCustomerForm.value.email ,
      phoneNumber :  this.newCustomerForm.value.phoneNumber ,
    }
    if(!this.newCustomerForm.valid){
      alert('La form customer est invalide, veuillez remplir tous les champs requis.')
      window.location.reload();
    }else {
      this.cusServ.create(newCustomer);
      console.log("New delivery create"+ newCustomer)
      this.router.navigate(['/customer']).then(() => {
        window.location.reload();
      });
    }
  }

}
