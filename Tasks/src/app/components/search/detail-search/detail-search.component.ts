import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { Responsable } from '../../../models/responsable';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-detail-search',
  templateUrl: './detail-search.component.html',
  styles: [],
  providers: [TaskService, UserService, ResponsableService]
})
export class DetailSearchComponent implements OnInit {
	public responsible: Array<Responsable>;
	public responsable: Responsable;
	public tasks: Array<Task>;
  	public identity;
  	public token;
  	public dateStar: string;
  	public dateEnd: string;
  	public datos;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _taskService: TaskService,
              private _userService: UserService,
              private _responsableService: ResponsableService,) {
  	this.responsable = new Responsable(1,'');
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getResponsible();
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

  searchResponsable(id){
  	this._responsableService.getResponsable(id).subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.responsable = response.responsable;
	        this.tasks = response.tasks;
	      } else {
	        this._router.navigate(['/']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  searchDate() {

  	this.datos = {"star_date" : this.dateStar, "end_date" : this.dateEnd};

  	this._taskService.searchTask(this.datos, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.tasks = response.tasks;
        } else {
          this._router.navigate(['/']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
