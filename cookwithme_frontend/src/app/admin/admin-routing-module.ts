import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ManageRecipe } from './pages/manage-recipe/manage-recipe';
import { RecipeList } from './pages/recipe-list/recipe-list';
import { UserList } from './pages/user-list/user-list';
import { DownloadList } from './pages/download-list/download-list';

const routes: Routes = [
  { 
    path: '', component: Dashboard 
  },
  { 
    path: 'recipeList', component: RecipeList 
  },
  { 
    path: 'recipe/add', component: ManageRecipe 
  },
  { 
    path: 'recipe/edit/:id', component: ManageRecipe 
  },
  { 
    path: 'userList', component: UserList 
  },
  { 
    path: 'downloadList', component: DownloadList 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
