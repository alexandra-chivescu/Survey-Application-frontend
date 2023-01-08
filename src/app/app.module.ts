import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {MatButtonModule} from "@angular/material/button";
import { UserLoginComponent } from './components/user-login/user-login.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { UserMainpageComponent } from './components/user-mainpage/user-mainpage.component';
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatSliderModule} from "@angular/material/slider";
import { CompleteSurveyComponent } from './components/complete-survey/complete-survey.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { ResultsSurveyComponent } from './components/results-survey/results-survey.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'login-user', component: UserLoginComponent},
  {path: 'register-user', component: UserRegisterComponent},
  {path: 'home-user', component: UserMainpageComponent},
  {path: 'complete-survey', component: CompleteSurveyComponent},
  {path: 'create-survey', component: CreateSurveyComponent}
  // {path: 'home-user', component: EditDialogComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    LandingPageComponent,
    UserMainpageComponent,
    UserRegisterComponent,
    ToolbarComponent,
    CompleteSurveyComponent,
    CreateSurveyComponent,
    ResultsSurveyComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ExtendedModule,
    FlexModule,
    MatSliderModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
