import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WarehouseService} from "../../../Service/warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {

  // Initial formgroup
  newWhForm= new FormGroup({
    ref_nummer : new FormControl('',[Validators.required]),
    number_package: new FormControl('',[Validators.required]),
    weight: new FormControl('',[Validators.required]),
    dimension : new FormControl(''),
    adress : new FormControl(''),
    city : new FormControl(''),
    postal_code : new FormControl(''),
    inbound_date : new FormControl('',[Validators.required]),
    outbound_date: new FormControl('',[Validators.required]),
    remarks : new FormControl(''),
  });

  constructor(private whServ:WarehouseService,
              private router:Router,
              private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  createWarehouse(){
    const newWh = {
      ref_nummer : this.newWhForm.value.ref_nummer ,
      number_package: this.newWhForm.value.number_package ,
      weight: this.newWhForm.value.weight ,
      dimension : this.newWhForm.value.dimension ,
      adress : this.newWhForm.value.adress ,
      city : this.newWhForm.value.city ,
      postal_code : this.newWhForm.value.postal_code ,
      inbound_date : this.newWhForm.value.inbound_date ,
      outbound_date: this.newWhForm.value.outbound_date ,
      remarks : this.newWhForm.value.remarks ,
    }

    this.whServ.create(newWh);
    console.log("New Entry create"+ newWh)
    this.router.navigate(['/warehouse']);
  }

}
