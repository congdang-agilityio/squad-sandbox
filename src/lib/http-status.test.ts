// @vitest-environment node
import { reasonPhrase } from './http-status';

// Every status code in the IANA HTTP Status Code Registry (unassigned and unused codes excluded).
const IANA_CODES = [
  100, 101, 102, 103, 104, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303,
  304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505,
  506, 507, 508, 510, 511,
];

describe('reasonPhrase', () => {
  it.each([
    [200, 'OK'],
    [201, 'Created'],
    [404, 'Not Found'],
    [418, undefined],
    [500, 'Internal Server Error'],
  ])('returns the English phrase for %i', (code, phrase) => {
    expect(reasonPhrase(code, 'en')).toBe(phrase);
  });

  it.each([
    [200, 'Thành công'],
    [404, 'Không tìm thấy'],
    [500, 'Lỗi máy chủ nội bộ'],
  ])('returns the Vietnamese phrase for %i', (code, phrase) => {
    expect(reasonPhrase(code, 'vi')).toBe(phrase);
  });

  it.each(IANA_CODES)('has a non-empty phrase in both locales for %i', (code) => {
    expect(reasonPhrase(code, 'en')).toMatch(/\S/);
    expect(reasonPhrase(code, 'vi')).toMatch(/\S/);
  });

  it.each([0, 99, 199, 299, 306, 418, 600, 1.5, NaN])(
    'returns undefined for unknown code %s',
    (code) => {
      expect(reasonPhrase(code, 'en')).toBeUndefined();
      expect(reasonPhrase(code, 'vi')).toBeUndefined();
    },
  );
});
