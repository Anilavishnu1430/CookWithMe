import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  appendToken(){
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //Get A Recipe
  getARecipeAPI(id:any){
   return this.http.get(`${this.serverUrl}/getarecipe/${id}`,this.appendToken())
  }

  //Add Downloaded Recipe
  addDownloadRecipeAPI(id:any,reqBody:any){
   return this.http.post(`${this.serverUrl}/download/${id}`,reqBody,this.appendToken())
  }

  //Get All Downloads
  getDownloadRecipeAPI(){
   return this.http.get(`${this.serverUrl}/getdownload`,this.appendToken())
  }

  //delete Download Recipe
  deleteDownloadRecipeAPI(id:any){
   return this.http.delete(`${this.serverUrl}/deletedownload/${id}`,this.appendToken())
  }

  //Delete Recipe
  deleteRecipeAPI(id:any){
   return this.http.delete(`${this.serverUrl}/deleterecipe/${id}`,this.appendToken())
  }

  //get All Users
  getUserlistAPI(){
   return this.http.get(`${this.serverUrl}/getallusers`,this.appendToken())
  }

  //Add Recipe
  addRecipeAPI(reqBody:any){
   return this.http.post(`${this.serverUrl}/addrecipe`,reqBody,this.appendToken())
  }

  //update Recipe
  updateRecipeAPI(id:any,reqBody:any){
   return this.http.put(`${this.serverUrl}/updaterecipe/${id}`,reqBody,this.appendToken())
  }

}
