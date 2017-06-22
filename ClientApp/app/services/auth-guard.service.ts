import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected auth: AuthService) { }

    canActivate() {
        if (this.auth.isAuthenticated())
            return true;

        window.location.href = 'https://aindriu80.eu.auth0.com/login?client=smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT';
        return false;
    }
}