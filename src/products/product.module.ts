import { Module } from '@nestjs/common';
import { Clothing_typesService } from './services/clothing_type.service';
import { Clothing_types } from './entities/clothing_types.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';


@Module({

  imports: [TypeOrmModule.forFeature([Clothing_types])],
  providers: [Clothing_typesService],

})

export class ProductModule {}