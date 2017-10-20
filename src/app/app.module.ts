import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlaygroundListComponent } from './playground-list.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { FrameComponent } from './frame.component'
import { CreateCustomerComponent } from './create-customer.component'
import { SuccessModalComponent } from './success-modal.component';
import { DelayLoadingModalComponent } from './delay-loading-modal.component';

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
    DelayLoadingModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
          delay: 0
        }
      },
      {
        path: 'slow-signin',
        component: LoginComponent,
        data: {
          delay: 5000
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
            component: CreateCustomerComponent
          }
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
