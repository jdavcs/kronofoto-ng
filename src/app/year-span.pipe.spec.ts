import { YearSpanPipe } from './year-span.pipe';

describe('YearSpanPipe', () => {

  let pipe = new YearSpanPipe();

  it('transforms different years to a year span', () => {
    expect(pipe.transform(1950, 1960)).toBe('1950 - 1960');
  });

  it('transforms same years to one year', () => {
    expect(pipe.transform(1950, 1950)).toBe('1950');
  });
});
