import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Warehouse} from "../Models/Warehouse";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  id: undefined | number ;

  private url = url_dev;

  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar
    ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  showError(error:any ): void {
    this.snackBar.open(error, 'X', {panelClass: ['error']});
  }

  AllWarehouse():Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses');
  }

  getById(id_warehouse:any):Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses/'+id_warehouse);
  }

  create(warehouse:any):Observable<any>{
    return this.http.post(this.url+'/api/Warehouse',warehouse,this.httpOptions).pipe(
      catchError((this.handleError)
      )
    );
  }

  update(id_warehouse:any,warehouse:any){
    try{
      this.id = Number(id_warehouse) ;
      this.http.put(this.url+'/api/Warehouse/'+this.id,warehouse).subscribe(
        (response) =>{
          window.location.reload();
          console.log(response);
        }
      );
    }catch (e) {
      let error = e ;
      console.log("Error");
      this.showError(error);
    }
  }

  delete(id_warehouse:any){
    try{
      this.http.delete(this.url+'/api/Warehouse/'+id_warehouse,{}).subscribe(
        (data:any) =>{
          window.location.reload();
          console.log(data)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }
}
