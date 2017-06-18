import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: Auth) { }

    canActivate(){
        if (this.auth.authenticated())
        return true;

        window.location.href = 'https://aindriu80.eu.auth0.com/login?client=smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT';
        return false;
    }
}