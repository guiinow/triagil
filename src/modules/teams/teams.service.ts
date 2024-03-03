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
        !createTeamDto.username ||
        !createTeamDto.pokemonList ||
        createTeamDto.pokemonList.length === 0
      ) {
        this.logger.error(
          'Invalid data, please make sure to inform the username and the pokemon list',
        );
        throw new HttpException(
          'Invalid data, please make sure to inform the username and the pokemon list',
          HttpStatus.BAD_REQUEST,
        );
      }

      const pokemonName = createTeamDto.pokemonList[0];
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      const response = await axios.get(pokemonUrl);

      const { name, height, weight } = response.data;

      const newTeam = this.teamRepository.create({
        username: createTeamDto.username,
        pokemonList: [name, height, weight],
      });

      await this.teamRepository.save(newTeam);
      return newTeam;
    } catch (error) {
      this.logger.error('An unexpected error occurred:', error);
      throw new HttpException(
        'Internal Server Error',
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
