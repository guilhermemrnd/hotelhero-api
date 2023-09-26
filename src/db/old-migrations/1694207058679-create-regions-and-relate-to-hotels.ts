import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRegionsAndRelateToHotels1694207058679 implements MigrationInterface {
    name = 'CreateRegionsAndRelateToHotels1694207058679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "city" TO "regionId"`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "regionId"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "regionId" integer`);
        await queryRunner.query(`ALTER TABLE "amenities" DROP CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247"`);
        await queryRunner.query(`ALTER TABLE "amenities" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c"`);
        await queryRunner.query(`ALTER TABLE "amenities" DROP CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247"`);
        await queryRunner.query(`ALTER TABLE "amenities" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "regionId"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "regionId" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "regionId" TO "city"`);
    }

}
