import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	public url: string;
  public identity;
 	public token;

   /**
    * Constructor, asigna la ruta de la api a la variable url.
    * @param {HttpClient} public _http Realiza solicitudes HTTP.
    */
  constructor(public _http: HttpClient) {
	  this.url = Global.url; 
	}

  /**
   * Registra un usuario.
   * @param  {User}          user Entidad de usuario.
   * @return {Observable<any>}      Regresa un Observable con el estatus si se registro correctamente o no el usuario.
   */
	register(user): Observable<any> {
      let json = JSON.stringify(user);
      let params = 'json=' + json;

      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.post(this.url + 'register', params, {headers: headers});
   }

   /**
    * Consulta que el usuario que ingreso se encuentre en la base de datos.
    * @param  {User}          user     Entidad de usuario.
    * @param  {Boolean}          gettoken =             null Tipo boolean que permite devolver el token.
    * @return {Observable<any>}          Devuelve los datos del usuario o el token.
    */
   singUp(user, gettoken = null): Observable<any> {

      if (gettoken != null) {
        user.gettoken = 'true';
      }      

      let json = JSON.stringify(user);
      let params = 'json=' + json;
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.post(this.url + 'login', params, {headers: headers});
   }

   /**
    * Consulta los datos del usuario que se encuentran en el localStorage.
    */
   getIdentity() {
      let identity = JSON.parse(localStorage.getItem('identity'));

      if (identity != 'undefined') {
        this.identity = identity;
      } else {
        this.identity = null;
      }

      return this.identity;
   }

   /**
    * Consulta el token que se encuentra guardado en el localStorage.
    */
   getToken() {
      let token = localStorage.getItem('token');

      if (token != 'undefined') {
        this.token = token;
      } else {
        this.token = null;
      }

      return this.token;
   }
   
}
