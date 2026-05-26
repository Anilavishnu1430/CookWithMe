import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  imports: [],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {

recipeId:any

route = inject(ActivatedRoute);

ngOnInit(){
  this.recipeId = this.route.snapshot.params['id']
}
}
