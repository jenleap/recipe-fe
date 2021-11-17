import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { resolve } from 'url';

@Injectable()
export class LogService {
    private currentLog: any;
    private logUpdated = new Subject<any>();

    public meals = [
        "breakfast",
        "lunch",
        "dinner",
        "snacks"
      ];

    constructor(private http: HttpClient){}

    getCurrentLog() {
        return this.currentLog;
    }

    getLogUpdateListener() {
        return this.logUpdated.asObservable();
    }

    getLog(date) {
        this.http.get(`http://localhost:5001/api/logs/${date}`)
            .subscribe(res => {
                console.log(res);
                this.currentLog = this.formatLog(res);
                this.logUpdated.next(this.currentLog);
            });
    }

    addFood(food) {
        console.log(food);
        this.http.post("http://localhost:5001/api/logs", food)
            .subscribe(res => {
                this.currentLog = this.formatLog(res);
                this.logUpdated.next(this.currentLog);
            });
    }

    removeFood(date, foodId) {
        this.http.delete(`http://localhost:5001/api/logs?date=${date}&foodId=${foodId}`)
            .subscribe(res => {
                this.currentLog = this.formatLog(res);
                this.logUpdated.next(this.currentLog);
            })
    }

    formatLog(log) {
      return this.meals.map(m => {
          return {
              meal: m,
              foods: log ? log.foods.filter(f => f.meal == m) : null
          }
      });
    }

    updateLog(date, log) {
        this.http.put(`http://localhost:5001/api/logs?date=${date}`, log)
            .subscribe(res => {
                this.currentLog = this.formatLog(res);
                this.logUpdated.next(this.currentLog);
            })
    }
}