import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchPipe } from '../../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-allrecipes',
  imports: [CommonModule,DatePipe, SearchPipe, FormsModule, Header, Footer,NgxPaginationModule,RouterLink],
  templateUrl: './allrecipes.html',
  styleUrl: './allrecipes.css',
})
export class Allrecipes implements OnInit {

  allRecipe:any[]=[]
  p: number = 1;
  isLoggedIn:boolean = false

  today:any=new Date()

  searchKey:string = ""
  filteredRecipes:any[]=[]
  selectedCuisine:string = 'All'
  selectedMeal:string = 'All'

  private apiService = inject(Api)
  private router = inject(Router)

  ngOnInit(): void {

    const token = sessionStorage.getItem('token')
    if(token){
      this.isLoggedIn = true
      this.getAllrecipes()
    }
    else{
      this.isLoggedIn = false
    }
  }

  handleFilter(filter:any){
    console.log(filter);
    if(filter == "All"){
      this.filteredRecipes = this.allRecipe
    }
    else{
      this.filteredRecipes = this.allRecipe.filter((item:any) =>item.cuisine.toLowerCase().trim()  == filter.toLowerCase().trim() || item.mealType.includes(filter))
    }
  }


  getAllrecipes(){
    this.apiService.getAllrecipesAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allRecipe = res.recipes
        this.filteredRecipes = this.allRecipe
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
