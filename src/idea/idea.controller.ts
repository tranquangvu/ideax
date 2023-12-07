import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Controller,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@ApiTags('Auth')
@Controller({
  path: 'ideas',
  version: '1',
})
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideaService.create(createIdeaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.ideaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.ideaService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideaService.update(id, updateIdeaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.ideaService.delete(id);
  }
}
