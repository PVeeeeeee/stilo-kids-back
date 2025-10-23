import { PartialType } from '@nestjs/swagger';
import CreateClothing_typesDto from './create.clothing_types.dto';


export default class UpdateClothing_typesDto extends PartialType(CreateClothing_typesDto) {}