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
      },
    },
    description: 'The list of pokemons in the team',
    example: [
      { name: 'Pikachu' },
      { name: 'Charizard' },
      { name: 'Bulbasaur' },
    ],
  })
  @IsNotEmpty()
  team: string[];
}
