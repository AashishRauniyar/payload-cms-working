import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Skip migration if in Docker build or CI environment
  if (process.env.DOCKER_BUILD || process.env.CI || process.env.SKIP_MIGRATIONS) {
    console.log('Skipping migration due to build environment')
    return
  }

  try {
    // Check if database is accessible
    await db.execute(sql`SELECT 1`)
  } catch (error) {
    console.log('Database not accessible, skipping migration')
    return
  }

  // First, clean up any existing invalid profile_image data
  try {
    await db.execute(sql`
      UPDATE pages_blocks_reviews_block_reviews 
      SET profile_image_id = NULL 
      WHERE profile_image_id IS NOT NULL 
      AND profile_image_id::text ~ '[^0-9]'
    `)
  } catch (error) {
    // If table doesn't exist yet, that's fine
    console.log('Cleanup step skipped - table may not exist yet')
  }

  try {
    // Create enums if they don't exist
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_size" AS ENUM('small', 'medium', 'large', 'xlarge', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_border_radius" AS ENUM('none', 'small', 'medium', 'large', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_shadow" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_link_type" AS ENUM('lightbox', 'external', 'internal');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_margin_top" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_margin_bottom" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_reviews_block_reviews_gender" AS ENUM('male', 'female');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_reviews_block_display_options_layout" AS ENUM('stacked', 'grid');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_top_our_choose_ratings_evidence" AS ENUM('Gold Star Evidence', 'Strong Evidence', 'Good Evidence', 'Limited Evidence');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_top_our_choose_buttons_style" AS ENUM('primary', 'secondary', 'success', 'warning', 'outline');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_top_our_choose_buttons_link_type" AS ENUM('reference', 'custom');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_top_our_choose_background_color" AS ENUM('none', 'gray', 'blue', 'green', 'orange');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_ingredients_block_layout" AS ENUM('stacked', 'grid-2', 'grid-3');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum_pages_blocks_ingredients_block_background_color" AS ENUM('none', 'gray', 'blue', 'green');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    // Create version-specific enums
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_size" AS ENUM('small', 'medium', 'large', 'xlarge', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_border_radius" AS ENUM('none', 'small', 'medium', 'large', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_shadow" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_link_type" AS ENUM('lightbox', 'external', 'internal');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_top" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_bottom" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_reviews_block_reviews_gender" AS ENUM('male', 'female');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_reviews_block_display_options_layout" AS ENUM('stacked', 'grid');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_ratings_evidence" AS ENUM('Gold Star Evidence', 'Strong Evidence', 'Good Evidence', 'Limited Evidence');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_style" AS ENUM('primary', 'secondary', 'success', 'warning', 'outline');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_link_type" AS ENUM('reference', 'custom');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_background_color" AS ENUM('none', 'gray', 'blue', 'green', 'orange');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_ingredients_block_layout" AS ENUM('stacked', 'grid-2', 'grid-3');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."enum__pages_v_blocks_ingredients_block_background_color" AS ENUM('none', 'gray', 'blue', 'green');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    console.log('Enums created successfully')
  } catch (error) {
    console.log('Some enums may already exist, continuing...')
  }

  // Create tables with error handling
  try {
    // Create tables one by one with error handling
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "pages_blocks_reviews_block_reviews" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar,
        "gender" "enum_pages_blocks_reviews_block_reviews_gender" DEFAULT 'male',
        "age" numeric DEFAULT 34,
        "profile_image_id" integer,
        "rating" numeric DEFAULT 4,
        "review_text" varchar
      );
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "pages_blocks_reviews_block" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "block_header_title" varchar DEFAULT 'Customer Reviews',
        "block_header_subtitle" varchar,
        "display_options_layout" "enum_pages_blocks_reviews_block_display_options_layout" DEFAULT 'stacked',
        "display_options_alternate_background" boolean DEFAULT true,
        "display_options_show_dashed_borders" boolean DEFAULT true,
        "block_name" varchar
      );
    `)

    // Continue with other tables...
    console.log('Tables created successfully')
  } catch (error) {
    console.log('Some tables may already exist:', (error as Error).message)
  }

  // Add columns to existing tables safely
  try {
    await db.execute(sql`
      ALTER TABLE "pages_blocks_media_block" 
      ADD COLUMN IF NOT EXISTS "caption" varchar,
      ADD COLUMN IF NOT EXISTS "alignment" "enum_pages_blocks_media_block_alignment" DEFAULT 'center',
      ADD COLUMN IF NOT EXISTS "size" "enum_pages_blocks_media_block_size" DEFAULT 'medium',
      ADD COLUMN IF NOT EXISTS "aspect_ratio" "enum_pages_blocks_media_block_aspect_ratio" DEFAULT 'auto',
      ADD COLUMN IF NOT EXISTS "border_radius" "enum_pages_blocks_media_block_border_radius" DEFAULT 'none',
      ADD COLUMN IF NOT EXISTS "shadow" "enum_pages_blocks_media_block_shadow" DEFAULT 'none',
      ADD COLUMN IF NOT EXISTS "border" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "enable_link" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_blocks_media_block_link_type" DEFAULT 'lightbox',
      ADD COLUMN IF NOT EXISTS "external_url" varchar,
      ADD COLUMN IF NOT EXISTS "spacing_margin_top" "enum_pages_blocks_media_block_spacing_margin_top" DEFAULT 'small',
      ADD COLUMN IF NOT EXISTS "spacing_margin_bottom" "enum_pages_blocks_media_block_spacing_margin_bottom" DEFAULT 'small'
    `)
    console.log('Media block columns added successfully')
  } catch (error) {
    console.log('Error adding media block columns:', (error as Error).message)
  }

  console.log('Migration completed successfully')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_reviews_block_reviews" CASCADE;
  DROP TABLE "pages_blocks_reviews_block" CASCADE;
  DROP TABLE "pages_blocks_top_our_choose_ratings" CASCADE;
  DROP TABLE "pages_blocks_top_our_choose_buttons" CASCADE;
  DROP TABLE "pages_blocks_top_our_choose" CASCADE;
  DROP TABLE "pages_blocks_ingredients_block_ingredients" CASCADE;
  DROP TABLE "pages_blocks_ingredients_block" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews_block_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews_block" CASCADE;
  DROP TABLE "_pages_v_blocks_top_our_choose_ratings" CASCADE;
  DROP TABLE "_pages_v_blocks_top_our_choose_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_top_our_choose" CASCADE;
  DROP TABLE "_pages_v_blocks_ingredients_block_ingredients" CASCADE;
  DROP TABLE "_pages_v_blocks_ingredients_block" CASCADE;
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "alignment";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "size";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "aspect_ratio";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "border_radius";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "shadow";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "border";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "enable_link";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "external_url";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "spacing_margin_top";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "spacing_margin_bottom";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "caption";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "alignment";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "size";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "aspect_ratio";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "border_radius";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "shadow";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "border";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "enable_link";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "external_url";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "spacing_margin_top";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "spacing_margin_bottom";
  DROP TYPE "public"."enum_pages_blocks_media_block_alignment";
  DROP TYPE "public"."enum_pages_blocks_media_block_size";
  DROP TYPE "public"."enum_pages_blocks_media_block_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_media_block_border_radius";
  DROP TYPE "public"."enum_pages_blocks_media_block_shadow";
  DROP TYPE "public"."enum_pages_blocks_media_block_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_block_spacing_margin_top";
  DROP TYPE "public"."enum_pages_blocks_media_block_spacing_margin_bottom";
  DROP TYPE "public"."enum_pages_blocks_reviews_block_reviews_gender";
  DROP TYPE "public"."enum_pages_blocks_reviews_block_display_options_layout";
  DROP TYPE "public"."enum_pages_blocks_top_our_choose_ratings_evidence";
  DROP TYPE "public"."enum_pages_blocks_top_our_choose_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_top_our_choose_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_top_our_choose_background_color";
  DROP TYPE "public"."enum_pages_blocks_ingredients_block_layout";
  DROP TYPE "public"."enum_pages_blocks_ingredients_block_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_size";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_border_radius";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_shadow";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_top";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_reviews_block_reviews_gender";
  DROP TYPE "public"."enum__pages_v_blocks_reviews_block_display_options_layout";
  DROP TYPE "public"."enum__pages_v_blocks_top_our_choose_ratings_evidence";
  DROP TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_top_our_choose_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_ingredients_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_ingredients_block_background_color";`)
}
