import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SubTask } from '../../../models/subtask';
import { SubTaskService } from '../../../services/subtask.service';

@Component({
  selector: 'app-detail-subtask',
  templateUrl: './detail-subtask.component.html',
  styles: [],
  providers: [SubTaskService, UserService]
})
export class DetailSubtaskComponent implements OnInit {
	public subtasks: Array<SubTask>;
  	public identity;
  	public token;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _subTaskService: SubTaskService,
              private _userService: UserService) {
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(['/']);
    } else {
      this.getSubTasks();
    }
  }

  getSubTasks() {
  	this._subTaskService.getSubTasks().subscribe(
  		response => {
  			if(response.status == 'success') {
  				this.subtasks = response.subTask;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});
  }
}
