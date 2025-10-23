import { Test, TestingModule } from '@nestjs/testing';
import { Clothing_sizesController } from './clothing_sizes.controller';
import { Clothing_sizesService } from '../services/clothing_sizes.service';
import { NotFoundException } from '@nestjs/common';
import { Clothing_sizes } from '../entities/clothing_sizes.entity';
import Clothing_sizesDto from '../dto/clothing_sizes.dto';

describe('Clothing_sizesController', () => {
  let controller: Clothing_sizesController;
  let service: Clothing_sizesService;

  const mockClothingSize: Clothing_sizes = {
    id: 2,
    name: 'M',
  } as Clothing_sizes;

  const mockClothingSizesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Clothing_sizesController],
      providers: [
        {
          provide: Clothing_sizesService,
          useValue: mockClothingSizesService,
        },
      ],
    }).compile();

    controller = module.get<Clothing_sizesController>(Clothing_sizesController);
    service = module.get<Clothing_sizesService>(Clothing_sizesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de tamanhos de roupa', async () => {
      mockClothingSizesService.findAll.mockResolvedValueOnce([mockClothingSize]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([new Clothing_sizesDto(mockClothingSize)]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um tamanho de roupa quando encontrado', async () => {
      mockClothingSizesService.findOne.mockResolvedValueOnce(mockClothingSize);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(new Clothing_sizesDto(mockClothingSize));
    });

    it('deve lançar NotFoundException quando o tamanho não for encontrado', async () => {
      mockClothingSizesService.findOne.mockResolvedValueOnce(null);

      await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(99);
    });
  });
});