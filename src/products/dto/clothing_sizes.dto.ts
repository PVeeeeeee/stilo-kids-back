import { ApiProperty } from '@nestjs/swagger';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';

export default class Clothing_sizesDto {
    @ApiProperty({
        description: 'ID do Tamanho de Roupa',
        example: 1,
        readOnly: true,
    })
    readonly id: number;

    @ApiProperty({
        description: 'tamanho de roupa',
        example: "p",
        readOnly: true,
    })
    readonly name: string;

    constructor(clothing_size: Clothing_sizes) {
        this.id = clothing_size.id;
        this.name = clothing_size.name;
    }
}