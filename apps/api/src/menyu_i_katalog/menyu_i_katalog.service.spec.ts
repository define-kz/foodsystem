import { Test, TestingModule } from '@nestjs/testing';
import { MenyuIKatalogService } from './menyu_i_katalog.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  menyu_i_katalog: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('MenyuIKatalogService', () => {
  let service: MenyuIKatalogService;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [
        MenyuIKatalogService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = mod.get(MenyuIKatalogService);
    jest.clearAllMocks();
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  describe('findAll', () => {
    it('returns paginated list', async () => {
      mockPrisma.menyu_i_katalog.findMany.mockResolvedValue([{ id: '1', name: 'Test' }]);
      mockPrisma.menyu_i_katalog.count.mockResolvedValue(1);
      const result = await service.findAll('t1', { page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.totalPages).toBe(1);
    });
    it('filters by search', async () => {
      mockPrisma.menyu_i_katalog.findMany.mockResolvedValue([]);
      mockPrisma.menyu_i_katalog.count.mockResolvedValue(0);
      await service.findAll('t1', { search: 'test' });
      expect(mockPrisma.menyu_i_katalog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ name: expect.any(Object) }) })
      );
    });
  });

  describe('findOne', () => {
    it('returns item', async () => {
      mockPrisma.menyu_i_katalog.findFirst.mockResolvedValue({ id: '1', name: 'Test' });
      const r = await service.findOne('1', 't1');
      expect(r.id).toBe('1');
    });
    it('throws NotFoundException', async () => {
      mockPrisma.menyu_i_katalog.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates item', async () => {
      mockPrisma.menyu_i_katalog.create.mockResolvedValue({ id: '1', name: 'New' });
      const r = await service.create('t1', { name: 'New' }, 'u1');
      expect(mockPrisma.menyu_i_katalog.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ tenantId: 't1', name: 'New' }) })
      );
    });
  });

  describe('update', () => {
    it('updates item', async () => {
      mockPrisma.menyu_i_katalog.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.menyu_i_katalog.update.mockResolvedValue({ id: '1', name: 'Updated' });
      await service.update('1', 't1', { name: 'Updated' });
      expect(mockPrisma.menyu_i_katalog.update).toHaveBeenCalled();
    });
    it('throws if not found', async () => {
      mockPrisma.menyu_i_katalog.findFirst.mockResolvedValue(null);
      await expect(service.update('999', 't1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      mockPrisma.menyu_i_katalog.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.menyu_i_katalog.update.mockResolvedValue({ id: '1', status: 'DELETED' });
      await service.remove('1', 't1');
      expect(mockPrisma.menyu_i_katalog.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'DELETED' } })
      );
    });
  });
});
