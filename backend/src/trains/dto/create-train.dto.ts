import { IsIn, IsISO8601, IsString, Matches, MaxLength } from 'class-validator';
import { STATIONS } from '../../common/constants/stations';

export class CreateTrainDto {
  @IsString()
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: 'Train number may only contain letters, digits and dashes',
  })
  @MaxLength(20)
  trainNumber!: string;

  @IsIn(STATIONS, { message: 'Departure station must be a known station' })
  departureStation!: string;

  @IsIn(STATIONS, { message: 'Arrival station must be a known station' })
  arrivalStation!: string;

  @IsISO8601({}, { message: 'Departure time must be a valid date-time' })
  departureTime!: string;

  @IsISO8601({}, { message: 'Arrival time must be a valid date-time' })
  arrivalTime!: string;
}
