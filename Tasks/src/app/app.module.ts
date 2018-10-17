import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreateResponsibleComponent } from './components/responsible/create-responsible/create-responsible.component';
import { DetailResponsibleComponent } from './components/responsible/detail-responsible/detail-responsible.component';
import { EditResponsibleComponent } from './components/responsible/edit-responsible/edit-responsible.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { DetailTaskComponent } from './components/task/detail-task/detail-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { CreateSubtaskComponent } from './components/subtask/create-subtask/create-subtask.component';
import { DetailSubtaskComponent } from './components/subtask/detail-subtask/detail-subtask.component';
import { EditSubtaskComponent } from './components/subtask/edit-subtask/edit-subtask.component';
import { DetailSearchComponent } from './components/search/detail-search/detail-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CreateResponsibleComponent,
    DetailResponsibleComponent,
    EditResponsibleComponent,
    CreateTaskComponent,
    DetailTaskComponent,
    EditTaskComponent,
    CreateSubtaskComponent,
    DetailSubtaskComponent,
    EditSubtaskComponent,
    DetailSearchComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    routing,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
