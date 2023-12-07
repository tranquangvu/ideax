import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Idea {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export type IdeaDocument = HydratedDocument<Idea>;
export const IdeaSchema = SchemaFactory.createForClass(Idea);
