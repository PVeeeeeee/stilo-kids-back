import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClothing_typesTable1761259267657 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clothing_types',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'created_at',
                        default: 'CURRENT_TIMESTAMP',
                        type: 'timestamp',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('brands')
    }
}