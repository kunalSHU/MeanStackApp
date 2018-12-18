import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
export class tableUtil{
    
    headerInit(){
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('X-Zomato-API-Key', '5f8f8c7daa019ccc1553516688930d4f');
        return headers;
    }
}