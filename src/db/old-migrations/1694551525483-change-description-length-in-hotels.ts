import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDescriptionLengthInHotels1694551525483 implements MigrationInterface {
    name = 'ChangeDescriptionLengthInHotels1694551525483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "description" character varying(2048)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "description" character varying(255)`);
    }

}
