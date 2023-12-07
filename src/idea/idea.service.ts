import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Idea, IdeaDocument } from './idea.schema';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea.name)
    private readonly ideaModel: Model<IdeaDocument>,
  ) {}

  async findAll(): Promise<IdeaDocument[]> {
    return this.ideaModel.find().exec();
  }

  async findOne(id: string): Promise<IdeaDocument> {
    return this.ideaModel.findById(id).exec();
  }

  async create(createIdeaDto: CreateIdeaDto): Promise<IdeaDocument> {
    const employee = new this.ideaModel(createIdeaDto);
    return employee.save();
  }

  async update(
    id: string,
    updateIdeaDto: UpdateIdeaDto,
  ): Promise<IdeaDocument> {
    return this.ideaModel
      .findByIdAndUpdate(id, updateIdeaDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.ideaModel.findByIdAndDelete(id).exec();
  }
}
