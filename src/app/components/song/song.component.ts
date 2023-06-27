import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/services/song.service';
import { SongBoxComponent } from '../song-box/song-box.component';
import { navbarData } from './../sidenav/nav-data';
import { AlbumService } from 'src/app/services/album.service';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Album } from 'src/app/model/album';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit, AfterViewInit {

  songs: Song[] = [];
  public visible = false;
  showData: boolean = false;

  displayedColumns: string[] = ['title', 'artist','album', 'releaseDate', 'category', 'action'];
  dataSource = new MatTableDataSource<Song>();

  selectedInstrumentIds: number[] = [];
  selectedTypeIds: number[] = [];

  albumDetails!: Observable<{ [id: number]: string }>;
  categoryDetails!: Observable<{ [id: number]: string }>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(private songService: SongService,
              private albumService: AlbumService,
              private categoryService: CategoryService, 
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.songService.getAll().subscribe(
      (data) => {
        this.songs = data;
        if (data && data.length) {
          this.showData = true;

          // geting album datails
          const albumIds = data.map(song => song.album);

          const albumTitleObservables = albumIds.map(albumId => this.getAlbumTitle(albumId));
          
          this.albumDetails = combineLatest(albumTitleObservables).pipe(
            map(albumTitles => {
              const albumDetails: { [id: number]: string } = {};
              albumIds.forEach((albumId, index) => {
                const title = albumTitles[index];
                albumDetails[albumId] = title;
              });
              return albumDetails;
            })
          );
          
          //get category details

          const categoryIds = data.map(song => song.category);

          const categoryNameObservables = categoryIds.map(categoryId => this.getCategoryName(categoryId));
          
          this.categoryDetails = combineLatest(categoryNameObservables).pipe(
            map(categoryName => {
              const categoryDetails: { [id: number]: string } = {};
              categoryIds.forEach((categoryId, index) => {
                const name = categoryName[index];
                categoryDetails[categoryId] = name;
              });
              return categoryDetails;
            })
          );

          this.dataSource = new MatTableDataSource<Song>(data as Song[]);
          this.dataSource.paginator = this.paginator;

          
        } else {
          this.showData = false;
        }
      },
      (error) => console.error(error)
    );
  }

  getAlbumTitle(albumId: any): Observable<string> {
    console.log("Hallo ID album :" + albumId)
    const albumTitle = this.albumService.getById(albumId).pipe(
      map(album => album ? album.title : '')
    );
    return albumTitle;
  }

  getCategoryName(categoryId: any): Observable<string> {
    console.log("Hallo ID album :" + categoryId)
    const categoryName = this.categoryService.getById(categoryId).pipe(
      map(category => category ? category.name : '')
    );
    return categoryName;
  }

  // getAlbumTitle(albumId: number): Observable<string>{
  //   this.albumDetails = this.albumService.getById(albumId); // Replace with your actual method to fetch album details
  //   return this.albumDetails.pipe(
  //     map(album => album ? album.title : '')
  //   );
  // }

  openDialog(action: any, obj: { action: any; event: any }) {
    obj.action = action;
    const dialogRef = this.dialog.open(SongBoxComponent, {
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.navbarData);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    var d = new Date();

    // let selectedInstrument: number[] = [];
    // if (selectedInstruments.value && selectedInstruments.value.length > 0) {
    //   selectedInstruments = selectedInstruments.value.map(
    //     (instrument: Instrument) => instrument.id
    //   );
    // }

    // const selectedInstruments = selectedInstruments.filter((instrument: { id: any; }) => this.selectedInstrumentIds.includes(instrument.id));
    // const selectedTypes = selectedTypes.filter((type: { id: any; }) => this.selectedTypeIds.includes(type.id));

    const newData = [...this.dataSource.data];
    const newSong: Song = {
      id: d.getTime(),
      title: row_obj.title,
      artist: row_obj.artist,
      releaseDate: row_obj.releaseDate,
      status: true,
      instruments: [],
      album: 0,
      entity: [],
      category: 0
    };


    this.songService.create(newSong).subscribe(
      (response) => {
        console.log('New item added:', response);
        this.songService.getAll().subscribe(
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
    // row_obj2.forEach(instruId => {
    //   const newItem: Entity = {
    //     entity_id: 1555888555,
    //     instrument_id: instruId,

    //   };
    // });
  }

  updateRowData(row_obj: Song) {
    this.songService.update(row_obj.id, row_obj).subscribe(
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
    this.songService.delete(row_obj.id).subscribe(
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

function forkJoin(albumTitleObservables: Observable<string>[]): Observable<Album[]> {
  throw new Error('Function not implemented.');
}

