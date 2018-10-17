import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Responsable } from '../../../models/responsable';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-create-responsible',
  templateUrl: './create-responsible.component.html',
  styles: [],
  providers: [ResponsableService, UserService]
})
export class CreateResponsibleComponent implements OnInit {
	public page_title: string;
	public responsable: Responsable;
	public status: string;
	public token;
  	public identity;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _responsableService: ResponsableService,
              private _userService: UserService) { 
  	this.page_title = 'Registra responsable';
  	this.responsable = new Responsable(1,'');
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  	if (this.identity == null) {
      this._router.navigate(['/']);
    } else {
      this.responsable = new Responsable(1,'');
    }
  }

  onSubmit(form) {
    this._responsableService.saveResponsable(this.responsable, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.responsable = response.responsable;
          this.status = 'success';
          this._router.navigate(['responsibles']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
