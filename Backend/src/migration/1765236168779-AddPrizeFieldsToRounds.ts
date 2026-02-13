import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrizeFieldsToRounds1765236168779 implements MigrationInterface {
    name = 'AddPrizeFieldsToRounds1765236168779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rounds" ADD "prizeAmount" character varying`);
        await queryRunner.query(`ALTER TABLE "rounds" ADD "commissionAmount" character varying`);
        await queryRunner.query(`ALTER TABLE "rounds" ADD "prizeClaimed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rounds" DROP COLUMN "prizeClaimed"`);
        await queryRunner.query(`ALTER TABLE "rounds" DROP COLUMN "commissionAmount"`);
        await queryRunner.query(`ALTER TABLE "rounds" DROP COLUMN "prizeAmount"`);
    }

}
