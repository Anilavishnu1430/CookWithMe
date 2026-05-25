import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder)
  private apiService = inject(Api)
  private router = inject(Router)

  registerForm =this.fb.group({
    username:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register(){
    const username = this.registerForm.value.username
    const email = this.registerForm.value.email
    const password = this.registerForm.value.password

    if(this.registerForm.valid){
      console.log(this.registerForm);

      this.apiService.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
        alert(res.message)
        console.log(res);
        
        this.router.navigateByUrl("/login")
      },error:(err:any)=>{
        alert(err.error.message)
        console.log(err);
      }})

    }
    else{
      alert("Please fill the form")
    }
  }
}
