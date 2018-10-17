import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SubTask } from '../../../models/subtask';
import { SubTaskService } from '../../../services/subtask.service';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { Responsable } from '../../../models/responsable';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-edit-subtask',
  templateUrl: '../create-subtask/create-subtask.component.html',
  styles: [],
  providers: [SubTaskService, TaskService, UserService, ResponsableService]
})
export class EditSubtaskComponent implements OnInit {
	public page_title: string;
	public subtask: SubTask;
	public tasks: Array<Task>;
	public responsible: Array<Responsable>;
	public status: string;
	public token;
  	public identity;
  	public dateStar: string;
  	public dateEnd: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _subTaskService: SubTaskService,
              private _taskService: TaskService,
              private _userService: UserService,
              private _responsableService: ResponsableService,) { 
  	this.subtask = new SubTask(1,'',0,0,'');
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getSubTask(id);
      this.getTasks();
      this.getResponsible();
    });
  }

  getSubTask(id) {
  	this._subTaskService.getSubTask(id).subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.subtask = response.subTask;    
	        this.page_title = 'Editar ' + this.subtask.name;
	      } else {
	        this._router.navigate(['tasks']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  getTasks() {
  	this._taskService.getTasks().subscribe(
  		response => {
  			if(response.status == 'success') {
  				this.tasks = response.task;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});
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

  onChange(task_id) {
   	this._taskService.getTask(task_id).subscribe(
	    response => {
	      if (response.status == 'success') {
	        this.dateStar = response.task.star_date;
	        this.dateEnd = response.task.end_date;
	      } else {
	        this._router.navigate(['sub_tasks']);
	      }
	    },
	    error => {
	      console.log(<any>error);
	    }
	  );
  }

  onSubmit(form) {    
    this._subTaskService.editSubTask(this.subtask, this.token, this.subtask.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['sub_tasks']);
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
