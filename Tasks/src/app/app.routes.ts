import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DetailResponsibleComponent } from './components/responsible/detail-responsible/detail-responsible.component';
import { CreateResponsibleComponent } from './components/responsible/create-responsible/create-responsible.component';
import { EditResponsibleComponent } from './components/responsible/edit-responsible/edit-responsible.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { DetailTaskComponent } from './components/task/detail-task/detail-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { CreateSubtaskComponent } from './components/subtask/create-subtask/create-subtask.component';
import { DetailSubtaskComponent } from './components/subtask/detail-subtask/detail-subtask.component';
import { EditSubtaskComponent } from './components/subtask/edit-subtask/edit-subtask.component';
import { DetailSearchComponent } from './components/search/detail-search/detail-search.component';

const appRoutes: Routes = [
	{path: '', component: LoginComponent },
	{path: 'home', component: HomeComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'responsibles', component: DetailResponsibleComponent},
	{path: 'create-responsible', component: CreateResponsibleComponent},
	{path: 'edit-responsible/:id', component: EditResponsibleComponent},
	{path: 'tasks', component: DetailTaskComponent},
	{path: 'create-task', component: CreateTaskComponent},
	{path: 'edit-task/:id', component: EditTaskComponent},
	{path: 'sub_tasks', component: DetailSubtaskComponent},
	{path: 'create-sub_task', component: CreateSubtaskComponent},
	{path: 'edit-sub_task/:id', component: EditSubtaskComponent},
	{path: 'search', component: DetailSearchComponent},
	{path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);