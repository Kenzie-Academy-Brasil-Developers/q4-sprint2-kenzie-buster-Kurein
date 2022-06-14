import { MigrationInterface, QueryRunner } from "typeorm";

export class CartsTable1655237025741 implements MigrationInterface {
    name = 'CartsTable1655237025741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_743b8f45f0ce73d429855c40ead" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_743b8f45f0ce73d429855c40ead"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
