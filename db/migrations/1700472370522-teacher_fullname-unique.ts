import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherFullnameUnique1700472370522 implements MigrationInterface {
    name = 'TeacherFullnameUnique1700472370522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers\` CHANGE \`name\` \`fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP COLUMN \`fullname\``);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD \`fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD UNIQUE INDEX \`IDX_d759adda1dbd06bfb9af3a20f2\` (\`fullname\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP INDEX \`IDX_d759adda1dbd06bfb9af3a20f2\``);
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP COLUMN \`fullname\``);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD \`fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teachers\` CHANGE \`fullname\` \`name\` varchar(255) NOT NULL`);
    }

}
