import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeHotelFieldsNullable1695069563195 implements MigrationInterface {
    name = 'MakeHotelFieldsNullable1695069563195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "rating" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "number_of_reviews" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "number_of_reviews" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "rating" SET NOT NULL`);
    }

}
