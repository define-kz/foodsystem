import { Test, TestingModule } from '@nestjs/testing';
import { IntegratsiiSVneshnimiServisamiService } from './integratsii_s_vneshnimi_servisami.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  integratsii_s_vneshnimi_servisami: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('IntegratsiiSVneshnimiServisamiService', () => {
  let service: IntegratsiiSVneshnimiServisamiService;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [
        IntegratsiiSVneshnimiServisamiService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = mod.get(IntegratsiiSVneshnimiServisamiService);
    jest.clearAllMocks();
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  describe('findAll', () => {
    it('returns paginated list', async () => {
      mockPrisma.integratsii_s_vneshnimi_servisami.findMany.mockResolvedValue([{ id: '1', name: 'Test' }]);
      mockPrisma.integratsii_s_vneshnimi_servisami.count.mockResolvedValue(1);
      const result = await service.findAll('t1', { page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('returns item', async () => {
      mockPrisma.integratsii_s_vneshnimi_servisami.findFirst.mockResolvedValue({ id: '1', name: 'Test' });
      const r = await service.findOne('1', 't1');
      expect(r.id).toBe('1');
    });
    it('throws NotFoundException', async () => {
      mockPrisma.integratsii_s_vneshnimi_servisami.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates item', async () => {
      mockPrisma.integratsii_s_vneshnimi_servisami.create.mockResolvedValue({ id: '1', name: 'New' });
      const r = await service.create('t1', { name: 'New' }, 'u1');
      expect(mockPrisma.integratsii_s_vneshnimi_servisami.create).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      mockPrisma.integratsii_s_vneshnimi_servisami.findFirst.mockResolvedValue({ id: '1' });
      mockPrisma.integratsii_s_vneshnimi_servisami.update.mockResolvedValue({ id: '1', status: 'DELETED' });
      await service.remove('1', 't1');
      expect(mockPrisma.integratsii_s_vneshnimi_servisami.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'DELETED' } })
      );
    });
  });
});
