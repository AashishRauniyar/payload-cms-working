import * as migration_20250824_075935 from './20250824_075935';
import * as migration_20250911_070814_fix_reviews_media from './20250911_070814_fix_reviews_media';

export const migrations = [
  {
    up: migration_20250824_075935.up,
    down: migration_20250824_075935.down,
    name: '20250824_075935',
  },
  {
    up: migration_20250911_070814_fix_reviews_media.up,
    down: migration_20250911_070814_fix_reviews_media.down,
    name: '20250911_070814_fix_reviews_media'
  },
];
