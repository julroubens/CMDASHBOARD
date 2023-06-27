import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-show',
  templateUrl: './song-show.component.html',
  styleUrls: ['./song-show.component.scss']
})
export class SongShowComponent implements OnInit {

  songId!: number;
  private subscription!: Subscription;
  song!: Song;

  constructor(private activeRoute: ActivatedRoute,
              private songService: SongService
    ) { }

  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe(data =>{
      this.songId = data['id'];
      this.songService.getById(this.songId).pipe(
        map((song: Song) => this.song = song)
      ).subscribe();
    });
    
  }

  getSongById(songId: number)
  {
  }

}
