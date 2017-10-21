import { Component, Input } from '@angular/core';
import { Playground } from './playground';

@Component({
  selector: 'playground-list',
  templateUrl: './playground-list.component.html',
})

export class PlaygroundListComponent {
  @Input() playgrounds: Playground[];
}
