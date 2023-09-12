import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameHotelsFields1694481264096 implements MigrationInterface {
    name = 'RenameHotelsFields1694481264096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "numberOfReviews"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "maxGuests"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "number_of_reviews" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "daily_price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "max_guests" integer`);
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "max_guests"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "daily_price"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "number_of_reviews"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "dailyPrice" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "maxGuests" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "numberOfReviews" integer NOT NULL`);
    }

}
