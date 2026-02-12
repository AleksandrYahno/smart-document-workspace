import { rem, pxToRem, m, p, br } from './remUtils';

describe('remUtils', () => {
  describe('rem', () => {
    it('converts size to rem string', () => {
      expect(rem(16)).toBe('1rem');
      expect(rem(8)).toBe('0.5rem');
    });
  });

  describe('pxToRem', () => {
    it('converts px to rem number', () => {
      expect(pxToRem(16)).toBe(1);
      expect(pxToRem(8)).toBe(0.5);
    });
  });

  describe('m', () => {
    it('returns one value for single arg', () => {
      expect(m(8)).toBe('0.5rem 0.5rem 0.5rem 0.5rem');
    });

    it('returns top right bottom left for four args', () => {
      expect(m(8, 12, 8, 12)).toBe('0.5rem 0.75rem 0.5rem 0.75rem');
    });
  });

  describe('p and br', () => {
    it('alias m for single value', () => {
      expect(p(4)).toBe(m(4));
      expect(br(4)).toBe(m(4));
    });
  });
});
