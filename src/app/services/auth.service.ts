import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const storageToken = 'nutri-token';

@Injectable({ providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>(); 

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return localStorage.getItem(storageToken);
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getAuthStatus() {
        const token = this.getToken();
        this.isAuthenticated = (token) ? true : false;
        this.authStatusListener.next(this.isAuthenticated);
        return this.isAuthenticated;
    }

    login(email: string, password: string) {
        const creds = {
            email, 
            password
        };
        this.http.post<{token: string}>("http://localhost:5001/api/auth/login", creds)
            .subscribe(res => {
                if (res.token) {
                    //this.token = res.token;
                    localStorage.setItem(storageToken, res.token);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(this.isAuthenticated);
                    this.router.navigate(['/']);
                }
            });
    }

    logout() {
        //this.token = null;
        localStorage.removeItem(storageToken);
        this.isAuthenticated = false;
        this.authStatusListener.next(this.isAuthenticated);
        this.router.navigate(['/login']);
    }

}