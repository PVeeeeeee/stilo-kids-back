import { ApiProperty } from '@nestjs/swagger';

export default class CreateClothing_typeDto {
    @ApiProperty({
        description: 'Nome do Tipo de Roupa',
        required: true,
        example: "Calça",
    })
    readonly name: string;
}