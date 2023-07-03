import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/services/album.service';
import { AlbumBoxComponent } from './../album-box/album-box.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit {

  albums: Album[] = [];
  public visible = false;
  showData: boolean = false;

  displayedColumns: string[] = ['title', 'groupName','releaseDate', 'action'];
  dataSource = new MatTableDataSource<Album>();

  selectedInstrumentIds: number[] = [];
  selectedTypeIds: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(private albumService: AlbumService, 
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.albumService.getAll().subscribe(
      (data) => {
        this.albums = data;

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
    const dialogRef = this.dialog.open(AlbumBoxComponent, {
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

  addRowData(row_obj: any) {
    var d = new Date();
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }

    var releaseDate = [ row_obj.releaseDate.getFullYear(), 
      padTo2Digits(row_obj.releaseDate.getMonth() + 1), 
      padTo2Digits(row_obj.releaseDate.getDate()) 
    ].join('-');

    const newData = [...this.dataSource.data];
    const newAlbum: Album = {
      id: d.getTime(),
      groupName: row_obj.groupName,
      title: row_obj.title,
      releaseDate: releaseDate,
      status: true
    };

    this.albumService.create(newAlbum).subscribe(
      (response) => {
        console.log('New item added:', response);
        this.albumService.getAll().subscribe(
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

  updateRowData(row_obj: Album) {
      

    this.albumService.update(row_obj.id, row_obj).subscribe(
      (response) => {
        const dataArray = this.dataSource.data;
        const updatedArray = dataArray.map((value) => {
          if (value.id === row_obj.id) {
            return { ...value, name: row_obj.title };
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
    this.albumService.delete(row_obj.id).subscribe(
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
