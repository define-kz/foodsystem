import { Test, TestingModule } from '@nestjs/testing';
import { UpravlenieRestoranamiTenantService } from './upravlenie_restoranami_tenant.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  upravlenie_restoranami_tenant: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('UpravlenieRestoranamiTenantService', () => {
  let service: UpravlenieRestoranamiTenantService;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [
        UpravlenieRestoranamiTenantService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = mod.get(UpravlenieRestoranamiTenantService);
    jest.clearAllMocks();
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  describe('findAll', () => {
    it('returns paginated list', async () => {
      mockPrisma.upravlenie_restoranami_tenant.findMany.mockResolvedValue([{ id: '1', name: 'Test' }]);
      mockPrisma.upravlenie_restoranami_tenant.count.mockResolvedValue(1);
      const result = await service.findAll('t1', { page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('returns item', async () => {
      mockPrisma.upravlenie_restoranami_tenant.findFirst.mockResolvedValue({ id: '1', name: 'Test' });
      const r = await service.findOne('1', 't1');
      expect(r.id).toBe('1');
    });
    it('throws NotFoundException', async () => {
      mockPrisma.upravlenie_restoranami_tenant.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates item', async () => {
      mockPrisma.upravlenie_restoranami_tenant.create.mockResolvedValue({ id: '1', name: 'New' });
      const r = await service.create('t1', { name: 'New' }, 'u1');
      expect(mockPrisma.upravlenie_restoranami_tenant.create).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      mockPrisma.upravlenie_restoranami_tenant.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.upravlenie_restoranami_tenant.update.mockResolvedValue({ id: '1', status: 'DELETED' });
      await service.remove('1', 't1');
      expect(mockPrisma.upravlenie_restoranami_tenant.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'DELETED' } })
      );
    });
  });
});
