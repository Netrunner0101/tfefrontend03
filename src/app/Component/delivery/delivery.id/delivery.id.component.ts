import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WarehouseService} from "../../../Service/warehouse.service";
import {TransporterService} from "../../../Service/transporter.service";
import {CustomerService} from "../../../Service/customer.service";
import {DeliveryService} from "../../../Service/delivery.service";
import {ActivatedRoute, Router} from "@angular/router";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-delivery.id',
  templateUrl: './delivery.id.component.html',
  styleUrls: ['./delivery.id.component.css']
})
export class DeliveryIdComponent implements OnInit {

  delivery:any = [];
  delcus: any = [];
  deltrans: any = [];
  delwh: any = [];

  // Data Binding with Customer
  id_del:number = <number>{} ;
  customer:any ;

  //Data binding for transporteur
  transporter:any ;

  //Data binding for transporteur
  warehouse:any ;

  panelOpenState = false;

  // Initial formgroup
  updateDeliveryForm= new FormGroup({
    number_package : new FormControl(''),
    weight: new FormControl(''),
    dimension: new FormControl(''),
    departure_adress:new FormControl(''),
    departure_city : new FormControl(''),
    departure_postal_code : new FormControl(''),
    destination_adress : new FormControl(''),
    destination_city : new FormControl(''),
    destination_postal_code : new FormControl(''),
    outbout_date: new FormControl(''),
    arrival_date: new FormControl(''),
    remarks:new FormControl(''),
  });

  tiles = [
    {text: 'Information', cols: 2},
    {text: 'Modification', cols: 2},
  ];

  constructor(private warehouseServ:WarehouseService ,
              private transServ:TransporterService,
              private custServ: CustomerService ,
              private delService:DeliveryService,
              private router:Router,
              private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_del = params['id_delivery']
        this.getDeliveryById(this.id_del);
        this.delcus = this.AllCustomer();
        this.deltrans = this.AllTransporter();
        this.delwh = this.AllWarehouse();
      }
    )
  }

// old
  getDeliveryById(idd:number){
    this.delService.DeliveryById(idd).subscribe(
      (data)=>{
        console.log(data);
        this.delivery = data;
        this.updateDeliveryForm.patchValue({
          number_package : this.delivery.number_package,
          weight: this.delivery.weight,
          dimension: this.delivery.dimension,
          departure_adress:this.delivery.departure_adress,
          departure_city : this.delivery.departure_city,
          departure_postal_code : this.delivery.departure_postal_code,
          destination_adress : this.delivery.destination_adress,
          destination_city :this.delivery.destination_city,
          destination_postal_code : this.delivery.destination_postal_code,
          outbout_date: this.delivery.outbout_date,
          arrival_date: this.delivery.arrival_date,
          remarks:this.delivery.remarks,
        })
      })
    return this.delivery;
  }

  updateDelivery(){
    const updateDelivery = {
      number_package : this.updateDeliveryForm.value.number_package,
      weight: this.updateDeliveryForm.value.weight,
      dimension: this.updateDeliveryForm.value.dimension,
      departure_adress:this.updateDeliveryForm.value.departure_adress,
      departure_city :this.updateDeliveryForm.value.departure_city,
      departure_postal_code : this.updateDeliveryForm.value.departure_postal_code,
      destination_adress : this.updateDeliveryForm.value.destination_adress,
      destination_city : this.updateDeliveryForm.value.destination_city,
      destination_postal_code : this.updateDeliveryForm.value.destination_postal_code,
      outbout_date: this.updateDeliveryForm.value.outbout_date,
      arrival_date: this.updateDeliveryForm.value.arrival_date,
      remarks:this.updateDeliveryForm.value.remarks,
    }
    this.delService.update(this.id_del,updateDelivery);
    console.log("Update Delivery form data: ", updateDelivery);
    console.log("This id Delivery : ", this.id_del);
  }

  // Validation form date .

  // Customer
  AllCustomer(){
    this.custServ.AllCustomer().subscribe( (data)=>{
        this.delcus = data ;
      }
    )
  }

  InsertCustomer(id_delivery:number,id_customer:number){
    this.delService.updateCustomerFromDelivery(id_delivery,id_customer);
  }

  deleteCustomer(id_delivery:number){
    this.delService.deleteCustomerFromDelivery(id_delivery);
  }

  // Transporter
  AllTransporter(){
    this.transServ.AllTransporter().subscribe( (data)=>{
        this.deltrans = data ;
      }
    )
  }


  InsertTransporter(id_delivery:number,id_transporter:number){
    this.delService.updateTransporterFromDelivery(id_delivery,id_transporter);
  }


  deleteTransporter(id_delivery:number){
    this.delService.deleteTransporterFromDelivery(id_delivery);
  }

  // Warehouse
  AllWarehouse(){
    this.warehouseServ.AllWarehouse().subscribe( (data)=>{
        this.delwh = data ;
      }
    )
  }

  InsertWarehouse(id_delivery:number,id_warehouse:number){
    this.delService.updateWarehouseFromDelivery(id_delivery,id_warehouse);
  }

  deleteWarehouse(id_delivery:number){
    this.delService.deleteWarehouseFromDelivery(id_delivery);
  }



  // PDFMAKE


  generatePDF(action = 'open') {


    let docDefinition = {
      header: {text:'Livraison : '+ this.delivery.id_delivery, styles: 'header'},
      content: [
        {text:' Nom de client : '+ this.delivery.customer.name, styles: 'content'}
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'right',
          margin:25,
        },
        content:{
          fontSize: 25,
          margin: [20, 0, 40, 0],
        },
        title:{
          fontSize: 50,
        },

      },
      pageMargins: [ 40, 40, 40, 40 ],
    };

    pdfMake.createPdf(docDefinition).download();

  }

}
