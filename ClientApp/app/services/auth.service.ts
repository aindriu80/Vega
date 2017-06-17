// app/auth.service.ts

import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

// Avoid name not found warnings
import Auth0Lock from 'auth0-lock';
//import auth0 from 'auth0-js';

@Injectable()
export class Auth {

    //auth0 = new auth0.WebAuth({
    //   clientID: 'smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT',
    //   domain: 'aindriu80.eu.auth0.com',
    //   responseType: 'token',
    //   audience: 'https://aindriu80.eu.auth0.com/userinfo',
    //   redirectUri: 'http://localhost::11562/callback',      
    //   scope: 'openid'
    // });


    profile: any;
  private roles:string[] = [];


    // Configure Auth0
    lock = new Auth0Lock('smlkRNkeVFWJUpu9l9w6rVf2ShJLYoNT', 'aindriu80.eu.auth0.com', {});

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));

        var token = localStorage.getItem('token');
        if (token) {
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vega.com/roles'];
        }

        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('token', authResult.accessToken);

            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(authResult.accessToken);
            this.roles = decodedToken['https://vega.com/roles'];

            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error)
                    throw error;

                console.log(profile);
                localStorage.setItem('profile', JSON.stringify(profile));
                this.profile = profile;
            });
        });
    }

    public isInRole(roleName){
            return this.roles.indexOf(roleName) > -1;
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
        this.roles = [];
    }


}