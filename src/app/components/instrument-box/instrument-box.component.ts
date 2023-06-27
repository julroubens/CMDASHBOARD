import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstrumentComponent } from '../instrument/instrument.component';
import { Instrument } from 'src/app/model/instrument';

@Component({
  selector: 'app-instrument-box',
  templateUrl: './instrument-box.component.html',
  styleUrls: ['./instrument-box.component.scss']
})
export class InstrumentBoxComponent implements OnInit {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<InstrumentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Instrument
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
