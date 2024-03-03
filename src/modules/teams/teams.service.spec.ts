import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

describe('TeamsService', () => {
  let service: TeamsService;
  let repo: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    repo = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const teamDto: CreateTeamDto = {
        user: 'testUser',
        team: ['pikachu'],
      };

      const team: Team = {
        id: 1,
        user: 'testUser',
        team: [
          {
            id: 25,
            name: 'pikachu',
            height: 4,
            weight: 60,
          },
        ],
      };

      jest.spyOn(repo, 'create').mockReturnValue(team);
      jest.spyOn(repo, 'save').mockResolvedValue(team);

      expect(await service.create(teamDto)).toEqual(team);
    });
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const team: Team = {
        id: 1,
        user: 'testUser',
        team: [
          {
            id: 25,
            name: 'pikachu',
            height: 4,
            weight: 60,
          },
        ],
      };

      jest.spyOn(repo, 'find').mockResolvedValue([team]);

      expect(await service.findAll()).toEqual([team]);
    });
  });

  describe('findOne', () => {
    it('should return a team', async () => {
      const team: Team = {
        id: 1,
        user: 'testUser',
        team: [
          {
            id: 25,
            name: 'pikachu',
            height: 4,
            weight: 60,
          },
        ],
      };

      jest.spyOn(repo, 'findOne').mockResolvedValue(team);

      expect(await service.findOne(1)).toEqual(team);
    });
  });
});
