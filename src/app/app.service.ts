import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public allDogBreeds: any = [];

  constructor(private http: HttpClient) {
    this.getDogData();
  }

  getDogData(): void {
    this.http
        .get('https://dog.ceo/api/breeds/list/all')
        .subscribe((breeds: any)=>{
            this.allDogBreeds = breeds["message"];
        });
  }
}
