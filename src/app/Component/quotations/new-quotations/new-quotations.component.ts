import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuotationsService} from "../../../Service/quotations.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-quotations',
  templateUrl: './new-quotations.component.html',
  styleUrls: ['./new-quotations.component.css']
})
export class NewQuotationsComponent implements OnInit {


  // Initial formgroup
  newQuotationsForm= new FormGroup({
    departure_adress : new FormControl('', [Validators.required]) ,
    departure_city : new FormControl('', [Validators.required]) ,
    departure_postal_code : new FormControl('', [Validators.required]) ,
    destination_adress : new FormControl('', [Validators.required]) ,
    destination_city : new FormControl('', [Validators.required]) ,
    destination_postal_code : new FormControl('', [Validators.required]) ,
    type_transport : new FormControl('', [Validators.required]) ,
    price : new FormControl('', [Validators.required]) ,
  });

  constructor(private quServ: QuotationsService,private router:Router,private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  createQuotations(){
    const newQuotations = {
      departure_adress : this.newQuotationsForm.value.departure_adress ,
      departure_city :this.newQuotationsForm.value.departure_city ,
      departure_postal_code : this.newQuotationsForm.value.departure_postal_code ,
      destination_adress :this.newQuotationsForm.value.destination_adress ,
      destination_city : this.newQuotationsForm.value.destination_city ,
      destination_postal_code : this.newQuotationsForm.value.destination_postal_code ,
      type_transport : this.newQuotationsForm.value.type_transport ,
      price : this.newQuotationsForm.value.price ,
    }
    if(!this.newQuotationsForm.valid){
      alert('La form customer est invalide, veuillez remplir tous les champs requis.')
      window.location.reload();
    }else {
      this.quServ.create(newQuotations);
      console.log("New quotations create"+ newQuotations )
      this.router.navigate(['/quotations']).then(() => {
        window.location.reload();
      });
    }

  }


}
