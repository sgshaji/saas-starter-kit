import { AppConfig } from '../core/AppConfig';
import { getI18nPath } from './index';

describe('helpers', () => {
  describe('getI18nPath function', () => {
    it('should not change the path for the default language', () => {
      const url = '/random-url';
      const locale = AppConfig.defaultLocale;

      expect(getI18nPath(url, locale)).toBe(url);
    });

    it('should prepend the locale to the path for non-default language', () => {
      const url = '/random-url';
      const locale = 'fr';

      expect(getI18nPath(url, locale)).toMatch(/^\/fr/);
    });
  });
});
