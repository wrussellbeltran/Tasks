import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
	public url: string;

   /**
    * Constructor, asigna la ruta de la api a la variable url.
    * @param {HttpClient} public _http Realiza solicitudes HTTP.
    */
  constructor(public _http: HttpClient) {
	  this.url = Global.url; 
	}

	getResponsable(id): Observable<any> {
    	return this._http.get(this.url + 'responsable/' + id);
   	}

	getResponsible(): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     	return this._http.get(this.url + 'responsable', {headers: headers});
	}

	saveResponsable(responsable, token): Observable<any> {

		let json = JSON.stringify(responsable);
      	let params = 'json=' + json;
      	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

      return this._http.post(this.url + 'responsable', params, {headers: headers});
	}

	editResponsable(responsable, token, id): Observable<any> {
		let json = JSON.stringify(responsable);
	    let params = 'json=' + json;
	    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    	return this._http.put(this.url + 'responsable/' + id, params, {headers: headers});
	}
}