import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateClothing_typeDto {
    @IsString({
        message: 'O nome do tipo de roupa deve ser um texto.',
    })
    @IsNotEmpty({
        message: 'O nome do tipo de roupa não pode estar vazio.',
    })
    @Length(3, 200, {
        message: 'O nome do tipo de roupa deve ter entre 3 e 200 caracteres.',
    })
    @ApiProperty({
        description: 'Nome do Tipo de Roupa',
        required: true,
        example: "Calça",
    })
    readonly name: string;
}