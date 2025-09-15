import * as migration_20250824_075935 from './20250824_075935';
import * as migration_20250911_070814_fix_reviews_media from './20250911_070814_fix_reviews_media';
import * as migration_20250915_081004 from './20250915_081004';
import * as migration_20250915_081133_add_experience_to_users from './20250915_081133_add_experience_to_users';
import * as migration_20250915_102156 from './20250915_102156';
import * as migration_20250915_120000_social_media_fields from './20250915_120000_social_media_fields';

export const migrations = [
  {
    up: migration_20250824_075935.up,
    down: migration_20250824_075935.down,
    name: '20250824_075935',
  },
  {
    up: migration_20250911_070814_fix_reviews_media.up,
    down: migration_20250911_070814_fix_reviews_media.down,
    name: '20250911_070814_fix_reviews_media',
  },
  {
    up: migration_20250915_081004.up,
    down: migration_20250915_081004.down,
    name: '20250915_081004',
  },
  {
    up: migration_20250915_081133_add_experience_to_users.up,
    down: migration_20250915_081133_add_experience_to_users.down,
    name: '20250915_081133_add_experience_to_users',
  },
  {
    up: migration_20250915_102156.up,
    down: migration_20250915_102156.down,
    name: '20250915_102156',
  },
  {
    up: migration_20250915_120000_social_media_fields.up,
    down: migration_20250915_120000_social_media_fields.down,
    name: '20250915_120000_social_media_fields'
  },
];
