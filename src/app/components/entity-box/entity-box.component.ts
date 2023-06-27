import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityType} from "../../model/entity-type";
import {EntityTypeBoxComponent} from "../entity-type-box/entity-type-box.component";
import {Entity} from "../../model/entity";
import {InstrumentService} from "../../services/instrument.service";
import {EntityTypeService} from "../../services/entity-type.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-entity-box',
  templateUrl: './entity-box.component.html',
  styleUrls: ['./entity-box.component.scss']
})
export class EntityBoxComponent implements OnInit{

  action: string;
  local_data: any;

  instruments = new FormControl([]);
  entityTypes = new FormControl([]);

  instrumentList: EntityType[] = [];
  
  entityTypeList: EntityType[] = [];

  instrumentData: any;
  typeData: any;

  constructor(
    public dialogRef: MatDialogRef<EntityBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Entity,
    private instrumentService: InstrumentService,
    private entityTypeService: EntityTypeService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.entityTypeService.list().subscribe((data) => {
      this.entityTypeList = data;
    });

    this.instrumentService.getAll().subscribe((data) => {
      this.instrumentList = data;
    });
  }

  doAction() {
    //   var d = new Date();
    const selectedInstruments: number[] = this.instruments.value as number[];
    const selectedTypes: number[] = this.entityTypes.value as number[];
    
    console.log('Just pour Voir les data :' + selectedInstruments);
    this.dialogRef.close({
      event: this.action,
      data: this.local_data,
      instruments: selectedInstruments,
      entityType: selectedTypes,
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
