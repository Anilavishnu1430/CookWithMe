import { Component, inject, OnInit } from '@angular/core';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Api } from '../../../services/api';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-download-list',
  imports: [AdminHeader, Sidebar,NgxPaginationModule],
  templateUrl: './download-list.html',
  styleUrl: './download-list.css',
})
export class DownloadList implements OnInit {
index: number=0;
  ngOnInit(): void {
    this.getAllDownloads()
  }
  downloadArrayList:any = []
  p: number = 1;

  private apiService = inject(Api)
  getAllDownloads(){
    this.apiService.getDownloadRecipeAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.downloadArrayList = res.getdownloads
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
