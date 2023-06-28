import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SongComponent } from '../song/song.component';
import { Song } from 'src/app/model/song';
import { FormControl } from '@angular/forms';
import { Entity } from 'src/app/model/entity';
import { Instrument } from 'src/app/model/instrument';
import { Album } from 'src/app/model/album';
import { Category } from 'src/app/model/category';
import { EntityService } from 'src/app/services/entity.service';
import { CategoryService } from 'src/app/services/category.service';
import { InstrumentService } from 'src/app/services/instrument.service';
import { AlbumService } from './../../services/album.service';

@Component({
  selector: 'app-song-box',
  templateUrl: './song-box.component.html',
  styleUrls: ['./song-box.component.scss']
})
export class SongBoxComponent implements OnInit {

  action: string;
  local_data: any;

  instrumentsFormControl = new FormControl([]);
  entitysFormControl = new FormControl([]);
  albumsFormControl = new FormControl([]);
  categoriesFormControl = new FormControl([]);

  instrumentList: Instrument[] = [];
  entityList: Entity[] = [];
  albumList: Album[] = [];
  categoryList: Category[] = [];

  instrumentData: any;
  typeData: any; 

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
              public dialogRef: MatDialogRef<SongComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Song,
              private entityService: EntityService,
              private categoryService: CategoryService,
              private instrumentService: InstrumentService,
              private albumService: AlbumService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.entityService.getAll().subscribe((data) => {
      this.entityList = data;
    });

    this.instrumentService.getAll().subscribe((data) => {
      this.instrumentList = data;
    });

    this.albumService.getAll().subscribe((data) =>{
      this.albumList = data;
    });

    this.categoryService.getAll().subscribe((data) => {
      this.categoryList = data;
    });
  }

  doAction() {
    const selectedInstruments: number[] = this.instrumentsFormControl.value as number[];
    const selectedEntitys: number[] = this.entitysFormControl.value as number[];

    const selectedCategory: number = this.categoriesFormControl.value as unknown as number;
    const selectedAlbum : number = this.albumsFormControl.value as unknown as number;

    
    this.dialogRef.close({ 
      event: this.action, 
      data: this.local_data,
      category : selectedCategory,
      album: selectedAlbum,
      instruments: selectedInstruments,
      entitys: selectedEntitys
     });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
