import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDailyPriceDatatypeInHotels1694033202413 implements MigrationInterface {
    name = 'ChangeDailyPriceDatatypeInHotels1694033202413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "price" TO "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "dailyPrice" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "dailyPrice" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "dailyPrice" TO "price"`);
    }

}
