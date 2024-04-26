import { ApiProperty } from '@nestjs/swagger';

export class PermutationsDto {
  @ApiProperty({ type: String, example: 'a' })
  input: string;
}

export class FindOddNumberDto {
  @ApiProperty({ type: [Number], example: [7] })
  input: number[];
}

export class FindCountSmileysDto {
  @ApiProperty({ type: [String], example: [':)'] })
  input: string[];
}
