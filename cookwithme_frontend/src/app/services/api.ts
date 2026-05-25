import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient)

  serverUrl = 'http://localhost:3000'
  registerAPI(reqBody:any){
   return this.http.post(`${this.serverUrl}/register`,reqBody)
  }
  loginAPI(reqBody:any){
   return this.http.post(`${this.serverUrl}/login`,reqBody)
  }
}
