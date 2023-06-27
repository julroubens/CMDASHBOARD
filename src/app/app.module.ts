import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EntityBoxComponent } from './components/entity-box/entity-box.component';
import { EntityTypeBoxComponent } from './components/entity-type-box/entity-type-box.component';
import { EntityComponent } from './components/entity/entity.component';
import { InstrumentComponent } from './components/instrument/instrument.component';
import { EntityTypeComponent } from './components/entity-type/entity-type.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { SongComponent } from './components/song/song.component';
import { InstrumentBoxComponent } from './components/instrument-box/instrument-box.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterseptorService} from "./http-interseptor.service";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import { SongBoxComponent } from './components/song-box/song-box.component';
import { AlbumBoxComponent } from './components/album-box/album-box.component';
import { CategoryBoxComponent } from './components/category-box/category-box.component';
import { AlbumComponent } from './components/album/album.component';
import { CategoryComponent } from './components/category/category.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SongShowComponent } from './components/song-show/song-show.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityBoxComponent,
    EntityTypeBoxComponent,
    EntityComponent,
    InstrumentComponent,
    EntityTypeComponent,
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    SongComponent,
    InstrumentBoxComponent,
    SongBoxComponent,
    AlbumBoxComponent,
    CategoryBoxComponent,
    AlbumComponent,
    CategoryComponent,
    SongShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterseptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
