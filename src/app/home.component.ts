import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from './playground.service';
import { Playground } from './playground';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PlaygroundService]
})

export class HomeComponent implements OnInit {
  playgrounds: Playground[];

  constructor(private playgroundService: PlaygroundService) {}

  getPlaygrounds(): Promise<Playground[]> {
    return this.playgroundService.get().then(playgrounds => this.playgrounds = playgrounds);
  }

  ngOnInit(): void {
    this.getPlaygrounds();
  }
}
