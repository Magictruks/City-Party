
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { CategoriesComponent } from './components/admin-panel/categories/categories.component';
import { EventsComponent } from './components/admin-panel/events/events.component';
import { MaterialModule } from './material.module';
import { SidebarComponent } from './components/admin-panel/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogCategoriesComponent } from './components/admin-panel/dialog/dialog-categories/dialog-categories.component';
import { DialogEventComponent } from './components/admin-panel/dialog/dialog-event/dialog-event.component';
import { DialogPromoterComponent } from './components/admin-panel/dialog/dialog-promoter/dialog-promoter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/admin-panel/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './components/admin-panel/users/users.component';
import { DialogUserComponent } from './components/admin-panel/dialog/dialog-user/dialog-user.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoriesComponent,
    EventsComponent,
    SidebarComponent,
    DialogCategoriesComponent,
    DialogEventComponent,
    DialogPromoterComponent,
    LoginComponent,
    UsersComponent,
    DialogUserComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    GooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
