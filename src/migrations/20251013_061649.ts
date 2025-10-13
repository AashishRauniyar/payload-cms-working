import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_rating_table" RENAME COLUMN "overall_rating" TO "custom_rating";
  ALTER TABLE "_pages_v_blocks_rating_table" RENAME COLUMN "overall_rating" TO "custom_rating";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_rating_table" RENAME COLUMN "custom_rating" TO "overall_rating";
  ALTER TABLE "_pages_v_blocks_rating_table" RENAME COLUMN "custom_rating" TO "overall_rating";`)
}
