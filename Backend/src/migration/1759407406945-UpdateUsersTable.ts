import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1759407406945 implements MigrationInterface {
    name = 'UpdateUsersTable1759407406945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b0ec0293d53a1385955f9834d5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "totalTickets"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b0ec0293d53a1385955f9834d5c" UNIQUE ("address")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_b0ec0293d53a1385955f9834d5c"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "totalTickets" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX "IDX_b0ec0293d53a1385955f9834d5" ON "users" ("address") `);
    }

}
