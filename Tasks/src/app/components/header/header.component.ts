import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
	public identity;
  	public token;

   /**
    * Constructor, asigna los datos del usuario y token de la sesión.
    * @param {UserService} private _userService Comparte la información de la clase UserService.
    */
  constructor (private _userService: UserService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  /**
   * Método de inicialización.
   */
  ngOnInit() {
  }

  /**
   * Se invoca en la detección de cambios personalizados para una directiva.
   */
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
