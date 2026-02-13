import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1754490347936 implements MigrationInterface {
    name = 'InitSchema1754490347936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create blockchain_sync table
        await queryRunner.query(`
            CREATE TABLE "blockchain_sync" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "blockchainName" character varying NOT NULL,
                "contractAddress" character varying NOT NULL,
                "lastSyncedBlock" bigint NOT NULL,
                CONSTRAINT "PK_00bfa896787b2a1aba6fc0ef5a6" PRIMARY KEY ("id")
            )
        `);

        // Create win_events table
        await queryRunner.query(`
            CREATE TABLE "win_events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "token" character varying(255) NOT NULL,
                "roundId" integer NOT NULL,
                "chainId" integer NOT NULL,
                "contractAddress" character varying(255) NOT NULL,
                "amount" character varying NOT NULL,
                "ticketId" character varying NOT NULL,
                "blockTimestamp" TIMESTAMP NOT NULL,
                "transactionHash" character varying(255) NOT NULL,
                "logIndex" integer,
                "winnerId" uuid,
                CONSTRAINT "PK_39127fbecc89a0dbe5bb55d532c" PRIMARY KEY ("id")
            )
        `);

        // Create notifications table
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isRead" boolean NOT NULL DEFAULT false,
                "isWinner" boolean NOT NULL,
                "userId" uuid,
                "winEventId" uuid,
                CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
            )
        `);

        // Create user_round_stats table
        await queryRunner.query(`
            CREATE TABLE "user_round_stats" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "token" character varying(255) NOT NULL,
                "roundId" integer NOT NULL,
                "contractAddress" character varying(255) NOT NULL,
                "ticketCount" integer NOT NULL DEFAULT '0',
                "isConsecutive" boolean NOT NULL DEFAULT false,
                "consecutiveRounds" integer NOT NULL DEFAULT '0',
                "totalWins" integer NOT NULL DEFAULT '0',
                "roundTimestamp" TIMESTAMP NOT NULL,
                "userId" uuid,
                CONSTRAINT "UQ_user_round_stats" UNIQUE ("userId", "token", "roundId", "contractAddress"),
                CONSTRAINT "PK_7806321a4d50a3fc43428fdd475" PRIMARY KEY ("id")
            )
        `);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "address" character varying(255) NOT NULL,
                "totalTickets" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        // Create first_ticket_bonuses table
        await queryRunner.query(`
            CREATE TABLE "first_ticket_bonuses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "token" character varying(255) NOT NULL,
                "roundId" integer NOT NULL,
                "chainId" integer NOT NULL,
                "contractAddress" character varying(255) NOT NULL,
                "blockTimestamp" TIMESTAMP NOT NULL,
                "transactionHash" character varying(255) NOT NULL,
                "logIndex" integer,
                "buyerId" uuid,
                CONSTRAINT "PK_b1fbac178eafd453637053e0c6d" PRIMARY KEY ("id")
            )
        `);

        // Create ticket_purchases table
        await queryRunner.query(`
            CREATE TABLE "ticket_purchases" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "token" character varying(255) NOT NULL,
                "roundId" integer NOT NULL,
                "chainId" integer NOT NULL,
                "contractAddress" character varying(255) NOT NULL,
                "count" integer NOT NULL,
                "totalAmount" character varying NOT NULL,
                "blockTimestamp" TIMESTAMP NOT NULL,
                "transactionHash" character varying(255) NOT NULL,
                "logIndex" integer,
                "buyerId" uuid,
                CONSTRAINT "PK_7a6c49a6aba11fcc8af9635c199" PRIMARY KEY ("id")
            )
        `);

        // Create win_event_players junction table
        await queryRunner.query(`
            CREATE TABLE "win_event_players" (
                "win_event_id" uuid NOT NULL,
                "player_id" uuid NOT NULL,
                CONSTRAINT "PK_c3b7d4f966c3d631c4e86aea420" PRIMARY KEY ("win_event_id", "player_id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "IDX_c2439da94ee5cc3894ac47ab24" ON "win_events" ("token")`);
        await queryRunner.query(`CREATE INDEX "IDX_10cf085662497e7fc0a6b69aad" ON "win_events" ("roundId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7501e9a1bc124052185e220e57" ON "win_events" ("contractAddress")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_win_events_tx_log" ON "win_events" ("transactionHash", "logIndex")`);

        await queryRunner.query(`CREATE INDEX "IDX_8ba28344602d583583b9ea1a50" ON "notifications" ("isRead")`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_created_at" ON "notifications" ("createdAt")`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_user_unread" ON "notifications" ("userId", "isRead")`);

        await queryRunner.query(`CREATE INDEX "IDX_25ed3da8579c46ed3541941bf9" ON "user_round_stats" ("token")`);
        await queryRunner.query(`CREATE INDEX "IDX_fe19e029c0a32a9b3a1df891ff" ON "user_round_stats" ("roundId")`);
        await queryRunner.query(`CREATE INDEX "IDX_41b43f1df29500414cb157c36b" ON "user_round_stats" ("contractAddress")`);

        await queryRunner.query(`CREATE INDEX "IDX_b0ec0293d53a1385955f9834d5" ON "users" ("address")`);

        await queryRunner.query(`CREATE INDEX "IDX_a6825c4471082904f419c2e8b0" ON "first_ticket_bonuses" ("token")`);
        await queryRunner.query(`CREATE INDEX "IDX_187ef72eab83658a8c916022e9" ON "first_ticket_bonuses" ("roundId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ced6962e500825a1e7c18dd8e5" ON "first_ticket_bonuses" ("chainId")`);
        await queryRunner.query(`CREATE INDEX "IDX_28f98599c1b2d4a5c809c6ab99" ON "first_ticket_bonuses" ("contractAddress")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_first_ticket_bonuses_tx_log" ON "first_ticket_bonuses" ("transactionHash", "logIndex")`);

        await queryRunner.query(`CREATE INDEX "IDX_be6a0172b42e4157495bde91dc" ON "ticket_purchases" ("token")`);
        await queryRunner.query(`CREATE INDEX "IDX_5052033ee3ee08965bf86ce437" ON "ticket_purchases" ("roundId")`);
        await queryRunner.query(`CREATE INDEX "IDX_a94468fbd82d7c23a4c2255c9c" ON "ticket_purchases" ("chainId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7fcd2397f177aa95921df7c83d" ON "ticket_purchases" ("contractAddress")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ticket_purchases_tx_log" ON "ticket_purchases" ("transactionHash", "logIndex")`);

        await queryRunner.query(`CREATE INDEX "IDX_60916c3f305dfc01dd37dfa507" ON "win_event_players" ("win_event_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_5a83a201a84c6cfe055af13f6c" ON "win_event_players" ("player_id")`);

        // Create foreign key constraints
        await queryRunner.query(`ALTER TABLE "win_events" ADD CONSTRAINT "FK_87157e2a759b0f40851bb2538e5" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_3b75401f159126e1b9170e6e8a9" FOREIGN KEY ("winEventId") REFERENCES "win_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_round_stats" ADD CONSTRAINT "FK_f649ad2cb2720924d38524884fa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "first_ticket_bonuses" ADD CONSTRAINT "FK_433501febe0bb284eb36ae493f0" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_purchases" ADD CONSTRAINT "FK_bb776cda35f0fd73f54173f3b23" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "win_event_players" ADD CONSTRAINT "FK_60916c3f305dfc01dd37dfa507a" FOREIGN KEY ("win_event_id") REFERENCES "win_events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "win_event_players" ADD CONSTRAINT "FK_5a83a201a84c6cfe055af13f6c5" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "win_event_players" DROP CONSTRAINT "FK_5a83a201a84c6cfe055af13f6c5"`);
        await queryRunner.query(`ALTER TABLE "win_event_players" DROP CONSTRAINT "FK_60916c3f305dfc01dd37dfa507a"`);
        await queryRunner.query(`ALTER TABLE "ticket_purchases" DROP CONSTRAINT "FK_bb776cda35f0fd73f54173f3b23"`);
        await queryRunner.query(`ALTER TABLE "first_ticket_bonuses" DROP CONSTRAINT "FK_433501febe0bb284eb36ae493f0"`);
        await queryRunner.query(`ALTER TABLE "user_round_stats" DROP CONSTRAINT "FK_f649ad2cb2720924d38524884fa"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_3b75401f159126e1b9170e6e8a9"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "win_events" DROP CONSTRAINT "FK_87157e2a759b0f40851bb2538e5"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX "public"."IDX_5a83a201a84c6cfe055af13f6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60916c3f305dfc01dd37dfa507"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ticket_purchases_tx_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fcd2397f177aa95921df7c83d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a94468fbd82d7c23a4c2255c9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5052033ee3ee08965bf86ce437"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be6a0172b42e4157495bde91dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_first_ticket_bonuses_tx_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28f98599c1b2d4a5c809c6ab99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ced6962e500825a1e7c18dd8e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_187ef72eab83658a8c916022e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6825c4471082904f419c2e8b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0ec0293d53a1385955f9834d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41b43f1df29500414cb157c36b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe19e029c0a32a9b3a1df891ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25ed3da8579c46ed3541941bf9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_notifications_user_unread"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_notifications_created_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ba28344602d583583b9ea1a50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_win_events_tx_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7501e9a1bc124052185e220e57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10cf085662497e7fc0a6b69aad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2439da94ee5cc3894ac47ab24"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "win_event_players"`);
        await queryRunner.query(`DROP TABLE "ticket_purchases"`);
        await queryRunner.query(`DROP TABLE "first_ticket_bonuses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_round_stats"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "win_events"`);
        await queryRunner.query(`DROP TABLE "blockchain_sync"`);
    }
}
