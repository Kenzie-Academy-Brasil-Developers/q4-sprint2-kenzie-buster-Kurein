import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesCorrection1655237207108 implements MigrationInterface {
    name = 'TablesCorrection1655237207108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_743b8f45f0ce73d429855c40ead"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_743b8f45f0ce73d429855c40ead" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
