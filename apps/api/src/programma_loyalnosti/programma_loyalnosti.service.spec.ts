import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammaLoyalnostiService } from './programma_loyalnosti.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  programma_loyalnosti: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProgrammaLoyalnostiService', () => {
  let service: ProgrammaLoyalnostiService;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [
        ProgrammaLoyalnostiService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = mod.get(ProgrammaLoyalnostiService);
    jest.clearAllMocks();
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  describe('findAll', () => {
    it('returns paginated list', async () => {
      mockPrisma.programma_loyalnosti.findMany.mockResolvedValue([{ id: '1', name: 'Test' }]);
      mockPrisma.programma_loyalnosti.count.mockResolvedValue(1);
      const result = await service.findAll('t1', { page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('returns item', async () => {
      mockPrisma.programma_loyalnosti.findFirst.mockResolvedValue({ id: '1', name: 'Test' });
      const r = await service.findOne('1', 't1');
      expect(r.id).toBe('1');
    });
    it('throws NotFoundException', async () => {
      mockPrisma.programma_loyalnosti.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates item', async () => {
      mockPrisma.programma_loyalnosti.create.mockResolvedValue({ id: '1', name: 'New' });
      const r = await service.create('t1', { name: 'New' }, 'u1');
      expect(mockPrisma.programma_loyalnosti.create).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      mockPrisma.programma_loyalnosti.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.programma_loyalnosti.update.mockResolvedValue({ id: '1', status: 'DELETED' });
      await service.remove('1', 't1');
      expect(mockPrisma.programma_loyalnosti.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'DELETED' } })
      );
    });
  });
});
