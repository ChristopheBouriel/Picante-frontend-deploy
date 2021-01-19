import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: string;

  constructor(private http: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('https://so-pekocko-backend.herokuapp.com/api/auth/signup', {email: email, password: password}).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          console.log(error)
          if(error.error.error)
         {
           reject(error.error.error.errors.email)
         } else {
          
          reject(error.error);}
        }
      );
    });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password) {
    return new Promise((resolve, reject) => {
      this.http.post('https://so-pekocko-backend.herokuapp.com/api/auth/login', {email: email, password: password}).subscribe(
        (response: {userId: string, token: string}) => {
          this.userId = response.userId;
          this.authToken = response.token;
          this.isAuth$.next(true);
          resolve(response);
        },
        (error) => {
          console.log(error)
          if(error.error.error) {
          let err = error.error
          reject(err);  
          } else {reject(error)}
          
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}
