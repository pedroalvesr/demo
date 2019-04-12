
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { LoginService } from './../servicos/login.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.loginService.getToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
