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
  selector: 'app-create-subtask',
  templateUrl: './create-subtask.component.html',
  styles: [],
  providers: [SubTaskService, TaskService, UserService, ResponsableService]
})
export class CreateSubtaskComponent implements OnInit {
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
  	this.page_title = 'Registra sub tarea';
  	this.subtask = new SubTask(1,'',0,0,'');
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  	if (this.identity == null) {
      this._router.navigate(['/']);
    } else {
      this.subtask = new SubTask(1,'',0,0,'');
      this.getTasks();
      this.getResponsible();
    }
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
  			if(response.status == 'success') {
  				this.responsible = response.responsable;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});
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
    this._subTaskService.saveSubTask(this.subtask, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.subtask = response.subTask;
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
