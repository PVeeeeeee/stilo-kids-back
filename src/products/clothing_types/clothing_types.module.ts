import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothing_types } from '../entities/clothing_types.etity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothing_types])]
})

export class ProductModule {}