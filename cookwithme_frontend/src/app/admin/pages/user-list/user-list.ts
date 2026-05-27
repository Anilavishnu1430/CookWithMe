import { Component, inject, OnInit } from '@angular/core';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Api } from '../../../services/api';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  imports: [AdminHeader, Sidebar,NgxPaginationModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  ngOnInit(): void {
    this.getUserlist()
  }
  allUsers:any = []
  p: number = 1;
  private apiService = inject(Api)

  getUserlist(){
    this.apiService.getUserlistAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers = res.getAllUsers
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
