import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1700468163547 implements MigrationInterface {
    name = 'Database1700468163547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teachers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`teacherId\` int NULL, \`enrollmentId\` int NULL, UNIQUE INDEX \`IDX_d011c391e37d9a5e63e8b04c97\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`enrollment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`semester\` varchar(255) NOT NULL, \`studentId\` int NULL, UNIQUE INDEX \`IDX_8a6725b8549bfb86bc894e703e\` (\`semester\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subject\` ADD CONSTRAINT \`FK_48cd9a23912fb4d5ad3b1b90ff1\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subject\` ADD CONSTRAINT \`FK_2fc99c9f33df5ff985ebdb19197\` FOREIGN KEY (\`enrollmentId\`) REFERENCES \`enrollment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`enrollment\` ADD CONSTRAINT \`FK_5ce702e71b98cc1bb37b81e83d8\` FOREIGN KEY (\`studentId\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`enrollment\` DROP FOREIGN KEY \`FK_5ce702e71b98cc1bb37b81e83d8\``);
        await queryRunner.query(`ALTER TABLE \`subject\` DROP FOREIGN KEY \`FK_2fc99c9f33df5ff985ebdb19197\``);
        await queryRunner.query(`ALTER TABLE \`subject\` DROP FOREIGN KEY \`FK_48cd9a23912fb4d5ad3b1b90ff1\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a6725b8549bfb86bc894e703e\` ON \`enrollment\``);
        await queryRunner.query(`DROP TABLE \`enrollment\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP INDEX \`IDX_d011c391e37d9a5e63e8b04c97\` ON \`subject\``);
        await queryRunner.query(`DROP TABLE \`subject\``);
        await queryRunner.query(`DROP TABLE \`teachers\``);
    }

}
