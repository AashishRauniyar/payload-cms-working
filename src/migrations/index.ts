import * as migration_20250916_062336 from './20250916_062336';
import * as migration_20250918_072824 from './20250918_072824';

export const migrations = [
  {
    up: migration_20250916_062336.up,
    down: migration_20250916_062336.down,
    name: '20250916_062336',
  },
  {
    up: migration_20250918_072824.up,
    down: migration_20250918_072824.down,
    name: '20250918_072824'
  },
];
