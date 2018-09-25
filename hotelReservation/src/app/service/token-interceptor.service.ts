import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AppService } from './app.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private appService: AppService) { }

  intercept(req, next){
    let tokenizedReq = req.clone({
      setHeaders: {
        Authortization: `Bearer ${this.appService.getUserToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
