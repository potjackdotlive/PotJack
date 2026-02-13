import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRound1759235694350 implements MigrationInterface {
  name = 'AddRound1759235694350';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "rounds"
                             (
                               "id"              uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                               "createdAt"       TIMESTAMP              NOT NULL DEFAULT now(),
                               "updatedAt"       TIMESTAMP              NOT NULL DEFAULT now(),
                               "contractAddress" character varying(255) NOT NULL,
                               "token"           character varying(255) NOT NULL,
                               "roundId"         integer                NOT NULL,
                               "chainId"         integer                NOT NULL,
                               "startTime"       TIMESTAMP              NOT NULL,
                               "endTime"         TIMESTAMP              NOT NULL,
                               CONSTRAINT "PK_9d254884a20817016e2f877c7e7" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE INDEX "IDX_8260ac9b0d34b856818bbd23eb" ON "rounds" ("contractAddress")`);
    await queryRunner.query(`CREATE INDEX "IDX_09dcf1c23cadd65fc2eba107f0" ON "rounds" ("token")`);
    await queryRunner.query(`CREATE INDEX "IDX_190af5394aab7d00cf6c2fc1b8" ON "rounds" ("roundId")`);
    await queryRunner.query(`CREATE INDEX "IDX_8f1db00c1b9158a5a2804115e6" ON "rounds" ("chainId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX "public"."IDX_8f1db00c1b9158a5a2804115e6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_190af5394aab7d00cf6c2fc1b8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_09dcf1c23cadd65fc2eba107f0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8260ac9b0d34b856818bbd23eb"`);

    // Drop table
    await queryRunner.query(`DROP TABLE "rounds"`);
  }
}
