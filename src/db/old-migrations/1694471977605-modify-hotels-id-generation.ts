import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyHotelsIdGeneration1694471977605 implements MigrationInterface {
    name = 'ModifyHotelsIdGeneration1694471977605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_6713f297621b99988068dd63fe5"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "FK_5a84606113e66c5ebfb36f34427"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "hotelId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "hotelId" integer`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "PK_107b7f3381bfd2af1a6c8254a4f"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "PK_e3ca822ffc8bab0644e44a56fa8" PRIMARY KEY ("amenitiesId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a84606113e66c5ebfb36f3442"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP COLUMN "hotelsId"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD "hotelsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "PK_e3ca822ffc8bab0644e44a56fa8"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "PK_107b7f3381bfd2af1a6c8254a4f" PRIMARY KEY ("amenitiesId", "hotelsId")`);
        await queryRunner.query(`CREATE INDEX "IDX_5a84606113e66c5ebfb36f3442" ON "hotels_amenities_amenities" ("hotelsId") `);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_6713f297621b99988068dd63fe5" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "FK_5a84606113e66c5ebfb36f34427" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "FK_5a84606113e66c5ebfb36f34427"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_6713f297621b99988068dd63fe5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a84606113e66c5ebfb36f3442"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "PK_107b7f3381bfd2af1a6c8254a4f"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "PK_e3ca822ffc8bab0644e44a56fa8" PRIMARY KEY ("amenitiesId")`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP COLUMN "hotelsId"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD "hotelsId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_5a84606113e66c5ebfb36f3442" ON "hotels_amenities_amenities" ("hotelsId") `);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" DROP CONSTRAINT "PK_e3ca822ffc8bab0644e44a56fa8"`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "PK_107b7f3381bfd2af1a6c8254a4f" PRIMARY KEY ("hotelsId", "amenitiesId")`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "hotelId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "hotelId" uuid`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "hotels_amenities_amenities" ADD CONSTRAINT "FK_5a84606113e66c5ebfb36f34427" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_6713f297621b99988068dd63fe5" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
