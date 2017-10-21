import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { PlaygroundListComponent } from './playground-list.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { FrameComponent } from './frame.component'
import { CreateCustomerComponent } from './create-customer.component'
import { SuccessModalComponent } from './success-modal.component';
import { ErrorModalComponent } from './error-modal.component';
import { DelayLoadingModalComponent } from './delay-loading-modal.component';
import { CreateUserComponent } from './create-user.component';
import { LoadingModalComponent } from './loading-modal.component';
import { ListUserComponent } from './list-user.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundListComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    FrameComponent,
    CreateCustomerComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    DelayLoadingModalComponent,
    CreateUserComponent,
    LoadingModalComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'signin',
        component: LoginComponent,
        data: {
          delay: 0,
          successRate: 100
        }
      },
      {
        path: 'slow-signin',
        component: LoginComponent,
        data: {
          delay: 5000,
          successRate: 100
        }
      },
      {
        path: 'unstable-signin',
        component: LoginComponent,
        data: {
          delay: 1000,
          successRate: 30
        }
      }
    ]),
    RouterModule.forChild([
      {
        path: 'user',
        component: FrameComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'create-customer',
            component: CreateCustomerComponent,
            data: {
              delays: [100, 300]
            }
          },
          {
            path: 'intermittently-slow-create-customer',
            component: CreateCustomerComponent,
            data: {
              delays: [100, 8000]
            }
          },
          {
            path: 'create-user',
            component: CreateUserComponent
          },
          {
            path: 'list-user',
            component: ListUserComponent
          }
        ]
      }
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
