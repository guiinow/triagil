import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  private logger = new Logger('TeamsService');

  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  /**
   * Cria um novo time de Pokémon.
   * @param createTeamDto - Dados do time a ser criado.
   * @returns O novo time criado.
   * @throws {HttpException} Se os dados de entrada forem inválidos ou ocorrer um erro durante a criação do time.
   */
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      if (
        !createTeamDto.user ||
        !createTeamDto.team ||
        createTeamDto.team.length === 0
      ) {
        this.logger.error(
          'Invalid data, please make sure to inform the user and at least one Pokémon name',
        );
        throw new HttpException(
          'Invalid data, please make sure to inform the user and at least one Pokémon name',
          HttpStatus.BAD_REQUEST,
        );
      }

      const pokemonPromises = createTeamDto.team.map(async (pokemonName) => {
        const lowercasedName = pokemonName.toLowerCase(); //note that if the first letter is uppercase, the API will not return the data
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${lowercasedName}`;

        try {
          const response = await axios.get(pokemonUrl);
          if (response.status !== 200) {
            throw new Error(`Failed to fetch data for ${pokemonName}`);
          }

          return {
            id: response.data.id,
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
          };
        } catch (error) {
          this.logger.error(
            `Failed to fetch data for ${pokemonName}: ${error.message}`,
          );
          throw new HttpException(
            `Failed to fetch data for ${pokemonName}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });

      const pokemons = await Promise.all(pokemonPromises);

      const team = this.teamRepository.create({
        user: createTeamDto.user,
        team: pokemons,
      });

      await this.teamRepository.save(team);

      return team;
    } catch (error) {
      this.logger.error(`Failed to create team: ${error.message}`);
      throw new HttpException(
        `Failed to create team: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retorna todos os times de Pokémon registrados.
   * @returns Uma lista de todos os times registrados.
   * @throws {HttpException} Se ocorrer um erro durante a busca dos times.
   */

  async findAll(): Promise<Team[]> {
    try {
      const teams = await this.teamRepository.find();

      return teams; //please note that the return might be 0, meaning that the team was not found
    } catch (error) {
      this.logger.error('An unexpected error occurred:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *Busca um time de Pokémon pelo seu ID.
   *@param id - O ID do time a ser buscado.
   *@returns O time de Pokémon encontrado.
   *@throws {HttpException} Se o time com o ID especificado não for encontrado ou ocorrer um erro durante a busca.
   */

  async findOne(id: number): Promise<Team> {
    try {
      const team = await this.teamRepository.findOne({ where: { id } });
      if (!team) {
        this.logger.warn(`Team with id ${id} not found`);
        throw new HttpException(
          `Team with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return team;
    } catch (error) {
      this.logger.error('An unexpected error occurred:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
