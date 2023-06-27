import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { InstrumentBoxComponent } from '../instrument-box/instrument-box.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InstrumentService } from 'src/app/services/instrument.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit, AfterViewInit {

  instruments: Instrument[] = [];
  public visible = false;
  showData: boolean = false;

  displayedColumns: string[] = ['name', 'img', 'status', 'action'];
  dataSource = new MatTableDataSource<Instrument>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(
    private instrumentService: InstrumentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.instrumentService.getAll().subscribe(
      (data) => {
        this.instruments = data;

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
    const dialogRef = this.dialog.open(InstrumentBoxComponent, {
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: { name: any }) {
    var d = new Date();
    const newData = [...this.dataSource.data];
    const newItem: Instrument = {
      id: d.getTime(),
      name: row_obj.name,
      status: true,
      img: '',
    };

    this.instrumentService.create(newItem).subscribe(
      (response) => {
        console.log('New item added:', response);
        this.instrumentService.getAll().subscribe(
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

  updateRowData(row_obj: Instrument) {
    this.instrumentService.update(row_obj.id, row_obj).subscribe(
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
    this.instrumentService.delete(row_obj.id).subscribe(
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
