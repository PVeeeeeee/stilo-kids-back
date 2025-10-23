import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';


@Module({


  imports: [TypeOrmModule.forFeature([Clothing_sizes])]


})

export class Clothing_sizesModule {}