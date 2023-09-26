import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameHotelLocationColumn1694025735152 implements MigrationInterface {
    name = 'RenameHotelLocationColumn1694025735152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "location" TO "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "address" TO "location"`);
    }

}
