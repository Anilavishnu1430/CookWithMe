import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder)
  private apiService = inject(Api)
    private router = inject(Router)

  loginForm =this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if(this.loginForm.valid){
      console.log(this.loginForm);
      this.apiService.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
        alert(res.message)
        console.log(res);
        
        this.router.navigateByUrl("/allrecipes")
      },error:(err:any)=>{
        alert(err.error.message)
        console.log(err);
      }})
  }
    else{
      alert("Please fill the Form")
  }
  }
  
}
