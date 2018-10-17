import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ResponsableService } from '../../../services/responsable.service';
import { Responsable } from '../../../models/responsable';

@Component({
  selector: 'app-edit-responsible',
  templateUrl: '../create-responsible/create-responsible.component.html',
  styles: [],
  providers: [ResponsableService, UserService]
})
export class EditResponsibleComponent implements OnInit {
	public page_title: string;
	public responsable: Responsable;
	public status: string;
	public token;
  	public identity;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _responsableService: ResponsableService,
              private _userService: UserService) {
  	this.responsable = new Responsable(1,'');
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getResponsable(id);
    });
  }

  getResponsable(id) {
	  this._responsableService.getResponsable(id).subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.responsable = response.responsable;
	        this.page_title = 'Editar ' + this.responsable.name;
	      } else {
	        this._router.navigate(['responsibles']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  onSubmit(form) {
    this._responsableService.editResponsable(this.responsable, this.token, this.responsable.id).subscribe(
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
