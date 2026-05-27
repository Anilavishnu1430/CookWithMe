import { Component, inject, OnInit } from '@angular/core';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterLink } from '@angular/router';
import { Api } from '../../../services/api';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-recipe-list',
  imports: [AdminHeader, Sidebar,RouterLink,NgxPaginationModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  ngOnInit(): void {
    this.getAllrecipes()
  }
  p: number = 1;
  recipes:any = []
  

  private apiService = inject(Api)

  getAllrecipes(){
    this.apiService.getAllrecipesAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.recipes = res.recipes
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteRecipe(id:any){
    this.apiService.deleteRecipeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllrecipes()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
