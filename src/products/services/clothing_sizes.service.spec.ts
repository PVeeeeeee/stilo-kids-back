import { Repository } from 'typeorm';
import { Clothing_sizesService } from './clothing_sizes.service';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Clothing_sizesService', () => {
  let service: Clothing_sizesService;
  let clothingSizesRepository: jest.Mocked<Repository<Clothing_sizes>>;

  const mockClothingSizes: Clothing_sizes = {
    id: 1,
    name: 'M',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Clothing_sizesService,
        {
          provide: getRepositoryToken(Clothing_sizes),
          useValue: {
            find: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Clothing_sizesService>(Clothing_sizesService);
    clothingSizesRepository = module.get(getRepositoryToken(Clothing_sizes));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os tamanhos de roupa', async () => {
      const expected = [mockClothingSizes];
      clothingSizesRepository.find.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(clothingSizesRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });

    it('deve retornar array vazio quando não houver tamanhos', async () => {
      clothingSizesRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(clothingSizesRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um tamanho pelo id', async () => {
      const id = 1;
      clothingSizesRepository.findOneOrFail.mockResolvedValue(mockClothingSizes);

      const result = await service.findOne(id);

      expect(clothingSizesRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockClothingSizes);
    });

    it('deve lançar erro se tamanho não for encontrado', async () => {
      const id = 999;
      const error = new Error('EntityNotFound');
      clothingSizesRepository.findOneOrFail.mockRejectedValue(error);

      await expect(service.findOne(id)).rejects.toThrow(error);
      expect(clothingSizesRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});