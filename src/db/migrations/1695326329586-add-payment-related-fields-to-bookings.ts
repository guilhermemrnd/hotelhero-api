import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentRelatedFieldsToBookings1695326329586 implements MigrationInterface {
    name = 'AddPaymentRelatedFieldsToBookings1695326329586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "booking_status"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "is_paid" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "payment_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "is_paid"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "booking_status" character varying NOT NULL`);
    }

}
