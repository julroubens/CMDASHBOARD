import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityType} from "../../model/entity-type";

@Component({
  selector: 'app-entity-type-box',
  templateUrl: './entity-type-box.component.html',
  styleUrls: ['./entity-type-box.component.scss']
})
export class EntityTypeBoxComponent implements OnInit {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<EntityTypeBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EntityType
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
