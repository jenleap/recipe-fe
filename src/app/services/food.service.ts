import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';


@Injectable()
export class FoodService {

    constructor(private http: HttpClient){}

    searchDb(query: string, pageSize, currentPage) {
        return this.http.get(`http://localhost:5010/foods?search=${query}&page=${currentPage}&pagesize=${pageSize}`);
    }

    getMyFoods() {
       return this.http.get("http://localhost:5001/api/foods");
    }

    addFood(food: Food) {
        console.log(food);
        this.http.post("http://localhost:5001/api/foods", food)
            .subscribe(res => console.log(res));
    }
}