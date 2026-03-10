import { Test, TestingModule } from '@nestjs/testing';
import { KorzinaIZakazyService } from './korzina_i_zakazy.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  korzina_i_zakazy: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('KorzinaIZakazyService', () => {
  let service: KorzinaIZakazyService;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [
        KorzinaIZakazyService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = mod.get(KorzinaIZakazyService);
    jest.clearAllMocks();
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  describe('findAll', () => {
    it('returns paginated list', async () => {
      mockPrisma.korzina_i_zakazy.findMany.mockResolvedValue([{ id: '1', name: 'Test' }]);
      mockPrisma.korzina_i_zakazy.count.mockResolvedValue(1);
      const result = await service.findAll('t1', { page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.totalPages).toBe(1);
    });
    it('filters by search', async () => {
      mockPrisma.korzina_i_zakazy.findMany.mockResolvedValue([]);
      mockPrisma.korzina_i_zakazy.count.mockResolvedValue(0);
      await service.findAll('t1', { search: 'test' });
      expect(mockPrisma.korzina_i_zakazy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ name: expect.any(Object) }) })
      );
    });
  });

  describe('findOne', () => {
    it('returns item', async () => {
      mockPrisma.korzina_i_zakazy.findFirst.mockResolvedValue({ id: '1', name: 'Test' });
      const r = await service.findOne('1', 't1');
      expect(r.id).toBe('1');
    });
    it('throws NotFoundException', async () => {
      mockPrisma.korzina_i_zakazy.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates item', async () => {
      mockPrisma.korzina_i_zakazy.create.mockResolvedValue({ id: '1', name: 'New' });
      const r = await service.create('t1', { name: 'New' }, 'u1');
      expect(mockPrisma.korzina_i_zakazy.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ tenantId: 't1', name: 'New' }) })
      );
    });
  });

  describe('update', () => {
    it('updates item', async () => {
      mockPrisma.korzina_i_zakazy.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.korzina_i_zakazy.update.mockResolvedValue({ id: '1', name: 'Updated' });
      await service.update('1', 't1', { name: 'Updated' });
      expect(mockPrisma.korzina_i_zakazy.update).toHaveBeenCalled();
    });
    it('throws if not found', async () => {
      mockPrisma.korzina_i_zakazy.findFirst.mockResolvedValue(null);
      await expect(service.update('999', 't1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      mockPrisma.korzina_i_zakazy.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.korzina_i_zakazy.update.mockResolvedValue({ id: '1', status: 'DELETED' });
      await service.remove('1', 't1');
      expect(mockPrisma.korzina_i_zakazy.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'DELETED' } })
      );
    });
  });
});
