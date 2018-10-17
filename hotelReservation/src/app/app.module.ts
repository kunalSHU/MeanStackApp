import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NgProgressModule} from '@ngx-progressbar/core';
import {AgmCoreModule} from '@agm/core';
import {AppService} from '../app/service/app.service';
import {LoginGuard} from '../app/login/login.guard';
import { HttpModule } from '@angular/http';
import {TokenInterceptorService} from '../app/service/token-interceptor.service';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './login/login.component';
import { RegisterComponent, SubmitComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CuisineTableComponent } from './cuisine-table/cuisine-table.component';
import { NavPicComponent } from './nav-pic/nav-pic.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantTableComponent, DialogOverviewExampleDialog } from './restaurant-table/restaurant-table.component';
//import { CuisineTableComponent } from './cuisine-table/cuisine-table.component';
//import { CuisineTableDataSource } from './cuisine-table/cuisine-table-datasource';
@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
  ],
  declarations: [],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class DemoMaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyD153ySYhJSsAxppuq-BDLRFJ7GTy1PKe4', libraries : ['places']}),
    HttpClientModule,
    AngularSvgIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    HttpModule,
    ReactiveFormsModule,DemoMaterialModule,NgProgressModule.forRoot()
  ],
  entryComponents: [AppComponent, SubmitComponent, DialogOverviewExampleDialog],
  declarations: [AppComponent,RestaurantTableComponent,DialogOverviewExampleDialog ,RestaurantsComponent,NavPicComponent,CuisineTableComponent,LoginComponent,RegisterComponent, SubmitComponent, HomeComponent],
  bootstrap: [AppComponent],  providers: [AppService,/*CuisineTableDataSource,*/HttpClientModule,LoginGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}