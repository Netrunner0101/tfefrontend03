import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {QuotationsService} from "../../../Service/quotations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TransporterService} from "../../../Service/transporter.service";

@Component({
  selector: 'app-quotations-id',
  templateUrl: './quotations-id.component.html',
  styleUrls: ['./quotations-id.component.css']
})
export class QuotationsIdComponent implements OnInit {

  id_quotations:number = <number>{} ;
  quotations:any = [];

  transItem: any ;

  quotrans: any = [];
  checkQuoTrans: any[] = [];

  //Data binding for transporteur
  transporter:any ;

  panelOpenState = false;

  // Initial formgroup
  updateQuotationsForm= new FormGroup({
    departure_adress : new FormControl('') ,
    departure_city : new FormControl('') ,
    departure_postal_code : new FormControl('') ,
    destination_adress : new FormControl('') ,
    destination_city : new FormControl('') ,
    destination_postal_code : new FormControl('') ,
    type_transport : new FormControl('') ,
    price : new FormControl('') ,
  });

  constructor(private quServ: QuotationsService,
              private transServ: TransporterService,
              private router:Router,
              private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_quotations = params['id_quotations'];
        this.getQuotationsById(this.id_quotations);
        console.log(this.getQuotationsById(this.id_quotations));
      }
    )
    this.quotrans = this.AllTransporter();
    console.log(this.quotrans)
    this.checkQuoTrans.push(this.AllTransporter());
    console.log(this.checkQuoTrans)
  }

  /*
  *   Get customer by Id
  * */
  getQuotationsById(id_quotations:number){
    this.quServ.getById(id_quotations).subscribe(
      (data)=>{
        console.log(data);
        console.log("Checktrans : " + this.checkQuoTrans)

        this.quotations = data;
        this.updateQuotationsForm.patchValue({
          departure_adress : this.quotations.departure_adress ,
          departure_city : this.quotations.departure_city ,
          departure_postal_code : this.quotations.departure_postal_code ,
          destination_adress : this.quotations.destination_adress ,
          destination_city : this.quotations.destination_city,
          destination_postal_code : this.quotations.destination_postal_code ,
          type_transport : this.quotations.type_transport,
          price : this.quotations.price,
        })
      })
    return this.quotations;
  }

  updateQuotations(){
    const updatedQuotations = {
      departure_adress : this.updateQuotationsForm.value.departure_adress ,
      departure_city : this.updateQuotationsForm.value.departure_city ,
      departure_postal_code : this.updateQuotationsForm.value.departure_postal_code ,
      destination_adress : this.updateQuotationsForm.value.destination_adress ,
      destination_city : this.updateQuotationsForm.value.destination_city,
      destination_postal_code : this.updateQuotationsForm.value.destination_postal_code ,
      type_transport : this.updateQuotationsForm.value.type_transport,
      price : this.updateQuotationsForm.value.price,
    }
    this.quServ.update(this.id_quotations,updatedQuotations);
    console.log("Update quotations form data: ", updatedQuotations);
    console.log("This id quotations : ",this.id_quotations );
  }

  // Transporter
  AllTransporter(){
    this.transServ.AllTransporter().subscribe( (data)=>{
        this.quotrans = data ;
      }
    )
  }

  /*
  *
  * Check if possible to find duplicate
  *
  * https://stackoverflow.com/questions/38375781/how-can-i-avoid-duplicate-values-when-inserting-to-the-database
  *
  * https://www.google.com/search?q=angular+avoid+duplicate+value&sxsrf=ALiCzsaCZmuZfVaFMhrbr1KXxEapaO2bTQ%3A1669429037336&ei=LXeBY5GVFIq0sAeH8rTADA&oq=angular+&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgQIIxAnMgQIIxAnMgQIABBDMgQIABBDMgUIABCRAjIKCAAQsQMQgwEQQzIECAAQQzIECAAQQzIFCAAQkQI6BwgjECcQnQI6EQguEIAEELEDEIMBEMcBENEDOggIABCxAxCDAToLCAAQgAQQsQMQgwE6BwguELEDEEM6BAguEEM6CwgAELEDEIMBEJECSgQIQRgASgQIRhgAUABYkglgkxBoAHAAeACAAeABiAHfBZIBBTYuMS4xmAEAoAEBwAEB&sclient=gws-wiz-serp
  *
  * */

  InsertTransporter(id_quotations:number,id_transporter:number){
    this.quServ.updateTransporterFromQuotations(id_quotations,id_transporter).subscribe(
      (data)=> {
        console.log("Success ajout Reussit")
        window.location.reload();
      },
      (error)=>{
        console.log("Error : " + error);
        alert("Error, ajouter un transporteur est Impossible !");
        window.location.reload();
      }
    );
  }

  deleteTransporter(id_quotations:number,id_transporter:number){
    this.quServ.deleteTransporterFromQuotations(id_quotations,id_transporter);
  }

}
