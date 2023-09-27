import { MigrationInterface, QueryRunner } from "typeorm";

export class NameRelatedColumns1695845231905 implements MigrationInterface {
    name = 'NameRelatedColumns1695845231905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_6713f297621b99988068dd63fe5"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c"`);
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "regionId" TO "region_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "hotelId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "hotel_id" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_a71eec827a2ac2285d6266d7120" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_61591f0b38d54adda56dcab1a7b" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_61591f0b38d54adda56dcab1a7b"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_a71eec827a2ac2285d6266d7120"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "hotel_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "hotelId" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "hotels" RENAME COLUMN "region_id" TO "regionId"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_6713f297621b99988068dd63fe5" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
