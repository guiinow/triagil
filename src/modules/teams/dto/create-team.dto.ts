import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    type: String,
    description: 'The name of the team master',
    example: 'Ash Ketchum',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        height: { type: 'number' },
        weight: { type: 'number' },
      },
    },
    description: 'The list of pokemons in the team',
    example: [
      { name: 'Pikachu', height: 0.4, weight: 6 },
      { name: 'Charizard', height: 1.7, weight: 90.5 },
      { name: 'Bulbasaur', height: 0.7, weight: 6.9 },
    ],
  })
  @IsNotEmpty()
  team: string[];
}
