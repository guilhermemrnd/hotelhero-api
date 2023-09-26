import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFavoriteHotelsTable1695047322833 implements MigrationInterface {
    name = 'CreateUserFavoriteHotelsTable1695047322833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorite_hotels" ("user_id" uuid NOT NULL, "hotel_id" integer NOT NULL, CONSTRAINT "PK_c2198ddf487a72d4fcc5a58a796" PRIMARY KEY ("user_id", "hotel_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c88c52a2210460fb6172fcb201" ON "user_favorite_hotels" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9aa2180d7df3d03191a2b9a669" ON "user_favorite_hotels" ("hotel_id") `);
        await queryRunner.query(`CREATE TABLE "hotel_amenities" ("hotel_id" integer NOT NULL, "amenity_id" integer NOT NULL, CONSTRAINT "PK_1bfd05aed0719ca4ed730a9fec6" PRIMARY KEY ("hotel_id", "amenity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_505e0ae297dbf218358df42f10" ON "hotel_amenities" ("hotel_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9ade152f67927461bc334fbe47" ON "hotel_amenities" ("amenity_id") `);
        await queryRunner.query(`ALTER TABLE "user_favorite_hotels" ADD CONSTRAINT "FK_c88c52a2210460fb6172fcb201e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_hotels" ADD CONSTRAINT "FK_9aa2180d7df3d03191a2b9a6694" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotel_amenities" ADD CONSTRAINT "FK_505e0ae297dbf218358df42f102" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hotel_amenities" ADD CONSTRAINT "FK_9ade152f67927461bc334fbe47c" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel_amenities" DROP CONSTRAINT "FK_9ade152f67927461bc334fbe47c"`);
        await queryRunner.query(`ALTER TABLE "hotel_amenities" DROP CONSTRAINT "FK_505e0ae297dbf218358df42f102"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_hotels" DROP CONSTRAINT "FK_9aa2180d7df3d03191a2b9a6694"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_hotels" DROP CONSTRAINT "FK_c88c52a2210460fb6172fcb201e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ade152f67927461bc334fbe47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_505e0ae297dbf218358df42f10"`);
        await queryRunner.query(`DROP TABLE "hotel_amenities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9aa2180d7df3d03191a2b9a669"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c88c52a2210460fb6172fcb201"`);
        await queryRunner.query(`DROP TABLE "user_favorite_hotels"`);
    }

}
