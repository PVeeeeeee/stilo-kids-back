import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClothingSizesTable1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clothing_sizes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'size',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                ],
            }),
        );

        await queryRunner.query(`
            INSERT INTO clothing_sizes (size) VALUES
            ('P'), ('M'), ('G'), ('GG')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clothing_sizes');
    }
}
