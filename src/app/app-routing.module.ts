import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SongComponent} from "./components/song/song.component";
import {InstrumentComponent} from "./components/instrument/instrument.component";
import {EntityTypeComponent} from "./components/entity-type/entity-type.component";
import {EntityComponent} from "./components/entity/entity.component";
import { AlbumComponent } from './components/album/album.component';
import { CategoryComponent } from './components/category/category.component';
import { SongShowComponent } from './components/song-show/song-show.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'song',
    children:[
      { path: '', component: SongComponent },
      { path: ':id', component: SongShowComponent },
  ]},
  { path: 'instrument', component: InstrumentComponent },
  { path: 'entity', component: EntityComponent },
  { path: 'entity-type', component: EntityTypeComponent },
  { path: 'albums', component: AlbumComponent },
  { path: 'categorys', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
