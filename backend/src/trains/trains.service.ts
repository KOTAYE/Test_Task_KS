import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Train } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Train[]> {
    return this.prisma.train.findMany({ orderBy: { departureTime: 'asc' } });
  }

  async findOne(id: string): Promise<Train> {
    const train = await this.prisma.train.findUnique({ where: { id } });
    if (!train) {
      throw new NotFoundException(`Train ${id} not found`);
    }
    return train;
  }

  create(dto: CreateTrainDto): Promise<Train> {
    this.assertValidRoute(
      dto.departureStation,
      dto.arrivalStation,
      dto.departureTime,
      dto.arrivalTime,
    );

    return this.prisma.train.create({
      data: {
        trainNumber: dto.trainNumber,
        departureStation: dto.departureStation,
        arrivalStation: dto.arrivalStation,
        departureTime: new Date(dto.departureTime),
        arrivalTime: new Date(dto.arrivalTime),
      },
    });
  }

  async update(id: string, dto: UpdateTrainDto): Promise<Train> {
    const existing = await this.findOne(id);

    const departureStation = dto.departureStation ?? existing.departureStation;
    const arrivalStation = dto.arrivalStation ?? existing.arrivalStation;
    const departureTime = dto.departureTime
      ? new Date(dto.departureTime)
      : existing.departureTime;
    const arrivalTime = dto.arrivalTime
      ? new Date(dto.arrivalTime)
      : existing.arrivalTime;

    this.assertValidRoute(
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
    );

    return this.prisma.train.update({
      where: { id },
      data: {
        trainNumber: dto.trainNumber ?? existing.trainNumber,
        departureStation,
        arrivalStation,
        departureTime,
        arrivalTime,
      },
    });
  }

  async remove(id: string): Promise<Train> {
    await this.findOne(id);
    return this.prisma.train.delete({ where: { id } });
  }

  /** Guards against nonsensical routes (same station or arrival before departure). */
  private assertValidRoute(
    departureStation: string,
    arrivalStation: string,
    departureTime: Date | string,
    arrivalTime: Date | string,
  ): void {
    if (departureStation === arrivalStation) {
      throw new BadRequestException(
        'Departure and arrival stations must be different',
      );
    }
    if (new Date(arrivalTime) <= new Date(departureTime)) {
      throw new BadRequestException(
        'Arrival time must be after departure time',
      );
    }
  }
}
