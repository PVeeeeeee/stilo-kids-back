import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Clothing_sizesService {
    constructor(
        @InjectRepository(Clothing_sizes)
        private readonly Clothing_sizesRepository: Repository<Clothing_sizes>,
    ) {}

    findAll(): Promise<Clothing_sizes[]> {
        return this.Clothing_sizesRepository.find();
    }

    findOne(id: number): Promise<Clothing_sizes | null> {
        return this.Clothing_sizesRepository.findOneOrFail({
            where: { id: id },
        });
    }
}