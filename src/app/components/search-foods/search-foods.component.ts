import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-search-foods',
  templateUrl: './search-foods.component.html',
  styleUrls: ['./search-foods.component.css']
})
export class SearchFoodsComponent implements OnInit {
  selectedIndex = 0;
  foods = [];
  totalFoods = 0;
  foodsPerPage = 10;
  pageSizeOptions = [10, 20, 50];
  currentPage = 1;
  query = '';

  constructor(public foodService: FoodService, 
    public dialogRef: MatDialogRef<SearchFoodsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.foodService.getMyFoods().subscribe((res: any) => {
      console.log(res);
      this.foods = res;
    });
  }

  close(e) {
    this.dialogRef.close(e);
  }

  onSearch(form: NgForm) {
    if (form.invalid) { return; }
    
    if (this.selectedIndex == 0) {
      this.query = form.value.query;
      this.searchFoods();
    } else {
      console.log("Searching my foods...")
    }

    form.resetForm();
  }

  onPageChanged(e: PageEvent) {
    this.currentPage = e.pageIndex + 1;
    this.foodsPerPage = e.pageSize;
    this.searchFoods();
  }

  searchFoods() {
    this.foodService.searchDb(this.query, this.foodsPerPage, this.currentPage).subscribe((res: any) => {
      this.foods = res.foods;
      this.totalFoods = res.count;
    });
  }

}
