import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothing_types } from '../entities/clothing_types.entity';
import { Repository } from 'typeorm';
import CreateClothing_typesDto from '../dto/create.clothing_types.dto';
import UpdateClothing_typesDto from '../dto/update.clothing_types.dto';

@Injectable()
export class Clothing_typesService {
    constructor(
        @InjectRepository(Clothing_types)
        private readonly clothing_typesRepository: Repository<Clothing_types>,
    ) {}

    findAll(): Promise<Clothing_types[]> {
        return this.clothing_typesRepository.find();
    }

    findOne(id: number): Promise<Clothing_types | null> {
        return this.clothing_typesRepository.findOneOrFail({
            where: { id: id },
        });
    }

    create(createClothing_typesDto: CreateClothing_typesDto): Promise<Clothing_types> {
        const clothing_types = this.clothing_typesRepository.create(createClothing_typesDto);
        return this.clothing_typesRepository.save(clothing_types);
    }

    async update(id: number, updateClothing_typesDto: UpdateClothing_typesDto): Promise<Clothing_types> {
        const clothing_types = await this.clothing_typesRepository.findOne({
            where: { id },
        });

        if (!clothing_types) throw new Error('Clothing_types not found');

        Object.assign(clothing_types, updateClothing_typesDto);
        return this.clothing_typesRepository.save(clothing_types);
    }

    async remove(clothing_types: Clothing_types): Promise<void> {
        await this.clothing_typesRepository.softRemove(clothing_types);
    }
}