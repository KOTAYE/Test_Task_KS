import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainDto } from './create-train.dto';

/** All fields optional — supports partial updates via PATCH. */
export class UpdateTrainDto extends PartialType(CreateTrainDto) {}
