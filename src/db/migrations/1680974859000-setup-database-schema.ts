import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDatabaseSchema1680974859000 implements MigrationInterface {
  name = 'SetupDatabaseSchema1680974859000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            "name" character varying(100) NOT NULL,
            "email" character varying(75) UNIQUE NOT NULL,
            "password" character varying(255) NOT NULL,
            "created_at" TIMESTAMP DEFAULT now(),
            "updated_at" TIMESTAMP DEFAULT now()
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "hotels" (
            "id" serial PRIMARY KEY,
            "name" character varying(100) NOT NULL,
            "address" character varying(255) NOT NULL,
            "rating" float,
            "number_of_reviews" integer,
            "daily_price" float NOT NULL,
            "currency_code" character varying NOT NULL,
            "description" character varying(2048),
            "photos" text[],
            "max_guests" integer,
            "bathrooms" integer,
            "region_id" integer
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "regions" (
            "id" serial PRIMARY KEY,
            "name" character varying(100) NOT NULL
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "bookings" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            "user_id" uuid NOT NULL,
            "hotel_id" integer NOT NULL,
            "check_in" date NOT NULL,
            "check_out" date NOT NULL,
            "number_of_guests" integer NOT NULL,
            "total_cost" float NOT NULL,
            "is_paid" boolean DEFAULT false,
            "payment_id" character varying,
            "created_at" TIMESTAMP DEFAULT now(),
            "updated_at" TIMESTAMP DEFAULT now(),
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
            FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "amenities" (
            "id" serial PRIMARY KEY,
            "name" character varying(50) UNIQUE NOT NULL
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "hotel_amenities" (
            "hotel_id" integer,
            "amenity_id" integer,
            PRIMARY KEY ("hotel_id", "amenity_id"),
            FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE,
            FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE CASCADE
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "user_favorite_hotels" (
            "user_id" uuid,
            "hotel_id" integer,
            PRIMARY KEY ("user_id", "hotel_id"),
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
            FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE
        )
    `);

    // Add foreign key for region_id in hotels table
    await queryRunner.query(`
        ALTER TABLE "hotels" ADD CONSTRAINT "fk_region" FOREIGN KEY ("region_id") REFERENCES "regions"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_favorite_hotels"`);
    await queryRunner.query(`DROP TABLE "hotel_amenities"`);
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TABLE "amenities"`);
    await queryRunner.query(`DROP TABLE "hotels"`);
    await queryRunner.query(`DROP TABLE "regions"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
