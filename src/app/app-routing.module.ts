import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationComponent} from "./Component/authentication/authentication.component";
import {DeliveryComponent} from "./Component/delivery/delivery.component";
import {AuthguardGuard} from "./Component/authentication/authguard.guard";
import {NewDeliveryComponent} from "./Component/delivery/new-delivery/new-delivery.component";
import {DeliveryIdComponent} from "./Component/delivery/delivery.id/delivery.id.component";
import {CustomerComponent} from "./Component/customer/customer.component";
import {CustomeridComponent} from "./Component/customer/customerid/customerid.component";
import {TransporterComponent} from "./Component/transporter/transporter.component";
import {NewTransporterComponent} from "./Component/transporter/new-transporter/new-transporter.component";
import {TransporteridComponent} from "./Component/transporter/transporterid/transporterid.component";
import {WarehouseComponent} from "./Component/warehouse/warehouse.component";
import {NewWarehouseComponent} from "./Component/warehouse/new-warehouse/new-warehouse.component";
import {WarehouseidComponent} from "./Component/warehouse/warehouseid/warehouseid.component";
import {QuotationsComponent} from "./Component/quotations/quotations.component";
import {NewQuotationsComponent} from "./Component/quotations/new-quotations/new-quotations.component";
import {QuotationsIdComponent} from "./Component/quotations/quotations-id/quotations-id.component";
import {NewCustomerComponent} from "./Component/customer/new-customer/new-customer.component";

const routes: Routes = [

  // Route
  { path:'' , component: AuthenticationComponent},
  // Route Login
  { path:'login' , component: AuthenticationComponent},
  // Delivery route
  { path:'delivery' , component: DeliveryComponent, canActivate:[AuthguardGuard]},
  { path:'delivery/newDelivery' , component: NewDeliveryComponent, canActivate:[AuthguardGuard]},
  { path:'delivery/:id_delivery' , component: DeliveryIdComponent, canActivate:[AuthguardGuard]},

  // Customer route
  {path:'customer', component:CustomerComponent, canActivate:[AuthguardGuard] },
  {path:'customer/newCustomer', component: NewCustomerComponent , canActivate:[AuthguardGuard] },
  {path:'customer/:id_customer', component:CustomeridComponent, canActivate:[AuthguardGuard] },

  // Transporter route
  {path:'transporter', component:TransporterComponent, canActivate:[AuthguardGuard] },
  {path:'transporter/newTransporter', component:NewTransporterComponent , canActivate:[AuthguardGuard] },
  {path:'transporter/:id_transporter', component:TransporteridComponent, canActivate:[AuthguardGuard] },

  // Warehouse route
  {path:'warehouse', component:WarehouseComponent, canActivate:[AuthguardGuard]},
  {path:'warehouse/newWarehouse', component:NewWarehouseComponent, canActivate:[AuthguardGuard]},
  {path:'warehouse/:id_warehouse', component:WarehouseidComponent, canActivate:[AuthguardGuard]},

  // Quotations route
  {path:'quotations', component:QuotationsComponent, canActivate:[AuthguardGuard] },
  {path:'quotations/newQuotations', component:NewQuotationsComponent, canActivate:[AuthguardGuard] },
  {path:'quotations/:id_quotations', component:QuotationsIdComponent, canActivate:[AuthguardGuard] },

  {path:'**', redirectTo:'login',pathMatch:'full'},
];
@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
    CommonModule
  ]
})
export class AppRoutingModule { }
