import { ApiProperty } from '@nestjs/swagger';

export default class CreateBrandDto {
    @ApiProperty({
        description: 'Nome da Marca',
        required: true,
        example: "Adidas",
    })
    readonly name: string;
}