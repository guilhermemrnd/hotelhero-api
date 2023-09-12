import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeHotelPropsToFloat1694472749916 implements MigrationInterface {
    name = 'UpdateSomeHotelPropsToFloat1694472749916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "rating" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "dailyPrice" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "dailyPrice"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "dailyPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "rating" integer NOT NULL`);
    }

}
