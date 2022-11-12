import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {QuotationsService} from "../../../Service/quotations.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quotations-id',
  templateUrl: './quotations-id.component.html',
  styleUrls: ['./quotations-id.component.css']
})
export class QuotationsIdComponent implements OnInit {

  id_quotations:number = <number>{} ;
  quotations:any = [];

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

  constructor(private quServ: QuotationsService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_quotations = params['id_quotations'];
        this.getQuotationsById(this.id_quotations);
      }
    )
  }

  /*
  *   Get customer by Id
  * */
  getQuotationsById(id_quotations:number){
    this.quServ.getById(id_quotations).subscribe(
      (data)=>{
        console.log(data);
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

}
