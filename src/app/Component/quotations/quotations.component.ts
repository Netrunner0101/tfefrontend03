import { Component, OnInit } from '@angular/core';
import {QuotationsService} from "../../Service/quotations.service";
import {Router} from "@angular/router";
import * as FileSaver from "file-saver";
import {TransporterService} from "../../Service/transporter.service";

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {

  searchQuotations:any;

  QuData: any = [];

  trans: any = [];

  constructor(private quServ:QuotationsService, private transServ:TransporterService ,private router:Router) { }

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

  getTransporterById(id_transporter:number){
    this.transServ.TransporterById(id_transporter).subscribe(
      (data)=>{
        console.log(data);
        this.trans = data.name;
      })
    return this.trans;
  }

  deleteQuotations(id_quotations:any){
    this.quServ.delete(id_quotations);
    window.location.reload();
  }

  exportExcel() {
    if (this.QuData.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.QuData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "quotations");
      });
    }
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'Quotations' + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
