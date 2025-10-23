import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clothing_typesService } from './clothing_types.service';
import { Clothing_types } from '../entities/clothing_types.entity';
import CreateClothing_typesDto from '../dto/create.clothing_types.dto';
import UpdateClothing_typesDto from '../dto/update.clothing_types.dto';

describe('Clothing_typesService', () => {
  let service: Clothing_typesService;
  let repository: jest.Mocked<Repository<Clothing_types>>;

  const mockClothingType: Clothing_types = {
    id: 1,
    name: 'Camiseta',
    createdAt: new Date(),
    deletedAt: null,
  };

  const createDto: CreateClothing_typesDto = {
    name: 'Camiseta',
  };

  const updateDto: UpdateClothing_typesDto = {
    name: 'Camiseta Regata',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Clothing_typesService,
        {
          provide: getRepositoryToken(Clothing_types),
          useValue: {
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            softRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Clothing_typesService>(Clothing_typesService);
    repository = module.get(getRepositoryToken(Clothing_types));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de tipos de roupa', async () => {
      const expectedResult = [mockClothingType];
      repository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('deve retornar um único tipo de roupa', async () => {
      repository.findOneOrFail.mockResolvedValue(mockClothingType);

      const result = await service.findOne(1);

      expect(result).toEqual(mockClothingType);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve lançar erro se o tipo de roupa não for encontrado', async () => {
      const error = new Error('Not Found');
      repository.findOneOrFail.mockRejectedValue(error);

      await expect(service.findOne(99)).rejects.toThrow(error);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it('deve criar e retornar um novo tipo de roupa', async () => {
      repository.create.mockReturnValue(mockClothingType);
      repository.save.mockResolvedValue(mockClothingType);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(mockClothingType);
      expect(result).toEqual(mockClothingType);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar o tipo de roupa', async () => {
      const existingClothingType = { ...mockClothingType };
      const updatedClothingType = {
        ...existingClothingType,
        ...updateDto,
      };

      repository.findOne.mockResolvedValue(existingClothingType);
      repository.save.mockResolvedValue(updatedClothingType);

      const result = await service.update(1, updateDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updatedClothingType),
      );
      expect(result).toEqual(updatedClothingType);
    });

    it('deve lançar erro se o tipo de roupa para atualizar não for encontrado', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(99, updateDto)).rejects.toThrow(
        'Clothing_types not found',
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deve chamar softRemove no repositório', async () => {
      repository.softRemove.mockResolvedValue(undefined as any); // softRemove retorna void

      await service.remove(mockClothingType);

      expect(repository.softRemove).toHaveBeenCalledWith(mockClothingType);
    });

    it('deve lançar erro se softRemove falhar', async () => {
      const error = new Error('Failed to delete');
      repository.softRemove.mockRejectedValue(error);

      await expect(service.remove(mockClothingType)).rejects.toThrow(error);
      expect(repository.softRemove).toHaveBeenCalledWith(mockClothingType);
    });
  });
});