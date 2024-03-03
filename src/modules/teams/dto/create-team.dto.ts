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
  username: string;

  @ApiProperty({
    type: [String],
    description: 'The list of pokemons in the team',
    example: ['Pikachu', 'Charizard', 'Bulbasaur'],
  })
  @IsNotEmpty()
  pokemonList: string[];
}
