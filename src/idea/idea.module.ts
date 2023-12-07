import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
