import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public user: User;
  	public status: string;
  	public token;
  	public identity;

  /**
   * Constructor, se inicializa la entidad user.
   * @param {ActivatedRoute} private route       Contiene informacion sobre una ruta asociada con un componente.
   * @param {Router}         private router      Proporciona las capacidades de navegación y manipulación de url.
   * @param {UserService}    private userService Comparte la información de la clase UserService.
   */
  constructor(private route: ActivatedRoute, 
  			private router: Router, 
  			private userService: UserService) {
    	this.user = new User(1, '');
  	}

  /**
   * Método de inicialización.
   */
  ngOnInit() {
  	this.logout();
  }

  /**
   * Recibe el formulario con los valores capturados, registra el usuario e ingresa al sistema.
   * @param {formGroup} form Recibe los datos capturados en el formulario.
   */
  onSubmit(form) {
    this.userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.login(form);
          form.reset();
        }
        else if (response.status == 'exists') {
        	this.status = 'success';        	
        	this.login(form);
        	form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /**
   * Consulta el servicio del usuario y el token.
   * @param {formGroup} form Recibe los datos capturados en el formulario.
   */
  login(form) {
    this.userService.singUp(this.user).subscribe(
      responseIdentity => {
        if (responseIdentity.status != 'error') {
          this.status = 'success';
          this.identity = responseIdentity;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this.user.username = this.identity.username;
          this.userService.singUp(this.user, true).subscribe(
            responseToken => {
              this.token = responseToken;
              localStorage.setItem('token', this.token);

              this.router.navigate(['home']);
            },
            error => {
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /**
   * Permite salir del sistema.
   */
  logout() {
      this.route.params.subscribe(params => {
        let logout = +params['sure'];
        if (logout == 1) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          this.router.navigate(['/']);
        }
      });
  }
}
