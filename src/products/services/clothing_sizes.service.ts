import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';

@Injectable()
export class Clothing_sizesService {
  constructor(
    @InjectRepository(Clothing_sizes)
    private readonly clothingSizesRepo: Repository<Clothing_sizes>,
  ) {}

  findAll(): Promise<Clothing_sizes[]> {
    return this.clothingSizesRepo.find();
  }

  findOne(id: number): Promise<Clothing_sizes> {
    return this.clothingSizesRepo.findOneOrFail({ where: { id } });
  }
}
