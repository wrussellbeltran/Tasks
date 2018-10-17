import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { SubTask } from '../models/subtask';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {
	public url: string;

   /**
    * Constructor, asigna la ruta de la api a la variable url.
    * @param {HttpClient} public _http Realiza solicitudes HTTP.
    */
  constructor(public _http: HttpClient) {
	  this.url = Global.url; 
	}

	getSubTask(id): Observable<any> {
    	return this._http.get(this.url + 'sub_task/' + id);
   	}

	getSubTasks(): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     	return this._http.get(this.url + 'sub_task', {headers: headers});
	}

	saveSubTask(subtask, token): Observable<any> {

		let json = JSON.stringify(subtask);
      	let params = 'json=' + json;
      	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

      return this._http.post(this.url + 'sub_task', params, {headers: headers});
	}

	editSubTask(subtask, token, id): Observable<any> {
		let json = JSON.stringify(subtask);
	    let params = 'json=' + json;
	    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.put(this.url + 'sub_task/' + id, params, {headers: headers});
	}
}