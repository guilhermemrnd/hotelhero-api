import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBookingsIdGeneration1695482893646 implements MigrationInterface {
    name = 'ChangeBookingsIdGeneration1695482893646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_bee6805982cc1e248e94ce94957"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_bee6805982cc1e248e94ce94957"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")`);
    }

}
