import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRegionsIdGeneration1694233240154 implements MigrationInterface {
    name = 'ModifyRegionsIdGeneration1694233240154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c"`);
        await queryRunner.query(`ALTER TABLE "regions" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "regions_id_seq"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "regions_id_seq" OWNED BY "regions"."id"`);
        await queryRunner.query(`ALTER TABLE "regions" ALTER COLUMN "id" SET DEFAULT nextval('"regions_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_d5f97ef0c88e3a71f219575e40c" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
