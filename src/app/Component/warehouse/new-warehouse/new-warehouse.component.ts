import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WarehouseService} from "../../../Service/warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {dateLessThan} from "../../validators/dateValidator";

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
    adress : new FormControl('',[Validators.required]),
    city : new FormControl('',[Validators.required]),
    postal_code : new FormControl('',[Validators.required]),
    inbound_date : new FormControl('',[Validators.required]),
    outbound_date: new FormControl('',[Validators.required]),
    remarks : new FormControl(''),
  }, {validators:dateLessThan('inbound_date','outbound_date')});

  constructor(private whServ:WarehouseService,
              private router:Router,
              private actiRoute:ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  showError(error:any ): void {
    this.snackBar.open(error, 'X', {panelClass: ['error']});
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

    if(!this.newWhForm.valid){
      alert('La form Warehouse est invalide, veuillez remplir tous les champs requis.')
      window.location.reload();
    }else {

      this.whServ.create(newWh).subscribe(
        (data)=> {
          console.log("Success : " + data)
          this.router.navigate(['/warehouse']).then(() => {
            window.location.reload();
          })
        },
        (error)=>{
          console.log("Error : " + error);
          alert("Error, sauvegarde d'une nouvelle donnée Warehouse est Impossible, veuillez corriger le formulaire");
          window.location.reload();
        }
      );
    }
  }
}
