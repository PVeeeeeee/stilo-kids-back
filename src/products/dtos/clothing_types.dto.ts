import { ApiProperty } from '@nestjs/swagger';
import { Clothing_types } from '../entities/clothing_types.etity';

export default class Clothing_typesDto {
    @ApiProperty({
        description: 'ID do Tipo de Roupa',
        example: 1,
        readOnly: true,
    })
    readonly id: number;

    @ApiProperty({
        description: 'Nome de do Tipo de Roupa',
        example: "Calça",
        readOnly: true,
    })
    readonly name: string;

    @ApiProperty({
        description: 'Data de criação da Marca',
        example: '2012-12-16 12:00:00',
        readOnly: true,
    })
    readonly createdAt: Date;

    constructor(clothing_types: Clothing_types) {
        this.id = clothing_types.id;
        this.name = clothing_types.name;
        this.createdAt = clothing_types.createdAt;
    }
}