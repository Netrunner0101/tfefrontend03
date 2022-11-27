import { Component, OnInit } from '@angular/core';
import {TransporterService} from "../../Service/transporter.service";
import {Router} from "@angular/router";
import * as FileSaver from "file-saver";

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


  exportExcel() {
    if (this.TransporterData.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.TransporterData);
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
