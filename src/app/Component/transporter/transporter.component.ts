import { Component, OnInit } from '@angular/core';
import {TransporterService} from "../../Service/transporter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transporter',
  templateUrl: './transporter.component.html',
  styleUrls: ['./transporter.component.css']
})
export class TransporterComponent implements OnInit {

  TransporterData: any = [];

  constructor(private tranServ:TransporterService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Customer data : "+ this.TransporterData);
    this.AllTransporter();
  }

  AllTransporter(){
    this.tranServ.AllTransporter().subscribe((data: { })=>{
      console.log("Service Data:" + data);
      this.TransporterData = data;
      console.log("Transporter Data from service :" + this.TransporterData);
    })
  }

  deleteTransporter(id_transporter:any){
    this.tranServ.delete(id_transporter);
    window.location.reload();
  }
}
