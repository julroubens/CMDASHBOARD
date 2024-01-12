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
    ) {
      this.subscription = this.activeRoute.params.subscribe(data =>{
        this.songId = data['id'];
      });
    }

  ngOnInit(): void {
    this.getSongById(this.songId);
  }

  getSongById(songId: number){
    this.songService.getById(this.songId).pipe(
      map((song: Song)=>{
        if (song) {
          console.log("@--- song", song);
          this.song = song
        }else{
          console.log("@-- no song data !");
        }
      })
    ).subscribe();
  }

}
