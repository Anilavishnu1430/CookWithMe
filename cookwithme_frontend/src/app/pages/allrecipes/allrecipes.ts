import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SearchPipe } from '../../pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allrecipes',
  imports: [DatePipe,SearchPipe,FormsModule],
  templateUrl: './allrecipes.html',
  styleUrl: './allrecipes.css',
})
export class Allrecipes implements OnInit {

  allRecipe:any[]=[]

  ngOnInit(): void {
    this.getAllrecipes()
  }
  
  today:any=new Date()

  searchKey:string = ""

  private apiService = inject(Api)
  private router = inject(Router)

  getAllrecipes(){
    this.apiService.getAllrecipesAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allRecipe = res.recipes
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  viewRecipe(id:any){
    console.log(id); 
    this.router.navigateByUrl(`/viewrecipe/${id}`)
  }
}
