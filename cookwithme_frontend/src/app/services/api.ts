import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient)

  serverUrl = 'http://localhost:3000'

  //register API
  registerAPI(reqBody:any){
   return this.http.post(`${this.serverUrl}/register`,reqBody)
  }

  //Login API
  loginAPI(reqBody:any){
   return this.http.post(`${this.serverUrl}/login`,reqBody)
  }

  //Get All Recipes API
  getAllrecipesAPI(){
   return this.http.get(`${this.serverUrl}/recipes`)
  }

  //Get A Recipe
  getARecipeAPI(id:any){
   return this.http.get(`${this.serverUrl}/getarecipe/${id}`)
  }
}
