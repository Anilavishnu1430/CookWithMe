import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, Footer, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
