import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-servings-confirm',
  templateUrl: './servings-confirm.component.html',
  styleUrls: ['./servings-confirm.component.css']
})
export class ServingsConfirmComponent implements OnInit {
  servings = 1;
  selectedDate: any;
  meal: any;
  mealOptions: any;

  constructor(public dialogRef: MatDialogRef<ServingsConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public logService: LogService) { }

  ngOnInit() {
    this.mealOptions = this.logService.meals;
  }

  onAdd() {
    const selections = {
      servings: this.servings,
      selectedDate: this.selectedDate,
      meal: this.meal
    };
    this.dialogRef.close(selections);
  }

  close() {
    this.dialogRef.close();
  }

}
