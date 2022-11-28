import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Delivery} from "../../Models/Delivery";
import {DeliveryService} from "../../Service/delivery.service";
import {Router} from "@angular/router";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  searchDelivery:any;

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
    window.location.reload();
  }

  exportExcel() {
    if (this.DeliveryData.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.DeliveryData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "delivery");
      });
    }
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
