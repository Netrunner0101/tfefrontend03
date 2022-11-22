import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../Service/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  CustomerData: any = [];

  constructor(private cusServ: CustomerService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Customer data : "+ this.CustomerData);
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

  deleteCustomer(id_customer:any){
    this.cusServ.delete(id_customer);
    window.location.reload();
  }
}
