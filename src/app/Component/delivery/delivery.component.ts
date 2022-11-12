import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Delivery} from "../../Models/Delivery";
import {DeliveryService} from "../../Service/delivery.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  DeliveryData: any = [];

  // columns we will show on the table
  public displayedColumns = [
    'N°de livraison',
    'number_package' ,
    'weight'   ,
    'dimension'  ,
    'departure_adress' ,
    'departure_city'  ,
    'departure_postal_code'   ,
    'destination_adress'  ,
    'destination_city' ,
    'destination_postal_code'  ,
    'outbout_date',
    'arrival_date' ,
    'remarks' ,
  ];
  //the source where we will get the data
  public deldataSource = new MatTableDataSource<Delivery>();

  constructor(private delService:DeliveryService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Delivery data : "+ this.DeliveryData);
    console.log("All : "+ this.allDelivery());
    this.allDelivery();
  }

  allDelivery(){
    return this.delService.AllDelivery().subscribe(
      (data: { })=>{
        console.log("Service Data:" + data);
        this.DeliveryData = data;
        console.log("Delivery data from service :" + this.DeliveryData);
        this.deldataSource = this.DeliveryData;
      }
    )
  }

  deleteDelivery(id_delivery:any){
    this.delService.delete(id_delivery);
  }


}
