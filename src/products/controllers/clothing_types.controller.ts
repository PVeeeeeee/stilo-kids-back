import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Clothing_typesService } from '../services/clothing_types.service';
import { Clothing_types } from '../entities/clothing_types.entity';
import CreateClothing_typesDto from '../dto/create.clothing_types.dto';
import Clothing_typesDto from '../dto/clothing_types.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import UpdateClothing_typesDto from '../dto/update.clothing_types.dto';

@ApiTags('Tipos de Roupas')
@Controller('clothing_typess')
export class Clothing_typesController {
    constructor(
        private readonly clothing_typesService: Clothing_typesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Lista de tipos de roupas retornada com sucesso.',
        type: [Clothing_typesDto],
    })
    async findAll(): Promise<Array<Clothing_typesDto>> {
        const clothing_typess: Clothing_types[] = await this.clothing_typesService.findAll();
        return clothing_typess.map((clothing_types) => new Clothing_typesDto(clothing_types));
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Tipo de roupa criada com sucesso.',
        type: Clothing_typesDto,
    })
    async create(
        @Body() createClothing_typesDto: CreateClothing_typesDto,
    ): Promise<Clothing_typesDto> {
        const clothing_types: Clothing_types = await this.clothing_typesService.create(createClothing_typesDto);
        return new Clothing_typesDto(clothing_types);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Tipo de roupa retornado com sucesso.',
        type: Clothing_typesDto,
    })
    async findOne(@Param('id') id: string): Promise<Clothing_typesDto> {
        const clothing_types: Clothing_types | null = await this.clothing_typesService.findOne(+id);
        if (!clothing_types) throw new NotFoundException('Tipo de roupa não encontrado.');
        return new Clothing_typesDto(clothing_types);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Tipo de roupa atualizado com sucesso.',
        type: Clothing_typesDto,
    })
    async update(
        @Param('id') id: string,
        @Body() updateClothing_typesDto: UpdateClothing_typesDto,
    ): Promise<Clothing_typesDto> {
        const clothing_types: Clothing_types | null = await this.clothing_typesService.findOne(+id);
        if (!clothing_types) throw new NotFoundException('Tipo de roupa não encontrado.');
        const updatedClothing_types: Clothing_types = await this.clothing_typesService.update(
            +id,
            updateClothing_typesDto,
        );
        return new Clothing_typesDto(updatedClothing_types);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Tipo de roupa removido com sucesso.' })
    async remove(@Param('id') id: string): Promise<void> {
        const clothing_types: Clothing_types | null = await this.clothing_typesService.findOne(+id);
        if (!clothing_types) throw new NotFoundException('Tipo de roupa não encontrado.');
        return await this.clothing_typesService.remove(clothing_types);
    }
}