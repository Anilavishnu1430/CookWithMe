import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-viewrecipe',
  imports: [RouterModule],
  templateUrl: './viewrecipe.html',
  styleUrl: './viewrecipe.css',
})
export class Viewrecipe implements OnInit {
  selectedRecipeId:any
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    //const id = this.apiService.selectedRecipeId
    this.getARecipe(id)
  }
  recipeDetails:any[] = []

  private apiService = inject(Api)
  private activatedRoute = inject(ActivatedRoute)
  
  getARecipe(id:any){
    this.apiService.getARecipeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.recipeDetails = res.getARecipe
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
