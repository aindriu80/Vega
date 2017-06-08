import { Auth0Lock } from 'auth0-lock';
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: 'smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT',
        domain: 'aindriu80.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://aindriu80.eu.auth0.com/userinfo',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid'
    });

    constructor(public router: Router) {}

    public login(): void {
        this.auth0.authorize();
    }

}