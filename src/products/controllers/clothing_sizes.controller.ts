import {
    Controller,
    Get,
    NotFoundException,
    Param,
} from '@nestjs/common';
import { Clothing_sizesService } from '../services/clothing_sizes.service';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';
import Clothing_sizesDto from '../dto/clothing_sizes.dto';
import {ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tamanhos das Roupas')
@Controller('Clothing_sizess')
export class Clothing_sizesController {
    constructor(
        private readonly Clothing_sizesService: Clothing_sizesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Lista dos tamanhos das roupas retornada com sucesso.',
        type: [Clothing_sizesDto],
    })
    async findAll(): Promise<Array<Clothing_sizesDto>> {
        const Clothing_sizess: Clothing_sizes[] = await this.Clothing_sizesService.findAll();
        return Clothing_sizess.map((Clothing_sizes) => new Clothing_sizesDto(Clothing_sizes));
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Tamanho da Roupa retornado com sucesso.',
        type: Clothing_sizesDto,
    })
    async findOne(@Param('id') id: string): Promise<Clothing_sizesDto> {
        const Clothing_sizes: Clothing_sizes | null = await this.Clothing_sizesService.findOne(+id);
        if (!Clothing_sizes) throw new NotFoundException('Tamanho da Roupa não encontrado.');
        return new Clothing_sizesDto(Clothing_sizes);
    }
}