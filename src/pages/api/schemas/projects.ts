import { IProject } from '@/types/interface';
import { model, Schema, models } from 'mongoose';

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    maxLength: 30,
    minLength: 3,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  repo: {
    type: String, // Just the name of the repository
  },
  madeAt: {
    type: String
  },
  technologies: [{
    type: String
  }]
});

projectSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

const Project = models.project || model<IProject>('project', projectSchema);


export default Project;
