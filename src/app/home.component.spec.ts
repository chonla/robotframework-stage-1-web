import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const fixture: any = null;
  const cmp: any = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    this.fixture = TestBed.createComponent(HomeComponent);
    this.cmp = this.fixture.debugElement.componentInstance;
  }));

  it('should create the component', async(() => {
    expect(this.cmp).toBeTruthy();
  }));

  it('should load playground when init', async(() => {
    const spy = spyOn(this.cmp, 'getPlaygrounds');

    this.cmp.ngOnInit();

    expect(this.cmp.getPlaygrounds).toHaveBeenCalled();
  }));
});
