import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../Service/warehouse.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  WhData: any = [];

  constructor(private whServ:WarehouseService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Customer data : "+ this.WhData);
    this.AllWarehouse();
  }

  AllWarehouse(){
    this.whServ.AllWarehouse().subscribe((data: { })=>{
      console.log("Service Data:" + data);
      this.WhData = data;
      console.log("Transporter Data from service :" + this.WhData);
    })
  }

  deleteWarehouse(id_warehouse:any){
    this.whServ.delete(id_warehouse);
  }

}
