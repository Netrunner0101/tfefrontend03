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
import {dateLessThan} from "../../validators/dateValidator";
import {Margins} from "pdfmake/interfaces";
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
  }, {validators:dateLessThan('outbout_date','arrival_date')} );

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
    if(!this.updateDeliveryForm.valid){
      alert('La mise ?? jour du form delivery est invalid, veuillez corriger.')
      window.location.reload();
    }else {
      let iddel = this.id_del;
      this.delService.update(iddel,updateDelivery);
    }
    //this.delService.update(this.id_del,updateDelivery);
    //console.log("Update Delivery form data: ", updateDelivery);
    //console.log("This id Delivery : ", this.id_del);
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

  generatePDF() {
    let docDefinition = {

      layout: 'lightHorizontalLines',
      content: [
        {text:'Fait le : '+ new Date().toLocaleDateString("fr-FR", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}),
        fontSize: 12,
        bold: true,
        margin: [300, 0, 0, 0] as Margins,
        },
        {text:'Livraison n?? '+ this.delivery.id_delivery,
          fontSize: 20,
          bold: true,
          margin: [ 150, 10, 10, 0 ] as Margins,
        },
        {text:' Adresse de livraison : '  ,
          styles: 'content_title',
          fontSize: 12
        },
        {text: this.delivery.destination_adress ,
          fontSize: 16,
          bold: true,
          margin: [20, 10] as Margins,
        },
        {text:' Date de Sortie : ',
          fontSize: 12
        },
        {text: new Date(this.delivery.outbout_date).toLocaleDateString() ,
          fontSize: 16 ,
          bold: true ,
          margin: [20, 10]  as Margins,
          lineHeight: 2 ,
        },
        {text: ' Transporteur : ',
          fontSize: 15 ,

        },
        {text:  'Nom du transporteur : ' ,
          fontSize: 12 ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:  this.delivery.transporter.name,
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:  ' Email : ' ,
          fontSize: 12 ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:  this.delivery.transporter.email ,
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:  ' Num??ro t??l??phone : ' ,
          fontSize: 12 ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:+ this.delivery.transporter.phoneNumber ,
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
          lineHeight: 2 ,
        },
        {text: ' Client : ',
          fontSize: 15 ,
        },
        {text:' Nom de client : ',
          fontSize: 12 ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text: this.delivery.customer.name,
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
          lineHeight: 2 ,
        },
        {text:' Email client : ',
          fontSize: 12 ,
          margin: [ 100, 5, 0, 0 ]as Margins,
        },
        {text: this.delivery.customer.email,
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
          lineHeight: 2 ,
        },
        {text: 'Contenu : ',
          fontSize: 15 ,
        },
        {text:' Nombre de packets : ' ,
          fontSize: 12 ,
          margin: [ 100, 5 , 0, 0 ] as Margins,
        },
        {text:this.delivery.number_package + ' pcs',
          fontSize: 16 ,
          bold: true ,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text:' Poids : ' ,
          fontSize: 12,
          margin: [ 100, 5, 0, 0 ] as Margins,
        },
        {text: this.delivery.weight  + ' kg',
          fontSize: 16,
          bold: true,
          margin: [ 100, 5, 0, 0 ]as Margins,
        },
        {text:' Dimension : ' ,
          fontSize: 12,
        },
        {text: this.delivery.dimension ,
          fontSize: 16,
          bold: true,
          margin: [ 100, 5, 0, 0 ]as Margins,
          lineHeight: 2,
        },
        {text: ' Remarques : ',
          fontSize: 13

        },
        {text: this.delivery.remarks , styles: 'remarks',
          fontSize: 17,
          margin: [ 100, 5, 0, 0 ]as Margins,
        },
      ],
      styles: {
        header: {
          fontSize: 45,
          bold: true,
          margin: [10, 10] as Margins,
        },
        content:{
          fontSize: 25,
          bold: true,
          margin: [20, 0, 40, 0] as Margins,
        },
        content_title:{
          fontSize: 25,
          bold: true,
          margin: [20, 0, 40, 0] as Margins,
        },

      },
      pageMargins: [ 40, 40, 40, 40 ]as Margins,
    };

    pdfMake.createPdf(docDefinition).download('delivery_n??'+this.delivery.id_delivery+'_'+new Date().toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric'}));
  }

}
