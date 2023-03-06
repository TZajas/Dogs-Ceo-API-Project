import { Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  dogBreeds: any=[];
  breedImages: any=[];
  dogImage: any = "";
  randomImage: any;

  title = 'dogs-API-Implementation';

  constructor(private http: HttpClient){
    this.getDogData();
  }

  ngOnInit(): void {

  }

  getDogData(): void {
    this.http
        .get('https://dog.ceo/api/breeds/list/all')
        .subscribe((breeds: any)=>{
            this.dogBreeds = breeds["message"];
        });
  }

  loadBreed(event: any) {
    //var response = this.http.get('https://dog.ceo/api/breed/' + event.target.value + '/images');
    this.http.get('https://dog.ceo/api/breed/' + event.target.value + '/images')
      .subscribe((res: any)=>{
        this.breedImages = res["message"];
        this.randomImage = Math.floor( Math.random() * this.breedImages.length );
        this.dogImage = this.breedImages[this.randomImage];
    });
  }
}
