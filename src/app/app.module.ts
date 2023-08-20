import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CreateChildDirective } from './create-child.directive';
import { TaxManagementComponent } from './tax-management/tax-management.component';
import { TableModule } from 'primeng/table';
import { JwtInterceptor } from './tax-management/interceptor/jwt.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CreateChildDirective,
    TaxManagementComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    {  provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
