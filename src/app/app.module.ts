import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { AuthenticationComponent } from './Component/authentication/authentication.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { DeliveryComponent } from './Component/delivery/delivery.component';
import { QuotationsComponent } from './Component/quotations/quotations.component';
import { TransporterComponent } from './Component/transporter/transporter.component';
import { WarehouseComponent } from './Component/warehouse/warehouse.component';
import { DeliveryIdComponent } from './Component/delivery/delivery.id/delivery.id.component';
import { NewDeliveryComponent } from './Component/delivery/new-delivery/new-delivery.component';
import { CustomeridComponent } from './Component/customer/customerid/customerid.component';
import {AuthguardGuard} from "./Component/authentication/authguard.guard";
import {TokenInterceptorInterceptor} from "./token-interceptor.interceptor";
import {NewCustomerComponent} from "./Component/customer/new-customer/new-customer.component";
import {TransporteridComponent} from "./Component/transporter/transporterid/transporterid.component";
import {WarehouseidComponent} from "./Component/warehouse/warehouseid/warehouseid.component";
import {NewWarehouseComponent} from "./Component/warehouse/new-warehouse/new-warehouse.component";
import {QuotationsIdComponent} from "./Component/quotations/quotations-id/quotations-id.component";
import {NewQuotationsComponent} from "./Component/quotations/new-quotations/new-quotations.component";
import {NewTransporterComponent} from "./Component/transporter/new-transporter/new-transporter.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './Component/authentication/register/register.component';
import {MatIconModule} from "@angular/material/icon";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CustomerComponent,
    DeliveryComponent,
    QuotationsComponent,
    TransporterComponent,
    WarehouseComponent,
    DeliveryIdComponent,
    NewDeliveryComponent,
    CustomeridComponent,
    NewCustomerComponent,
    TransporteridComponent,
    NewCustomerComponent,
    WarehouseidComponent,
    NewWarehouseComponent,
    QuotationsComponent,
    QuotationsIdComponent,
    NewQuotationsComponent,
    NewTransporterComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    RouterLinkWithHref,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
    MatIconModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor, multi:true},
    AuthguardGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
