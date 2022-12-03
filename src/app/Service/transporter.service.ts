import { Injectable } from '@angular/core';
import {url_dev, url_production} from "../global";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Transporter} from "../Models/Transporter";

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  id: undefined | number ;

  private url = url_dev;

  private url_prod = url_production;

  constructor(private http:HttpClient) { }

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

  AllTransporter():Observable<Transporter>{
    return this.http.get<Transporter>(this.url_prod+'/api/Transporter/transporters');
  }


  TransporterById(id_transporter:any):Observable<Transporter>{
    return this.http.get<Transporter>(this.url_prod+'/api/Transporter/transporters/'+id_transporter);
  }

  create(transporter:any):Observable<any>{
    return this.http.post(this.url_prod+'/api/Transporter',transporter).pipe(
      catchError((this.handleError)
      )
    );
  }

  update(id_transporter:any,transporter:any){
    this.id = Number(id_transporter) ;
    this.http.put(this.url_prod+'/api/Transporter/'+this.id,transporter).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      },
      (error) =>{
        console.log("Error : "+ error);
      }
    );
  }

  delete(id_transporter:any){
    try{
      this.http.delete(this.url_prod+'/api/Transporter/'+id_transporter,{}).subscribe(
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
