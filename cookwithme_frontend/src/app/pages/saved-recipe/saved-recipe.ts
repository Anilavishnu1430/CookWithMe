import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Api } from '../../services/api';

@Component({
  selector: 'app-saved-recipe',
  imports: [Header, Footer],
  templateUrl: './saved-recipe.html',
  styleUrl: './saved-recipe.css',
})
export class SavedRecipe implements OnInit {
  ngOnInit(): void {
    this.getAllsavedRecipe()
  }
  savedList:any = []
  private apiService = inject(Api)

  getAllsavedRecipe(){
    this.apiService.getSavedRecipeAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.savedList = res.getSaverecipe
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteRecipe(id:any){
    this.apiService.deleteSavedRecipeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert(res.message)
        this.getAllsavedRecipe()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
