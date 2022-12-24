import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../Service/warehouse.service";
import {Router} from "@angular/router";
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  searchWarehouse:any;

  WhData: any = [];

  constructor(private whServ:WarehouseService,private router:Router) { }

  ngOnInit(): void {
    console.log('Interceptor : '+ sessionStorage.getItem('token'));
    console.log("Warehouse data : "+ this.WhData);
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
    this.whServ.delete(id_warehouse).subscribe(
      (r) =>{
        console.log("Delete warehouse Entry sucess");
        window.location.reload();
      }
    );
  }

  exportExcel() {
    if (this.WhData.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.WhData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "warehouse");
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
