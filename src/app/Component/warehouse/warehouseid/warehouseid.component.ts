import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WarehouseService} from "../../../Service/warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {dateLessThan} from "../../validators/dateValidator";

@Component({
  selector: 'app-warehouseid',
  templateUrl: './warehouseid.component.html',
  styleUrls: ['./warehouseid.component.css']
})
export class WarehouseidComponent implements OnInit {


  id_warehouse:number = <number>{} ;
  wh:any = [];

  panelOpenState = false;

  // Initial formgroup
  updateWhForm= new FormGroup({
    ref_nummer : new FormControl(''),
    number_package: new FormControl(''),
    weight: new FormControl(''),
    dimension : new FormControl(''),
    adress : new FormControl(''),
    city : new FormControl(''),
    postal_code : new FormControl(''),
    inbound_date : new FormControl(''),
    outbound_date: new FormControl(''),
    remarks : new FormControl(''),
  }, {validators:dateLessThan('inbound_date','outbound_date')});

  constructor(private whServ:WarehouseService,
              private router:Router,
              private actiRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actiRoute.queryParams.subscribe(
      params =>{
        this.id_warehouse = params['id_warehouse'];
        this.getWhById(this.id_warehouse);
      }
    )
  }

  /*
  *   Get customer by Id
  * */
  getWhById(id_warehouse:number){
    this.whServ.getById(id_warehouse).subscribe(
      (data)=>{
        console.log(data);
        this.wh = data;
        this.updateWhForm.patchValue({
          ref_nummer : this.wh.ref_nummer ,
          number_package: this.wh.number_package ,
          weight: this.wh.weight ,
          dimension : this.wh.dimension ,
          adress : this.wh.adress ,
          city : this.wh.city ,
          postal_code : this.wh.postal_code ,
          inbound_date : this.wh.inbound_date ,
          outbound_date: this.wh.outbound_date ,
          remarks : this.wh.remarks ,
        })
      })
    return this.wh;
  }

  updateWh(){
    const updatedWh = {
      ref_nummer : this.updateWhForm.value.ref_nummer ,
      number_package: this.updateWhForm.value.number_package ,
      weight: this.updateWhForm.value.weight ,
      dimension : this.updateWhForm.value.dimension ,
      adress : this.updateWhForm.value.adress ,
      city : this.updateWhForm.value.city ,
      postal_code : this.updateWhForm.value.postal_code ,
      inbound_date : this.updateWhForm.value.inbound_date ,
      outbound_date: this.updateWhForm.value.outbound_date ,
      remarks : this.updateWhForm.value.remarks ,
    }
    if(!this.updateWhForm.valid){
      alert('La mise à jour d form Warehouse est invalide, veuillez corriger.')
      window.location.reload();
    }else {
      this.whServ.update(this.id_warehouse,updatedWh);
    }
    //this.whServ.update(this.id_warehouse,updatedWh)
    //console.log("Update Warehouse form data: ", updatedWh);
    //console.log("This id_warehouse : ", this.id_warehouse);
  }


}
