import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Responsable } from '../../../models/responsable';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-detail-responsible',
  templateUrl: './detail-responsible.component.html',
  styles: [],
  providers: [ResponsableService, UserService]
})
export class DetailResponsibleComponent implements OnInit {
	  public responsible: Array<Responsable>;
  	public identity;
  	public token;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _responsableService: ResponsableService,
              private _userService: UserService) {
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(['/']);
    } else {
      this.getResponsible();
    }
  }

  getResponsible() {
  	this._responsableService.getResponsible().subscribe(
  		response => {
  			if(response.status == 'success') {
  				this.responsible = response.responsable;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});
  }
}
