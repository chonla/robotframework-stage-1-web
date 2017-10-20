import { Component } from '@angular/core';
import { PlaygroundService } from './playground.service';
import { Playground } from './playground';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PlaygroundService]
})

export class HomeComponent {
  playgrounds: Playground[];

  constructor(private playgroundService: PlaygroundService) {}

  getPlaygrounds(): void {
    this.playgroundService.get().then(playgrounds => this.playgrounds = playgrounds);
  }

  ngOnInit(): void {
    this.getPlaygrounds();
  }
}
