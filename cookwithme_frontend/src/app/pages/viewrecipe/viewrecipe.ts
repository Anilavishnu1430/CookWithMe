import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-viewrecipe',
  imports: [RouterModule, Footer, Header],
  templateUrl: './viewrecipe.html',
  styleUrl: './viewrecipe.css',
})
export class Viewrecipe implements OnInit {
  selectedRecipeId:any
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    
    this.getARecipe(id)
  }
  recipeDetails:any = []
  recipeId:any = ""

  private apiService = inject(Api)
  private activatedRoute = inject(ActivatedRoute)
  
  getARecipe(id:any){
    this.apiService.getARecipeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.recipeDetails = res.getARecipe
        this.recipeId = res.getARecipe._id
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  addDownload(){
    this.apiService.addDownloadRecipeAPI(this.recipeId,this.recipeDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.generatePDF()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  generatePDF(){
    //create pdf object
    const pdf = new jsPDF()
    //For styling
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipeDetails.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    //pdf contents
    pdf.text(`Cuisine : ${this.recipeDetails.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipeDetails.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipeDetails.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipeDetails.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipeDetails.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipeDetails.caloriesPerServing}`,10,45)
    //Table creation
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []

    body.push([this.recipeDetails.ingredients,this.recipeDetails.instructions])
    //table generation
    autoTable(pdf,{head,body,startY:50})

    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
        }
}
