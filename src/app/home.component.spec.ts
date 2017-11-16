import { async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PlaygroundService } from './playground.service';
import { Playground } from './playground';

describe('HomeComponent', () => {
  const cmp: HomeComponent = null;
  const mockPlaygroundService: PlaygroundService = null;

  beforeEach(async(() => {
    this.mockPlaygroundService = jasmine.createSpyObj('playgroundService', {
      'get': Promise.resolve([{ key: 'aa', route: '/bb', title: 'cc', description: 'dd' }])
    });
    this.cmp = new HomeComponent(this.mockPlaygroundService);
  }));

  it('should load playground when init', async(() => {
    const spy = spyOn(this.cmp, 'getPlaygrounds');

    this.cmp.ngOnInit();

    expect(this.cmp.getPlaygrounds).toHaveBeenCalled();
  }));

  it('should call playgroundService.get when getting playgrounds', async(() => {
    this.cmp.getPlaygrounds().then(() => {
      expect(this.mockPlaygroundService.get).toHaveBeenCalled();
    });
  }));

  it('should call set local playground to returned value from playgroundService.get', async(() => {
    this.cmp.getPlaygrounds().then(() => {
      expect(this.cmp.playgrounds).toEqual([{ key: 'aa', route: '/bb', title: 'cc', description: 'dd' }]);
    });
  }));
});
