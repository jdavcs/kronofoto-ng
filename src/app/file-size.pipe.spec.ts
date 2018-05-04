import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  const pipe = new FileSizePipe();

  it('displays file size in human-friendly  format', () => {
    expect(pipe.transform(1100)).toBe('1.07 KB');
    expect(pipe.transform(2500000)).toBe('2.38 MB');
    expect(pipe.transform(2000000000)).toBe('1.86 GB');
  });
});
