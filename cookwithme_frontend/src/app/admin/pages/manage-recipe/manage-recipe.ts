import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { FormsModule } from '@angular/forms';
import { RecipeModel } from '../../model/recipeModel';
import { Api } from '../../../services/api';

@Component({
  selector: 'app-manage-recipe',
  imports: [AdminHeader, Sidebar,FormsModule],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe implements OnInit {

  recipeId:any
  ingridientsArray:any[] = []
  instructionsArray:any[] = []
  mealTypeArray:any[] = ["Dinner","Lunch","Breakfast"]
  cuisineArray: any = [];

  recipeDetails: RecipeModel = {};

  route = inject(ActivatedRoute);
  private apiService = inject(Api)

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['id']
    this.getAllRecipe()
  }

  addIngridients(data:any){
    console.log(data.value);
    const ingridientData = data.value
    if(ingridientData){
      if(this.ingridientsArray.includes(ingridientData)){
        alert("Ingridient already existing")
        ingridientData == ""
        return 
      }
      this.ingridientsArray.push(ingridientData)
      console.log(this.ingridientsArray);
      
    }
    else{
      alert("Please fill the Form")
    }
  }

  deleteIngridients(data:any){
    this.ingridientsArray = this.ingridientsArray.filter(item=>item!=data)
  }

  addInstruction(data:any){
    console.log(data.value);
    const instructionData = data.value
    if(instructionData){
      if(this.instructionsArray.includes(instructionData)){
        alert("Instructions already existing")
        instructionData == ""
        return
      }
      this.instructionsArray.push(instructionData)
      console.log(this.instructionsArray);
      
    }
    else{
      alert("please fill the form")
    }
  }

  deleteInstructions(data:any){
    this.instructionsArray = this.instructionsArray.filter(item=>item!=data)
  }

  getMealType(event: any) {

  const mealType = event.target.name;
  // checkbox checked
  if (event.target.checked) {

    if (!this.mealTypeArray.includes(mealType)) {
      this.mealTypeArray.push(mealType);
    }

  }
  // checkbox unchecked
  else {

    this.mealTypeArray = this.mealTypeArray.filter(
      (item: string) => item !== mealType
    );

  }
  console.log(this.mealTypeArray);
}

addRecipe() {
  // attach arrays before validation
  this.recipeDetails.ingredients = this.ingridientsArray || [];
  this.recipeDetails.instructions = this.instructionsArray || [];
  this.recipeDetails.mealType = this.mealTypeArray || [];

  const {
    name,
    ingredients = [],
    instructions = [],
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    difficulty,
    cuisine,
    caloriesPerServing,
    image,
    mealType = [],
  } = this.recipeDetails;

  if (
    name?.trim() &&
    ingredients.length > 0 &&
    instructions.length > 0 &&
    prepTimeMinutes != null &&
    cookTimeMinutes != null &&
    servings != null &&
    difficulty?.trim() &&
    cuisine?.trim() &&
    caloriesPerServing != null &&
    image?.trim() &&
    mealType.length > 0
  ) {
    this.apiService.addRecipeAPI(this.recipeDetails).subscribe((res: any) => {
      console.log(res);
      alert('Recipe added successfully!');
    });
  } else {
    alert('Please fill the form completely');
  }
}

 editRecipe() {
  this.recipeDetails.ingredients = this.ingridientsArray;
  this.recipeDetails.instructions = this.instructionsArray;
  this.recipeDetails.mealType = this.mealTypeArray;

  const {
    name,
    ingredients = [],
    instructions = [],
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    difficulty,
    cuisine,
    caloriesPerServing,
    image,
    mealType = [],
  } = this.recipeDetails;

  if (
    name?.trim() &&
    ingredients.length > 0 &&
    instructions.length > 0 &&
    prepTimeMinutes != null &&
    cookTimeMinutes != null &&
    servings != null &&
    difficulty?.trim() &&
    cuisine?.trim() &&
    caloriesPerServing != null &&
    image?.trim() &&
    mealType.length > 0
  ) {
    this.apiService.updateRecipeAPI(this.recipeId,this.recipeDetails).subscribe((res: any) => {
      console.log(res);
      alert('Recipe Updated successfully!');
    });
  } else {
    alert('Please fill the form completely');
  }
  }

  getAllRecipe() {
    this.apiService.getAllrecipesAPI().subscribe((res: any) => {
      console.log(res);
       this.recipeDetails=res.recipes
      if(this.recipeId){
        this.recipeDetails = res.recipes.find((item:any)=>item._id==this.recipeId)
         this.ingridientsArray = this.recipeDetails.ingredients || [];
       this.instructionsArray = this.recipeDetails.instructions || []
        this.mealTypeArray = this.recipeDetails.mealType || []

      }
      this.ingridientsArray = this.recipeDetails.ingredients || [];
      this.instructionsArray = this.recipeDetails.instructions || [];
      // this.mealTypeArray=this.recipeDetails.mealType || []
      res.recipes.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) &&
          this.cuisineArray.push(item.cuisine);
      });
      console.log(this.cuisineArray);
      const dummyArray = res.map((item: any) => item.mealType);
      console.log(dummyArray);
      // console.log(dummyArray.flat(Infinity));
      const flatDummyArray = dummyArray.flat(Infinity);
      console.log(flatDummyArray);
      flatDummyArray.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item);
      });
      console.log(this.mealTypeArray);
    });
  }
}



