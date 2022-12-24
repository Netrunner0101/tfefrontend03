import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../Service/customer.service";
import {Router} from "@angular/router";
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  searchCustomer:any;

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
    this.cusServ.delete(id_customer).subscribe(
      (r) =>{
        console.log("Delete Customer sucess");
        window.location.reload();
      }
    );
  }

  exportExcel() {
    if (this.CustomerData.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.CustomerData);
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
