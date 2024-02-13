import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaginationComponentComponent } from './components/pagination-component/pagination-component.component';
import { HttpRequestInterceptor } from './services/interceptors/http-request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RepoDetailsComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    PaginationComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
