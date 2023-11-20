import { MigrationInterface, QueryRunner } from "typeorm";

export class SemesterNotUnique1700484730407 implements MigrationInterface {
    name = 'SemesterNotUnique1700484730407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8a6725b8549bfb86bc894e703e\` ON \`enrollment\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8a6725b8549bfb86bc894e703e\` ON \`enrollment\` (\`semester\`)`);
    }

}
