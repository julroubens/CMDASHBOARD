import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EntityType} from "../../model/entity-type";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {EntityTypeService} from "../../services/entity-type.service";
import {MatDialog} from "@angular/material/dialog";
import {EntityTypeBoxComponent} from "../entity-type-box/entity-type-box.component";

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss']
})
export class EntityTypeComponent implements OnInit, AfterViewInit {
  entityTypes: EntityType[] = [];
  public visible = false;
  showData: boolean = false;

  displayedColumns: string[] = ['name', 'status', 'action'];

  
  dataSource = new MatTableDataSource<EntityType>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(
    private entityTypeService: EntityTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.entityTypeService.list().subscribe(
      (data) => {
        this.entityTypes = data;

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
    const dialogRef = this.dialog.open(EntityTypeBoxComponent, {
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
    const newItem = {
      id: d.getTime(),
      name: row_obj.name,
      status: true,
    };

    this.entityTypeService.post(newItem).subscribe(
      (response) => {
        console.log('New item added:', response);
        this.entityTypeService.list().subscribe(
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

  updateRowData(row_obj: EntityType) {
    this.entityTypeService.put(row_obj.id, row_obj).subscribe(
      (response) => {
        const dataArray = this.dataSource.data;
        const updatedArray = dataArray.map((value: { id: number; }) => {
          if (value.id === row_obj.id) {
            return { ...value, name: row_obj.name };
          }
          return value;
        });
        // this.dataSource.data = updatedArray;
      },
      (error) => {
        console.error('Error updating item:', error);
      }
    );
  }

  deleteRowData(row_obj: { id: any }) {
    this.entityTypeService.delete(row_obj.id).subscribe(
      (response) => {
        const dataArray = this.dataSource.data;
        const filteredArray = dataArray.filter(
          (value: { id: any; }) => value.id !== row_obj.id
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
