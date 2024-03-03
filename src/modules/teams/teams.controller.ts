import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Team successfully created.',
    type: Team,
  })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of teams.',
    type: [Team],
  })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Team found.',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }
}
