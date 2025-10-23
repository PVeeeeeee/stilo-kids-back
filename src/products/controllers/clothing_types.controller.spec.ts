import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Clothing_typesController } from './clothing_types.controller';
import { Clothing_typesService } from '../services/clothing_types.service';
import { Clothing_types } from '../entities/clothing_types.entity';
import Clothing_typesDto from '../dto/clothing_types.dto';
import CreateClothing_typesDto from '../dto/create.clothing_types.dto';
import UpdateClothing_typesDto from '../dto/update.clothing_types.dto';

describe('Clothing_typesController', () => {
  let controller: Clothing_typesController;
  let service: jest.Mocked<Clothing_typesService>;

  const mockClothingTypeEntity: Clothing_types = {
    id: 1,
    name: 'Calça',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    deletedAt: null,
  };

  const mockClothingTypeDto = new Clothing_typesDto(mockClothingTypeEntity);

  const createDto: CreateClothing_typesDto = {
    name: 'Calça',
  };

  const updateDto: UpdateClothing_typesDto = {
    name: 'Shorts',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Clothing_typesController],
      providers: [
        {
          provide: Clothing_typesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<Clothing_typesController>(Clothing_typesController);
    service = module.get(Clothing_typesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de Clothing_typesDto', async () => {
      service.findAll.mockResolvedValue([mockClothingTypeEntity]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockClothingTypeDto]);
      expect(result[0]).toBeInstanceOf(Clothing_typesDto);
    });
  });

  describe('create', () => {
    it('deve criar e retornar um Clothing_typesDto', async () => {
      service.create.mockResolvedValue(mockClothingTypeEntity);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockClothingTypeDto);
      expect(result).toBeInstanceOf(Clothing_typesDto);
    });
  });

  describe('findOne', () => {
    it('deve retornar um Clothing_typesDto quando encontrado', async () => {
      service.findOne.mockResolvedValue(mockClothingTypeEntity);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockClothingTypeDto);
      expect(result).toBeInstanceOf(Clothing_typesDto);
    });

    it('deve lançar NotFoundException se não encontrado', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(99);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar um Clothing_typesDto', async () => {
      const updatedEntity = { ...mockClothingTypeEntity, ...updateDto };
      const updatedDto = new Clothing_typesDto(updatedEntity);

      service.findOne.mockResolvedValue(mockClothingTypeEntity);
      service.update.mockResolvedValue(updatedEntity);

      const result = await controller.update('1', updateDto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedDto);
      expect(result).toBeInstanceOf(Clothing_typesDto);
    });

    it('deve lançar NotFoundException se o tipo de roupa para atualizar não for encontrado', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(controller.update('99', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      
      expect(service.findOne).toHaveBeenCalledWith(99);
      expect(service.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deve remover um tipo de roupa com sucesso', async () => {
      service.findOne.mockResolvedValue(mockClothingTypeEntity);
      service.remove.mockResolvedValue(undefined); // Retorna void

      await controller.remove('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.remove).toHaveBeenCalledWith(mockClothingTypeEntity);
    });

    it('deve lançar NotFoundException se o tipo de roupa para remover não for encontrado', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(controller.remove('99')).rejects.toThrow(NotFoundException);

      expect(service.findOne).toHaveBeenCalledWith(99);
      expect(service.remove).not.toHaveBeenCalled();
    });
  });
});