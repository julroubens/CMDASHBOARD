import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Album } from 'src/app/model/album';

@Component({
  selector: 'app-album-box',
  templateUrl: './album-box.component.html',
  styleUrls: ['./album-box.component.scss']
})
export class AlbumBoxComponent implements OnInit {

  action: string;
  local_data: any;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
    public dialogRef: MatDialogRef<AlbumBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Album
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {}

  doAction() {
    console.log(this.local_data.releaseDate);
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
