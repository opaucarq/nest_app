import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentMail1700469274290 implements MigrationInterface {
    name = 'StudentMail1700469274290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD UNIQUE INDEX \`IDX_25985d58c714a4a427ced57507\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP INDEX \`IDX_25985d58c714a4a427ced57507\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP COLUMN \`email\``);
    }

}
