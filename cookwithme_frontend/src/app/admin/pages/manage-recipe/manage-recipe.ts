import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-manage-recipe',
  imports: [AdminHeader, Sidebar],
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
