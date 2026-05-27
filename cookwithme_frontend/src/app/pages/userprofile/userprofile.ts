import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-userprofile',
  imports: [Header, Footer],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css',
})

export class Userprofile implements OnInit {
  ngOnInit(): void {
    this.getAllDownloads()
  }

  downloadList:any = []
  private apiService = inject(Api)

  getAllDownloads(){
    this.apiService.getDownloadRecipeAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.downloadList = res.getdownloads
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteRecipe(id:any){
    this.apiService.deleteDownloadRecipeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllDownloads()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
