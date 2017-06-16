﻿// app/auth.service.ts

import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
import Auth0Lock from 'auth0-lock';
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
    

    profile: any;


    // Configure Auth0
    lock = new Auth0Lock('smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT', 'aindriu80.eu.auth0.com', {});

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));

        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('token', authResult.accessToken);

            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error)
                    throw error;

                console.log(profile);
                localStorage.setItem('profile', JSON.stringify(profile));
                this.profile = profile;
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'token'
        return tokenNotExpired('token');
    }

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.profile = null;
    }
}