import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../Service/customer.service";
import {FormControl, FormGroup} from "@angular/forms";
import {dateLessThan} from "../../validators/dateValidator";
import {unique} from "../../validators/form.validator";

@Component({
  selector: 'app-customerid',
  templateUrl: './customerid.component.html',
  styleUrls: ['./customerid.component.css']
})
export class CustomeridComponent implements OnInit {

  id_customer:number = <number>{} ;
  customer:any = [];

  CustomerData: any = [];

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
  }, {validators:dateLessThan(this.CustomerData,'vat')}  );

  constructor(private cusServ: CustomerService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_customer = params['id_customer'];
        this.getCustomerById(this.id_customer);
      }
    )
    this.allCustomer();
  }

  allCustomer(){
    return this.cusServ.AllCustomer().subscribe(
      (data: { })=>{
        console.log("Service Data:" + data);
        this.CustomerData = data;
        console.log("Delivery data from service :" + this.CustomerData);
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
    if(!this.updateCustomerForm.valid){
      alert('La form customer est invalide, veuillez remplir tous les champs requis.')
      window.location.reload();
    }else {
      this.cusServ.update(this.id_customer,updateCustomer).subscribe(
        (data)=> {
          console.log("Success : " + data)
          window.location.reload();
        },
        (error)=>{
          console.log("Error : " + error);
          alert("Error, mise à jour de Customer est Impossible, veuillez corriger le formulaire");
          window.location.reload();
        }
      );
    }
    /*
    this.cusServ.update(this.id_customer,updateCustomer);
    console.log("Update Delivery form data: ", updateCustomer);
    console.log("This id Delivery : ", this.id_customer);
    */
  }


}
