import { Module } from '@nestjs/common';
import { Clothing_typesService } from './services/clothing_types.service';
import { Clothing_types } from './entities/clothing_types.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Clothing_typesController } from './controllers/clothing_types.controller';


@Module({

  imports: [TypeOrmModule.forFeature([Clothing_types])],
  providers: [Clothing_typesService],
  controllers: [Clothing_typesController],

})

export class ProductModule {}