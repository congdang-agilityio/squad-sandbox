import { resolveLocale } from './request';

describe('resolveLocale', () => {
  it.each(['vi', 'vi-VN', 'VI-vn'])('returns vi for %s', (header) => {
    expect(resolveLocale(header)).toBe('vi');
  });

  it.each(['en', 'en-US', 'en-GB', 'EN-us'])('returns en for %s', (header) => {
    expect(resolveLocale(header)).toBe('en');
  });

  it.each(['fr-FR', 'ja', 'zh-Hant-TW'])('falls back to vi for other languages (%s)', (header) => {
    expect(resolveLocale(header)).toBe('vi');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['empty', ''],
    ['blank', '   '],
  ])('falls back to vi for a %s header', (_label, header) => {
    expect(resolveLocale(header)).toBe('vi');
  });

  it.each(['*', ';q=0.9', ',,,', 'en_US', 'e1-US', 'english', '-en', '"en"', 'x'.repeat(5000)])(
    'falls back to vi for a malformed header (%s)',
    (header) => {
      expect(resolveLocale(header)).toBe('vi');
    },
  );

  it.each([
    ['en-US,vi;q=0.9', 'en'],
    ['vi-VN,en;q=0.8', 'vi'],
    ['fr-FR,en;q=0.8', 'vi'],
    ['  en-GB ; q=1 , vi;q=0.5', 'en'],
  ])('uses only the first language tag of %s', (header, expected) => {
    expect(resolveLocale(header)).toBe(expected);
  });
});
