import { Component} from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  dogBreeds: any= [];
  subBreeds: any=[];

  selectedBreed: any = "";
  selectedSubBreed: any = "";

  hasSubBreed: boolean = false;

  dogImage: any = "https://dog.ceo/img/dog-api-logo.svg";

  constructor(private http: HttpClient){
    this.getDogData();
  }

  //Fetches list of dog breeds from DOGS CEO API
  getDogData(): void {
    this.http
      .get('https://dog.ceo/api/breeds/list/all')
      .subscribe((breeds: any)=>{
          this.dogBreeds = breeds["message"];
      });
  }

  //Checks if a chosen breed has subbreeds
  subBreedCheck(dog: any): boolean {
    if(this.dogBreeds[dog].length>0){
       this.hasSubBreed=true;
       return true
    }

    return false;
  }

  //if a breed doesn't contain subbreeds fetch the image of selected breed from DOG CEO API
  //else reset dog image and call loadSubBreedDropdown function
  loadBreedsDropdown(event: any) {
    this.selectedBreed = event.target.value;

    if(this.subBreedCheck(this.selectedBreed)){
        this.loadSubBreedDropdown(this.selectedBreed);
        this.dogImage="";
    }else{
        this.http.get('https://dog.ceo/api/breed/' + this.selectedBreed + '/images/random')
        .subscribe((result: any)=>{
          this.dogImage = result["message"];
        });
    }
  }

  //Loads the subbreads array with specified subbreads
  loadSubBreedDropdown(dog: any) {
    this.subBreeds = this.dogBreeds[dog];
  }

  //fetches the image of selected subbreed from DOG CEO API
  loadSubBreedImage(event: any) {
      this.selectedSubBreed = event.target.value;
      this.http.get('https://dog.ceo/api/breed/'+ this.selectedBreed + '/' + this.selectedSubBreed + '/images/random')
      .subscribe((result: any)=>{
        this.dogImage = result["message"];
      });
  }

  //returns to main list of breeds when button is clicked
  returnToFullList(): any {
    this.hasSubBreed = false;
    this.selectedSubBreed = "";
    this.dogImage="https://dog.ceo/img/dog-api-logo.svg";
  }

  //return new image
  newImage(): any{
    if(this.selectedSubBreed==""){
        this.http.get('https://dog.ceo/api/breed/'+ this.selectedBreed + '/images/random')
        .subscribe((result: any)=>{
          this.dogImage = result["message"];
        });
    }else{
        this.http.get('https://dog.ceo/api/breed/'+ this.selectedBreed + '/' + this.selectedSubBreed + '/images/random')
        .subscribe((result: any)=>{
          this.dogImage = result["message"];
        });
    }
    
  }

}
