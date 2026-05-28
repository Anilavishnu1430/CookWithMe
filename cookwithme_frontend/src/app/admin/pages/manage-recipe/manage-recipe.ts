import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-manage-recipe',
  imports: [AdminHeader, Sidebar],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe implements OnInit {

  recipeId:any

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['id']
  }
}
