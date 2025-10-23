import Clothing_sizesDto from './clothing_sizes.dto';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';

describe('Clothing_sizesDto', () => {
  it('deve mapear corretamente os campos da entidade', () => {
    const mockEntity: Clothing_sizes = {
      id: 1,
      name: 'P',
    };

    const dto = new Clothing_sizesDto(mockEntity);

    expect(dto).toBeInstanceOf(Clothing_sizesDto);
    expect(dto.id).toBe(mockEntity.id);
    expect(dto.name).toBe(mockEntity.name);
  });

  it('deve criar o DTO mesmo com dados diferentes', () => {
    const mockEntity: Clothing_sizes = {
      id: 4,
      name: 'GG',
    };

    const dto = new Clothing_sizesDto(mockEntity);

    expect(dto.id).toBe(4);
    expect(dto.name).toBe('GG');
  });
});