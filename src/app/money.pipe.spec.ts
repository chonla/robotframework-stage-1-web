import { TestBed, async } from '@angular/core/testing';
import { MoneyPipe } from './money.pipe';

describe('Money Pipe', () => {
  beforeEach(async(() => {
  }));
  it('should render 1 to currency 1.00', async(() => {
    const pipe = new MoneyPipe();
    const result = pipe.transform(1);

    expect(result).toEqual('1.00');
  }));
  it('should render 12 to currency 12.00', async(() => {
    const pipe = new MoneyPipe();
    const result = pipe.transform(12);

    expect(result).toEqual('12.00');
  }));
});
