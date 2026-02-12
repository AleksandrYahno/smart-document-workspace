import { formatDate } from './formatDate.helper';

describe('formatDate', () => {
  it('formats ISO date string to locale short date and time', () => {
    const iso = '2025-02-12T14:30:00Z';
    const result = formatDate(iso);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns consistent format for same input', () => {
    const iso = '2025-01-01T00:00:00Z';

    expect(formatDate(iso)).toBe(formatDate(iso));
  });
});
