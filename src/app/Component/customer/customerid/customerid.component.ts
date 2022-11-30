import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../Service/customer.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customerid',
  templateUrl: './customerid.component.html',
  styleUrls: ['./customerid.component.css']
})
export class CustomeridComponent implements OnInit {

  id_customer:number = <number>{} ;
  customer:any = [];

  panelOpenState = false;

  // Initial formgroup
  updateCustomerForm= new FormGroup({
    name : new FormControl('') ,
    vat : new FormControl('') ,
    adress : new FormControl('') ,
    city :new FormControl('')  ,
    postal_code : new FormControl('') ,
    email : new FormControl('') ,
    phoneNumber : new FormControl('') ,
  });

  constructor(private cusServ: CustomerService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_customer = params['id_customer'];
        this.getCustomerById(this.id_customer);
      }
    )
  }

  /*
  *   Get customer by Id
  * */
  getCustomerById(id_customer:number){
    this.cusServ.CustomerById(id_customer).subscribe(
      (data)=>{
        console.log(data);
        this.customer = data;
        this.updateCustomerForm.patchValue({
          name : this.customer.name ,
          vat : this.customer.vat ,
          adress : this.customer.adress ,
          city :this.customer.city  ,
          postal_code : this.customer.postal_code ,
          email : this.customer.email ,
          phoneNumber : this.customer.phoneNumber ,
        })
      })
    return this.customer;
  }

  updateCustomer(){
    const updateCustomer = {
      name : this.updateCustomerForm.value.name ,
      vat : this.updateCustomerForm.value.vat ,
      adress : this.updateCustomerForm.value.adress ,
      city :this.updateCustomerForm.value.city ,
      postal_code : this.updateCustomerForm.value.postal_code  ,
      email : this.updateCustomerForm.value.email  ,
      phoneNumber : this.updateCustomerForm.value.phoneNumber ,
    }
    this.cusServ.update(this.id_customer,updateCustomer);
    console.log("Update Delivery form data: ", updateCustomer);
    console.log("This id Delivery : ", this.id_customer);
  }


}
