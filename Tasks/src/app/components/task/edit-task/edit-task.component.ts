import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { Responsable } from '../../../models/responsable';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: '../create-task/create-task.component.html',
  styles: [],
  providers: [TaskService, UserService, ResponsableService]
})
export class EditTaskComponent implements OnInit {
	public page_title: string;
	public task: Task;
	public responsible: Array<Responsable>;
	public status: string;
	public token;
  	public identity;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _taskService: TaskService,
              private _userService: UserService,
              private _responsableService: ResponsableService,) { 
  	this.task = new Task(1,'',0,'','','','');
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getTask(id);
      this.getResponsible();
    });
  }

  /**
   * Permite agregar solo numeros.
   * @param {event} event Recibe la tecla presionada.
   */
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  getTask(id) {
  	this._taskService.getTask(id).subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.task = response.task;    
	        this.page_title = 'Editar ' + this.task.name;
	      } else {
	        this._router.navigate(['tasks']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  getResponsible() {
	  this._responsableService.getResponsible().subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.responsible = response.responsable;
	      } else {
	        this._router.navigate(['tasks']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  onSubmit(form) {    
    this._taskService.editTask(this.task, this.token, this.task.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['tasks']);
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
