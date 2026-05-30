import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [Header, Footer,RouterLink,FormsModule],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css',
})

export class Userprofile implements OnInit {
  ngOnInit(): void {
    this.getAllDownloads()
    this.getProfile()
  }

  profileImage: string = '';
  imageInput: string = '';
  showProfileForm = false;

  openProfileForm() {
  this.showProfileForm = true;
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
        alert(res.message)
        this.getAllDownloads()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  updateProfile(){
    const reqBody = {
      image: this.imageInput
    }
    this.apiService.updateProfileAPI(reqBody).subscribe({
      next: (res: any) => {
        console.log(res);
        this.profileImage = this.imageInput;
        alert(res.message);
        this.showProfileForm = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }


  getProfile(){
  this.apiService.getProfileAPI().subscribe({
    next:(res:any)=>{
      this.profileImage = res.image;
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
}
}
