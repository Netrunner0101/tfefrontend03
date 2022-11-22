import { Component, OnInit } from '@angular/core';
import {DeliveryService} from "../../../Service/delivery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.component.html',
  styleUrls: ['./new-delivery.component.css']
})
export class NewDeliveryComponent implements OnInit {

  constructor(
    private delService:DeliveryService,
    private router:Router,
    private actiRoute:ActivatedRoute
  ) { }

  // Validator
  dateDifference( control:AbstractControl ): ValidationErrors | null{
    const out = control?.get('outbout_date')?.value
    const arrival = control?.get('arrival_date')?.value
    console.log("validators called");
    // Safe navigator
    if (out?.value !== null && arrival?.value !== null && out?.value > arrival?.value) {
      return {'Invalid date': true}
    }
    return null;
  }

  // Initial formgroup
  newDeliveryForm= new FormGroup({
    number_package : new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    dimension: new FormControl('', ),
    departure_adress:new FormControl('', [Validators.required]),
    departure_city : new FormControl('', [Validators.required]),
    departure_postal_code : new FormControl('', [Validators.required]),
    destination_adress : new FormControl('', [Validators.required]),
    destination_city : new FormControl('', [Validators.required]),
    destination_postal_code : new FormControl('', [Validators.required]),
    outbout_date: new FormControl('',[Validators.required,this.dateDifference]),
    arrival_date: new FormControl( '',[Validators.required,this.dateDifference]),
    remarks:new FormControl('', ),
  });


  ngOnInit(): void {
  }

  createDelivery(){
    const newDelivery = {
      number_package : this.newDeliveryForm.value.number_package,
      weight:  this.newDeliveryForm.value.weight ,
      dimension:  this.newDeliveryForm.value.dimension ,
      departure_adress: this.newDeliveryForm.value.departure_adress ,
      departure_city :  this.newDeliveryForm.value.departure_city ,
      departure_postal_code : this.newDeliveryForm.value.departure_postal_code  ,
      destination_adress : this.newDeliveryForm.value.destination_adress  ,
      destination_city :  this.newDeliveryForm.value.destination_city ,
      destination_postal_code :  this.newDeliveryForm.value.destination_postal_code ,
      outbout_date:  this.newDeliveryForm.value.outbout_date ,
      arrival_date: this.newDeliveryForm.value.arrival_date  ,
      remarks: this.newDeliveryForm.value.remarks ,
    }
    this.delService.create(newDelivery)
    console.log("New delivery create"+newDelivery)
    this.router.navigate(['/delivery']).then(() => {
      window.location.reload();
    });
  }

}
