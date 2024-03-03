import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(team);

      expect(await controller.create(teamDto)).toBe(team);
    }, 10000); // 10 seconds timeout
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

      jest.spyOn(service, 'findAll').mockResolvedValue([team]);

      expect(await controller.findAll()).toEqual([team]);
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

      jest.spyOn(service, 'findOne').mockResolvedValue(team);

      expect(await controller.findOne('1')).toBe(team);
    });
  });
});
