import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeHotelPhotosFieldAnArray1695849759370 implements MigrationInterface {
    name = 'MakeHotelPhotosFieldAnArray1695849759370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "photos"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "photos" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "photos"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "photos" text NOT NULL`);
    }

}
