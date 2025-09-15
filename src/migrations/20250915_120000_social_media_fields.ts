import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  console.log('Running social media fields migration...')

  try {
    // Add social media fields if they don't exist
    await payload.db.drizzle.execute(sql`
      DO $$
      BEGIN
        -- Add LinkedIn fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='linkedin_url') THEN
          ALTER TABLE users ADD COLUMN linkedin_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='linkedin_logo_id') THEN
          ALTER TABLE users ADD COLUMN linkedin_logo_id integer;
        END IF;
        
        -- Add Twitter fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='twitter_url') THEN
          ALTER TABLE users ADD COLUMN twitter_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='twitter_logo_id') THEN
          ALTER TABLE users ADD COLUMN twitter_logo_id integer;
        END IF;
        
        -- Add Facebook fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='facebook_url') THEN
          ALTER TABLE users ADD COLUMN facebook_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='facebook_logo_id') THEN
          ALTER TABLE users ADD COLUMN facebook_logo_id integer;
        END IF;
        
        -- Add Instagram fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='instagram_url') THEN
          ALTER TABLE users ADD COLUMN instagram_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='instagram_logo_id') THEN
          ALTER TABLE users ADD COLUMN instagram_logo_id integer;
        END IF;
        
        -- Add YouTube fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='youtube_url') THEN
          ALTER TABLE users ADD COLUMN youtube_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='youtube_logo_id') THEN
          ALTER TABLE users ADD COLUMN youtube_logo_id integer;
        END IF;
        
        -- Add website fields
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='website_url') THEN
          ALTER TABLE users ADD COLUMN website_url varchar;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='website_logo_id') THEN
          ALTER TABLE users ADD COLUMN website_logo_id integer;
        END IF;
        
        -- Create other social media table if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                      WHERE table_name='users_social_media_other') THEN
          CREATE TABLE users_social_media_other (
            "_order" integer NOT NULL,
            "_parent_id" integer NOT NULL,
            "id" varchar PRIMARY KEY NOT NULL,
            "platform" varchar,
            "url" varchar,
            "logo_id" integer
          );
          
          -- Create indexes
          CREATE INDEX "users_social_media_other_order_idx" ON "users_social_media_other" ("_order");
          CREATE INDEX "users_social_media_other_parent_id_idx" ON "users_social_media_other" ("_parent_id");
          CREATE INDEX "users_social_media_other_logo_idx" ON "users_social_media_other" ("logo_id");
          
          -- Add foreign key constraints
          ALTER TABLE "users_social_media_other" 
            ADD CONSTRAINT "users_social_media_other_parent_id_fk" 
            FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
          
          ALTER TABLE "users_social_media_other" 
            ADD CONSTRAINT "users_social_media_other_logo_id_media_id_fk" 
            FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        END IF;
        
        -- Add foreign key constraints for social media logo fields if they don't exist
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_linkedin_logo_id_media_id_fk" 
            FOREIGN KEY ("linkedin_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_twitter_logo_id_media_id_fk" 
            FOREIGN KEY ("twitter_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_facebook_logo_id_media_id_fk" 
            FOREIGN KEY ("facebook_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_instagram_logo_id_media_id_fk" 
            FOREIGN KEY ("instagram_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_youtube_logo_id_media_id_fk" 
            FOREIGN KEY ("youtube_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        BEGIN
          ALTER TABLE "users" 
            ADD CONSTRAINT "users_website_logo_id_media_id_fk" 
            FOREIGN KEY ("website_logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END;
        
        -- Add experience column if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='experience') THEN
          ALTER TABLE users ADD COLUMN experience varchar;
        END IF;
        
        RAISE NOTICE 'Social media fields migration completed successfully';
      END $$;
    `)

    console.log('Social media fields migration completed successfully')
  } catch (error) {
    console.error('Error in social media migration:', error)
    throw error
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  console.log('Rolling back social media fields migration...')

  try {
    await payload.db.drizzle.execute(sql`
      -- Drop foreign key constraints first
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_linkedin_logo_id_media_id_fk;
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_twitter_logo_id_media_id_fk;
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_facebook_logo_id_media_id_fk;
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_instagram_logo_id_media_id_fk;
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_youtube_logo_id_media_id_fk;
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_website_logo_id_media_id_fk;
      
      -- Drop social media other table
      DROP TABLE IF EXISTS users_social_media_other;
      
      -- Drop social media columns
      ALTER TABLE users DROP COLUMN IF EXISTS linkedin_url;
      ALTER TABLE users DROP COLUMN IF EXISTS linkedin_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS twitter_url;
      ALTER TABLE users DROP COLUMN IF EXISTS twitter_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS facebook_url;
      ALTER TABLE users DROP COLUMN IF EXISTS facebook_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS instagram_url;
      ALTER TABLE users DROP COLUMN IF EXISTS instagram_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS youtube_url;
      ALTER TABLE users DROP COLUMN IF EXISTS youtube_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS website_url;
      ALTER TABLE users DROP COLUMN IF EXISTS website_logo_id;
      ALTER TABLE users DROP COLUMN IF EXISTS experience;
    `)

    console.log('Social media fields migration rollback completed')
  } catch (error) {
    console.error('Error rolling back social media migration:', error)
    throw error
  }
}
