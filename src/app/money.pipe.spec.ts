import { TestBed, async } from '@angular/core/testing';
import { MoneyPipe } from './money.pipe';

describe('Money Pipe', () => {
  const pipe: any = null;

  beforeEach(async(() => {
    this.pipe = new MoneyPipe();
  }));

  it('should render 1 to currency 1.00', async(() => {
    const result = this.pipe.transform(1);

    expect(result).toEqual('1.00');
  }));

  it('should render 12 to currency 12.00', async(() => {
    const result = this.pipe.transform(12);

    expect(result).toEqual('12.00');
  }));

  it('should render 123 to currency 123.00', async(() => {
    const result = this.pipe.transform(123);

    expect(result).toEqual('123.00');
  }));

  it('should render 1234 to currency 1,234.00', async(() => {
    const result = this.pipe.transform(1234);

    expect(result).toEqual('1,234.00');
  }));

  it('should render 1234567890 to currency 1,234,567,890.00', async(() => {
    const result = this.pipe.transform(1234567890);

    expect(result).toEqual('1,234,567,890.00');
  }));

  it('should render 1234.5 to currency 1,234.50', async(() => {
    const result = this.pipe.transform(1234.5);

    expect(result).toEqual('1,234.50');
  }));

  it('should render 1234.57 to currency 1,234.57', async(() => {
    const result = this.pipe.transform(1234.57);

    expect(result).toEqual('1,234.57');
  }));
});
