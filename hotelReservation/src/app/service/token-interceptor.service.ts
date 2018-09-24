import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next){
    console.log("IN THE TOKEN INTERCEPTOR");
    console.log(localStorage.getItem('token'));
    let tokenizedReq = req.clone({
      setHeaders: {
        Authortization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(tokenizedReq);
  }

}
