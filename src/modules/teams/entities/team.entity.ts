import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  @ApiProperty({ description: 'The unique identifier of the team.' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the team master.' })
  username: string;

  @Column({ type: 'simple-array', nullable: false })
  @IsArray()
  @ApiProperty({ description: 'The list of pokemons in the team' })
  pokemonList: string[];
}
