import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothing_sizes } from './entities/clothing_sizes.entity';
import { Clothing_sizesController } from './controllers/clothing_sizes.controller';
import { Clothing_sizesService } from './services/clothing_sizes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clothing_sizes])],
  controllers: [Clothing_sizesController],
  providers: [Clothing_sizesService],
})
export class ProductModule {}