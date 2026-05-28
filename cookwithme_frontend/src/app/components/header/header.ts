import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  
  private router = inject(Router)

  isLoggedIn:boolean = false
  user:any = ""

  ngOnInit() {
    const token = sessionStorage.getItem('token')
    if(token){
      this.isLoggedIn = true
      this.user = JSON.parse(sessionStorage.getItem('user') || '')
    }
    else{
      this.isLoggedIn = false
    }
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
