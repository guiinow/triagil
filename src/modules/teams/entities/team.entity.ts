import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
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
  user: string;

  @Column({ type: 'json', nullable: true })
  @ValidateNested()
  @ApiProperty({ description: 'The list of pokemons in the team' })
  team: { id: number; name: string; height: number; weight: number }[];
}
