import {Component, OnInit, ViewChild} from '@angular/core';
import {Instrument} from "../../model/instrument";
import {Entity} from "../../model/entity";
import {EntityBoxComponent} from "../entity-box/entity-box.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {EntityService} from "../../services/entity.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  entities: Entity[] = [];
  public visible = false;
  showData: boolean = false;

  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource = new MatTableDataSource<Entity>();

  selectedInstrumentIds: number[] = [];
  selectedTypeIds: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(private entityService: EntityService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.entityService.getAll().subscribe(
      (data) => {
        this.entities = data;

        if (data && data.length) {
          this.showData = true;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        } else {
          this.showData = false;
        }
      },
      (error) => console.error(error)
    );
  }

  openDialog(action: any, obj: { action: any; event: any }) {
    obj.action = action;
    const dialogRef = this.dialog.open(EntityBoxComponent, {
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data, result.instruments, result.entityType);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any, selectedInstruments: any, selectedType: any) {
    var d = new Date();

    let selectedInstrument: number[] = [];
    if (selectedInstruments.value && selectedInstruments.value.length > 0) {
      selectedInstruments = selectedInstruments.value.map(
        (instrument: Instrument
        ) => instrument.id
      );
    }

    const selectedTypes: number[] = Array.isArray(selectedType.value)
    ? selectedType.value
    : selectedType.value ? [selectedType.value] : [];


    // console.log("SELECTED INSTRUMENT ID :"+selectedInstruments);
    // const newData = [...this.dataSource.data];
    // var jsonTypes = JSON.stringify(selectedTypes);
    // var jsonInstru = JSON.stringify(selectedInstrument);

    const newEntity: Entity = {
      id: d.getTime(),
      name: row_obj.name,
      status: true,
      instruments: [10041,10043,10044],
      types: [10034,10035,10036],
    };

   /*  console.log('All item from Tog3', selectedTypes);

    console.log('All item from Tog', selectedInstruments); */

    this.entityService.create(newEntity).subscribe(
      (response) => {
        // console.log('New item added:', response);
        // console.log('All item from Tog3', selectedTypes);
        // console.log('All item from Tog', selectedInstruments);

        /* selectedTypes.forEach(type => {
          //Do thing here
          
        });
        selectedInstruments.forEach(instru => {
          //Do thing here
          
        }); */

        this.entityService.getAll().subscribe(
          (newData) => {
            this.dataSource.data = newData;
            this.table.renderRows();
          },
          (error) => {
            console.error('Error retrieving updated data:', error);
          }
        );
      },
      (error) => {
        console.error('Error adding new item:', error);
      }
    );
  }

  updateRowData(row_obj: Entity) {
    this.entityService.update(row_obj.id, row_obj).subscribe(
      (response) => {
        const dataArray = this.dataSource.data;
        const updatedArray = dataArray.map((value) => {
          if (value.id === row_obj.id) {
            return { ...value, name: row_obj.name };
          }
          return value;
        });
        this.dataSource.data = updatedArray;
      },
      (error) => {
        console.error('Error updating item:', error);
      }
    );
  }

  deleteRowData(row_obj: { id: any }) {
    this.entityService.delete(row_obj.id).subscribe(
      (response) => {
        const dataArray = this.dataSource.data;
        const filteredArray = dataArray.filter(
          (value) => value.id !== row_obj.id
        );
        this.dataSource.data = filteredArray;
      },
      (error) => {
        console.error('Error deleting item');
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
