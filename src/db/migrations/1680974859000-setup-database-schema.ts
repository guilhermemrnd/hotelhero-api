import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDatabaseSchema1680974859000 implements MigrationInterface {
  name = 'SetupDatabaseSchema1680974859000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying(100) NOT NULL,
            "email" character varying(75) UNIQUE NOT NULL,
            "password" character varying(255) NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "regions" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying(100) NOT NULL
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "amenities" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying(50) UNIQUE NOT NULL
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "hotels" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying(100) NOT NULL,
            "address" character varying(255) NOT NULL,
            "rating" float,
            "number_of_reviews" integer,
            "daily_price" float NOT NULL,
            "currency_code" character varying NOT NULL,
            "description" character varying(2048),
            "photos" text[] NOT NULL,
            "max_guests" integer,
            "bathrooms" integer,
            "regionId" integer,
            CONSTRAINT "FK_region_hotels" FOREIGN KEY ("regionId") REFERENCES "regions"("id")
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "bookings" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
            "user_id" uuid,
            "hotel_id" integer,
            "check_in" TIMESTAMP NOT NULL,
            "check_out" TIMESTAMP NOT NULL,
            "number_of_guests" integer NOT NULL,
            "total_cost" float NOT NULL,
            "is_paid" boolean DEFAULT false,
            "payment_id" character varying,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "FK_booking_user" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
            CONSTRAINT "FK_booking_hotel" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id")
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "user_favorite_hotels" (
            "user_id" uuid,
            "hotel_id" integer,
            CONSTRAINT "PK_user_hotel" PRIMARY KEY ("user_id", "hotel_id"),
            CONSTRAINT "FK_user" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
            CONSTRAINT "FK_hotel" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id")
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "hotel_amenities" (
            "hotel_id" integer,
            "amenity_id" integer,
            CONSTRAINT "PK_hotel_amenity" PRIMARY KEY ("hotel_id", "amenity_id"),
            CONSTRAINT "FK_amenity_hotel" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id"),
            CONSTRAINT "FK_hotel_amenity" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hotel_amenities"`);
    await queryRunner.query(`DROP TABLE "user_favorite_hotels"`);
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TABLE "hotels"`);
    await queryRunner.query(`DROP TABLE "amenities"`);
    await queryRunner.query(`DROP TABLE "regions"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
