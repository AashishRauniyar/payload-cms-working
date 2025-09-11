import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_size" AS ENUM('small', 'medium', 'large', 'xlarge', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_media_block_border_radius" AS ENUM('none', 'small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_shadow" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_media_block_link_type" AS ENUM('lightbox', 'external', 'internal');
  CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_margin_top" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_margin_bottom" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_reviews_block_reviews_gender" AS ENUM('male', 'female');
  CREATE TYPE "public"."enum_pages_blocks_reviews_block_display_options_layout" AS ENUM('stacked', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_top_our_choose_ratings_evidence" AS ENUM('Gold Star Evidence', 'Strong Evidence', 'Good Evidence', 'Limited Evidence');
  CREATE TYPE "public"."enum_pages_blocks_top_our_choose_buttons_style" AS ENUM('primary', 'secondary', 'success', 'warning', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_top_our_choose_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_top_our_choose_background_color" AS ENUM('none', 'gray', 'blue', 'green', 'orange');
  CREATE TYPE "public"."enum_pages_blocks_ingredients_block_layout" AS ENUM('stacked', 'grid-2', 'grid-3');
  CREATE TYPE "public"."enum_pages_blocks_ingredients_block_background_color" AS ENUM('none', 'gray', 'blue', 'green');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_size" AS ENUM('small', 'medium', 'large', 'xlarge', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_border_radius" AS ENUM('none', 'small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_shadow" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_link_type" AS ENUM('lightbox', 'external', 'internal');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_top" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_margin_bottom" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_block_reviews_gender" AS ENUM('male', 'female');
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_block_display_options_layout" AS ENUM('stacked', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_ratings_evidence" AS ENUM('Gold Star Evidence', 'Strong Evidence', 'Good Evidence', 'Limited Evidence');
  CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_style" AS ENUM('primary', 'secondary', 'success', 'warning', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_top_our_choose_background_color" AS ENUM('none', 'gray', 'blue', 'green', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_ingredients_block_layout" AS ENUM('stacked', 'grid-2', 'grid-3');
  CREATE TYPE "public"."enum__pages_v_blocks_ingredients_block_background_color" AS ENUM('none', 'gray', 'blue', 'green');
  CREATE TABLE "pages_blocks_reviews_block_reviews" (
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
  
  CREATE TABLE "pages_blocks_reviews_block" (
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
  
  CREATE TABLE "pages_blocks_top_our_choose_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"rating" numeric,
  	"evidence" "enum_pages_blocks_top_our_choose_ratings_evidence" DEFAULT 'Strong Evidence'
  );
  
  CREATE TABLE "pages_blocks_top_our_choose_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pages_blocks_top_our_choose_buttons_style" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_top_our_choose_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_top_our_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"product_name" varchar DEFAULT 'Primal RX Gummies',
  	"product_image_id" integer,
  	"overall_rating" numeric DEFAULT 4.3,
  	"background_color" "enum_pages_blocks_top_our_choose_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ingredients_block_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_ingredients_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_pages_blocks_ingredients_block_layout" DEFAULT 'stacked',
  	"background_color" "enum_pages_blocks_ingredients_block_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reviews_block_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"gender" "enum__pages_v_blocks_reviews_block_reviews_gender" DEFAULT 'male',
  	"age" numeric DEFAULT 34,
  	"profile_image_id" integer,
  	"rating" numeric DEFAULT 4,
  	"review_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reviews_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_header_title" varchar DEFAULT 'Customer Reviews',
  	"block_header_subtitle" varchar,
  	"display_options_layout" "enum__pages_v_blocks_reviews_block_display_options_layout" DEFAULT 'stacked',
  	"display_options_alternate_background" boolean DEFAULT true,
  	"display_options_show_dashed_borders" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_top_our_choose_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"rating" numeric,
  	"evidence" "enum__pages_v_blocks_top_our_choose_ratings_evidence" DEFAULT 'Strong Evidence',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_top_our_choose_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pages_v_blocks_top_our_choose_buttons_style" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_top_our_choose_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_top_our_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"product_name" varchar DEFAULT 'Primal RX Gummies',
  	"product_image_id" integer,
  	"overall_rating" numeric DEFAULT 4.3,
  	"background_color" "enum__pages_v_blocks_top_our_choose_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ingredients_block_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ingredients_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__pages_v_blocks_ingredients_block_layout" DEFAULT 'stacked',
  	"background_color" "enum__pages_v_blocks_ingredients_block_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "alignment" "enum_pages_blocks_media_block_alignment" DEFAULT 'center';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "size" "enum_pages_blocks_media_block_size" DEFAULT 'medium';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "aspect_ratio" "enum_pages_blocks_media_block_aspect_ratio" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "border_radius" "enum_pages_blocks_media_block_border_radius" DEFAULT 'none';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "shadow" "enum_pages_blocks_media_block_shadow" DEFAULT 'none';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "border" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "enable_link" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "link_type" "enum_pages_blocks_media_block_link_type" DEFAULT 'lightbox';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "external_url" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "spacing_margin_top" "enum_pages_blocks_media_block_spacing_margin_top" DEFAULT 'small';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "spacing_margin_bottom" "enum_pages_blocks_media_block_spacing_margin_bottom" DEFAULT 'small';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "alignment" "enum__pages_v_blocks_media_block_alignment" DEFAULT 'center';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "size" "enum__pages_v_blocks_media_block_size" DEFAULT 'medium';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "aspect_ratio" "enum__pages_v_blocks_media_block_aspect_ratio" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "border_radius" "enum__pages_v_blocks_media_block_border_radius" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "shadow" "enum__pages_v_blocks_media_block_shadow" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "border" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "enable_link" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "link_type" "enum__pages_v_blocks_media_block_link_type" DEFAULT 'lightbox';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "external_url" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "spacing_margin_top" "enum__pages_v_blocks_media_block_spacing_margin_top" DEFAULT 'small';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "spacing_margin_bottom" "enum__pages_v_blocks_media_block_spacing_margin_bottom" DEFAULT 'small';
  ALTER TABLE "pages_blocks_reviews_block_reviews" ADD CONSTRAINT "pages_blocks_reviews_block_reviews_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews_block_reviews" ADD CONSTRAINT "pages_blocks_reviews_block_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reviews_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews_block" ADD CONSTRAINT "pages_blocks_reviews_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_our_choose_ratings" ADD CONSTRAINT "pages_blocks_top_our_choose_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_top_our_choose"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_our_choose_buttons" ADD CONSTRAINT "pages_blocks_top_our_choose_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_top_our_choose"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_our_choose" ADD CONSTRAINT "pages_blocks_top_our_choose_product_image_id_media_id_fk" FOREIGN KEY ("product_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_our_choose" ADD CONSTRAINT "pages_blocks_top_our_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredients_block_ingredients" ADD CONSTRAINT "pages_blocks_ingredients_block_ingredients_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredients_block_ingredients" ADD CONSTRAINT "pages_blocks_ingredients_block_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ingredients_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredients_block" ADD CONSTRAINT "pages_blocks_ingredients_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_block_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_block_reviews_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_block_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_block_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reviews_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_block" ADD CONSTRAINT "_pages_v_blocks_reviews_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_our_choose_ratings" ADD CONSTRAINT "_pages_v_blocks_top_our_choose_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_top_our_choose"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_our_choose_buttons" ADD CONSTRAINT "_pages_v_blocks_top_our_choose_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_top_our_choose"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_our_choose" ADD CONSTRAINT "_pages_v_blocks_top_our_choose_product_image_id_media_id_fk" FOREIGN KEY ("product_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_our_choose" ADD CONSTRAINT "_pages_v_blocks_top_our_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredients_block_ingredients" ADD CONSTRAINT "_pages_v_blocks_ingredients_block_ingredients_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredients_block_ingredients" ADD CONSTRAINT "_pages_v_blocks_ingredients_block_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ingredients_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredients_block" ADD CONSTRAINT "_pages_v_blocks_ingredients_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_reviews_block_reviews_order_idx" ON "pages_blocks_reviews_block_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_block_reviews_parent_id_idx" ON "pages_blocks_reviews_block_reviews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_block_reviews_profile_image_idx" ON "pages_blocks_reviews_block_reviews" USING btree ("profile_image_id");
  CREATE INDEX "pages_blocks_reviews_block_order_idx" ON "pages_blocks_reviews_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_block_parent_id_idx" ON "pages_blocks_reviews_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_block_path_idx" ON "pages_blocks_reviews_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_top_our_choose_ratings_order_idx" ON "pages_blocks_top_our_choose_ratings" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_our_choose_ratings_parent_id_idx" ON "pages_blocks_top_our_choose_ratings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_our_choose_buttons_order_idx" ON "pages_blocks_top_our_choose_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_our_choose_buttons_parent_id_idx" ON "pages_blocks_top_our_choose_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_our_choose_order_idx" ON "pages_blocks_top_our_choose" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_our_choose_parent_id_idx" ON "pages_blocks_top_our_choose" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_our_choose_path_idx" ON "pages_blocks_top_our_choose" USING btree ("_path");
  CREATE INDEX "pages_blocks_top_our_choose_product_image_idx" ON "pages_blocks_top_our_choose" USING btree ("product_image_id");
  CREATE INDEX "pages_blocks_ingredients_block_ingredients_order_idx" ON "pages_blocks_ingredients_block_ingredients" USING btree ("_order");
  CREATE INDEX "pages_blocks_ingredients_block_ingredients_parent_id_idx" ON "pages_blocks_ingredients_block_ingredients" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ingredients_block_ingredients_image_idx" ON "pages_blocks_ingredients_block_ingredients" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ingredients_block_order_idx" ON "pages_blocks_ingredients_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_ingredients_block_parent_id_idx" ON "pages_blocks_ingredients_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ingredients_block_path_idx" ON "pages_blocks_ingredients_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reviews_block_reviews_order_idx" ON "_pages_v_blocks_reviews_block_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_block_reviews_parent_id_idx" ON "_pages_v_blocks_reviews_block_reviews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_block_reviews_profile_image_idx" ON "_pages_v_blocks_reviews_block_reviews" USING btree ("profile_image_id");
  CREATE INDEX "_pages_v_blocks_reviews_block_order_idx" ON "_pages_v_blocks_reviews_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_block_parent_id_idx" ON "_pages_v_blocks_reviews_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_block_path_idx" ON "_pages_v_blocks_reviews_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_top_our_choose_ratings_order_idx" ON "_pages_v_blocks_top_our_choose_ratings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_top_our_choose_ratings_parent_id_idx" ON "_pages_v_blocks_top_our_choose_ratings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_top_our_choose_buttons_order_idx" ON "_pages_v_blocks_top_our_choose_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_top_our_choose_buttons_parent_id_idx" ON "_pages_v_blocks_top_our_choose_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_top_our_choose_order_idx" ON "_pages_v_blocks_top_our_choose" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_top_our_choose_parent_id_idx" ON "_pages_v_blocks_top_our_choose" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_top_our_choose_path_idx" ON "_pages_v_blocks_top_our_choose" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_top_our_choose_product_image_idx" ON "_pages_v_blocks_top_our_choose" USING btree ("product_image_id");
  CREATE INDEX "_pages_v_blocks_ingredients_block_ingredients_order_idx" ON "_pages_v_blocks_ingredients_block_ingredients" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ingredients_block_ingredients_parent_id_idx" ON "_pages_v_blocks_ingredients_block_ingredients" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ingredients_block_ingredients_image_idx" ON "_pages_v_blocks_ingredients_block_ingredients" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ingredients_block_order_idx" ON "_pages_v_blocks_ingredients_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ingredients_block_parent_id_idx" ON "_pages_v_blocks_ingredients_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ingredients_block_path_idx" ON "_pages_v_blocks_ingredients_block" USING btree ("_path");`)
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
