import { YearSpanPipe } from './year-span.pipe';

describe('YearSpanPipe', () => {
  const pipe = new YearSpanPipe();

  it('takes 2 years y1, y2 and returns \'y1 - y2\' if not the same, or \'y1\'', () => {
    expect(pipe.transform(1950, 1960)).toBe('1950 - 1960');
  });

  it('transforms same years to one year', () => {
    expect(pipe.transform(1950, 1950)).toBe('1950');
  });
});
