import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldsToHotels1694482220872 implements MigrationInterface {
    name = 'AddNewFieldsToHotels1694482220872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ADD "currency_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "bathrooms" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "bathrooms"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "currency_code"`);
    }

}
