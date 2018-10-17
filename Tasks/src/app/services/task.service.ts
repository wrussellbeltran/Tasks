import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	public url: string;

   /**
    * Constructor, asigna la ruta de la api a la variable url.
    * @param {HttpClient} public _http Realiza solicitudes HTTP.
    */
  constructor(public _http: HttpClient) {
	  this.url = Global.url; 
	}

	getTask(id): Observable<any> {
    	return this._http.get(this.url + 'task/' + id);
   	}

	getTasks(): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     	return this._http.get(this.url + 'task', {headers: headers});
	}

	saveTask(task, token): Observable<any> {

		let json = JSON.stringify(task);
      	let params = 'json=' + json;
      	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

      return this._http.post(this.url + 'task', params, {headers: headers});
	}

	searchTask(task, token): Observable<any> {

		let json = JSON.stringify(task);
      	let params = 'json=' + json;
      	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

      return this._http.post(this.url + 'search', params, {headers: headers});
	}

	editTask(task, token, id): Observable<any> {
		let json = JSON.stringify(task);
	    let params = 'json=' + json;
	    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.put(this.url + 'task/' + id, params, {headers: headers});
	}
   
}