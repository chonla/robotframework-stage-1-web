import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from './playground.service';
import { Playground } from './playground';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlaygroundService]
})
export class AppComponent implements OnInit {
  title = 'app';
  playgrounds: Playground[];

  constructor(private playgroundService: PlaygroundService) {}

  getPlaygrounds(): void {
    this.playgroundService.get().then(playgrounds => this.playgrounds = playgrounds);
  }

  ngOnInit(): void {
    this.getPlaygrounds();
  }
}
