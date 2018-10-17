import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styles: [],
  providers: [TaskService, UserService]
})
export class DetailTaskComponent implements OnInit {
	  public tasks: Array<Task>;
  	public identity;
  	public token;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _taskService: TaskService,
              private _userService: UserService) {
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(['/']);
    } else {
      this.getTasks();
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
}
