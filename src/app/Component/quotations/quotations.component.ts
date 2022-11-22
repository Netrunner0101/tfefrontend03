import { Component, OnInit } from '@angular/core';
import {QuotationsService} from "../../Service/quotations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {

  QuData: any = [];

  constructor(private quServ:QuotationsService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Quotations data : "+ this.QuData);
    this.AllQuotations();
  }

  AllQuotations(){
    this.quServ.getAll().subscribe((data: { })=>{
      console.log("Service Data:" + data);
      this.QuData = data;
      console.log("Transporter Data from service :" + this.QuData);
    })
  }

  deleteQuotations(id_quotations:any){
    this.quServ.delete(id_quotations);
    window.location.reload();
  }

}
