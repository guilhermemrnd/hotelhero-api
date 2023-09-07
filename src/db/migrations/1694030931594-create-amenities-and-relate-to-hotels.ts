import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAmenitiesAndRelateToHotels1694030931594 implements MigrationInterface {
    name = 'CreateAmenitiesAndRelateToHotels1694030931594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "amenities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name"), CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotels_amenities_amenities" ("hotelsId" uuid NOT NULL, "amenitiesId" integer NOT NULL, CONSTRAINT "PK_107b7f3381bfd2af1a6c8254a4f" PRIMARY KEY ("hotelsId", "amenitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a84606113e66c5ebfb36f3442" ON "hotels_amenities_amenities" ("hotelsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3ca822ffc8bab0644e44a56fa" ON "hotels_amenities_amenities" ("amenitiesId") `);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "amenities"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "FK_5a84606113e66c5ebfb36f34427" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "FK_e3ca822ffc8bab0644e44a56fa8" FOREIGN KEY ("amenitiesId") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "FK_e3ca822ffc8bab0644e44a56fa8"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "FK_5a84606113e66c5ebfb36f34427"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "amenities" text NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3ca822ffc8bab0644e44a56fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a84606113e66c5ebfb36f3442"`);
        await queryRunner.query(`DROP TABLE "hotels_amenities_amenities"`);
        await queryRunner.query(`DROP TABLE "amenities"`);
    }

}
