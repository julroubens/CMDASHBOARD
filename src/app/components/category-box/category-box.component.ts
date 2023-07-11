import { Component, OnInit, Inject, Optional } from '@angular/core';
import { EntityTypeBoxComponent } from '../entity-type-box/entity-type-box.component';
import { Category } from 'src/app/model/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements OnInit {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<CategoryBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {}

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
